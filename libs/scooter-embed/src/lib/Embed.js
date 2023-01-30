import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import EmbedComponent from './EmbedComponent';

export const EmbedExtension = Node.create({
  name: 'embed',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      class: {
        default: 'embed-container',
        rendered: true,
      },
      'data-type': {
        default: 'embed',
        rendered: true,
      },
      'data-url': {
        default: '',
        rendered: true,
      },
      'data-html': {
        default: '',
        rendered: true,
        parseHTML: (element) => {
          return element.innerHTML;
        },
      },
    };
  },
  addCommands() {
    return {
      setEmbed: (options) => (editor) => {
        const { tr, commands, chain } = editor;
        if (tr.selection?.node?.type?.name === 'embed') {
          return commands.updateAttributes('embed', {
            src: options.src,
            'data-url': options.src,
            'data-html': options.data?.html,
          });
        }

        return commands.insertContent([
          {
            type: this.name,
            attrs: { src: options.src, 'data-html': options.data.html },
          },
        ]);
      },
      setEmbedAttributes:
        (attributes) =>
        ({ tr }) => {
          const { selection } = tr;
          const options = {
            ...selection.node.attrs,
            ...attributes,
          };

          const node = this.type.create(options);
          tr.replaceRangeWith(selection.from, selection.to, node);
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-embed]',
        // contentElement: ""
      },
      {
        tag: 'div[class="embed-container"]',
      },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   console.log({ HTMLAttributes });
  //   return ["div", mergeAttributes(HTMLAttributes)];
  // },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedComponent);
  },

  renderHTML({ node, HTMLAttributes }) {
    const { src, alt, caption, data } = HTMLAttributes;

    const div = document.createElement('div');

    div.dataset.type = 'embed';
    div.className = 'embed-wrapper';
    div.innerHTML = HTMLAttributes['data-html'];

    return div;
  },
});

export default EmbedExtension;
