import { Node } from "@tiptap/core";

import { DOMParser } from "prosemirror-model";

export default Node.create({
  name: "raw-html",

  inline: false,
  attrs: {},
  group: "block",
  draggable: true,
  parseDOM: [],

  addCommands() {
    return {
      insertRawHTML:
        (editor, options) =>
        ({ state, dispatch }) => {
          const { selection } = state;
          const element = document.createElement("div");
          // element.innerHTML = `<div style='left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.5%;'><iframe src='https://www.youtube.com/embed/VHDKxkiyai8?feature=oembed' style='border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;' allowfullscreen scrolling='no' allow='encrypted-media; accelerometer; clipboard-write; gyroscope; picture-in-picture'></iframe></div>` //options.replace('\\','').trim()
          element.innerHTML =
            "<div><div>text <a href=" / ">link</a></div></div>";
          const slice = DOMParser.fromSchema(state.schema).parseSlice(element);
          const transaction = state.tr.insert(selection.anchor, slice.content);
          dispatch(transaction);
        },
    };
  },
});
