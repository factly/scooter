import { RiBoldLine } from "react-icons/ri";
import axios from "axios";
import React from "react";
import { AiOutlineEdit, AiOutlineReload } from "react-icons/ai";
import {
  BsStars,
  BsQuestion,
  BsTranslate,
  BsListCheck,
  BsCheck,
  BsTextLeft,
  BsTrash3,
} from "react-icons/bs";
import { GiMicrophone } from "react-icons/gi";
import { TbBlockquote, TbWand } from "react-icons/tb";
import { MdShortText, MdDone } from "react-icons/md";

// async function fetchData(inputValue) {
//   try {
//     const response = await axios.post("http://localhost:8080/prompts/generate", { input: inputValue, max_tokens: 200 }, { headers: { 'X-User': '20' } });

//     console.log({ response })
//     return response.data;
//   } catch (error) {
//     console.log("Couldn't fetch data");
//   }
// }

export const MENU_ITEMS = [
  {
    title: "Write with AI",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Continue writing",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Continue writing the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Generate from page",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Summarize",
        Icon: TbBlockquote,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Summarize the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Find action Items",
        Icon: BsListCheck,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Continue writing the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Translate",
        Icon: BsTranslate,
        command: null,
        type: "sub-heading",
        items: [
          {
            title: "Spanish",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Translate to spanish the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
          {
            title: "Chinese",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Translate to chinese the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
        ],
      },
      {
        title: "Explain this",
        Icon: BsQuestion,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Explain the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Edit or Review Page",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Improve writing",
        Icon: TbWand,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Improve the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Fix Spelling",
        Icon: BsCheck,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Fix Spelling in the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Make Shorter",
        Icon: MdShortText,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Make the content shorter for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Make longer",
        Icon: BsTextLeft,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Make the content longer for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Change tone",
        Icon: GiMicrophone,
        command: null,
        type: "sub-heading",
        items: [
          {
            title: "Professional",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Change tone to professional for the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
          {
            title: "Casual",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Change tone to casual for the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
          {
            title: "Straightforward",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Change tone to straight forward for the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
          {
            title: "Confident",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Change tone to confident for the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
          {
            title: "Friendly",
            Icon: null,
            command: async ({ editor, range, fetchData }) => {
              let content = await fetchData(
                `Change tone to friendly for the following content: \n ${editor.getText()}`
              );
              // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
            },
            type: "command",
          },
        ],
      },
      {
        title: "Simplify language",
        Icon: BsStars,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to simplify language for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Draft with AI",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Brainstorm Ideas..",
        commandType: "prompt",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, setInputValue }) => {
          console.log({ setInputValue });

          setInputValue(`Brainstorm ideas for: `);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();

          // let content = await fetchData(`Brainstorm ideas for: \n ${inputElement.innerText}`);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Blog Post..",
        commandType: "prompt",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a blog post about: `);
        },
        type: "command",
      },
      {
        title: "Outline..",
        commandType: "prompt",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write Outline for: `);
        },
        type: "command",
      },
    ],
  },
];

const flattenMenuItems = items => {
  const flattenedItems = [];
  items.forEach(item => {
    if (item.type === "heading") {
      flattenedItems.push(item);
      item.items.forEach(subItem => {
        flattenedItems.push(subItem);
      });
    } else {
      flattenedItems.push(item);
    }
  });

  return flattenedItems;
};

export const MENU_ITEMS_FLATTENED = flattenMenuItems(MENU_ITEMS);

export const SEARCHABLE_MENU_ITEMS = [
  {
    title: "Write with AI",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Continue writing",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Continue writing the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Generate from page",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Summarize",
        Icon: TbBlockquote,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Summarize the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Find action Items",
        Icon: BsListCheck,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Continue writing the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },

      {
        title: "Explain this",
        Icon: BsQuestion,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Explain the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Edit or Review Page",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Improve writing",
        Icon: TbWand,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Improve the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Fix Spelling",
        Icon: BsCheck,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Fix Spelling in the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Make Shorter",
        Icon: MdShortText,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Make the content shorter for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Make longer",
        Icon: BsTextLeft,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Make the content longer for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },

      {
        title: "Simplify language",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to simplify language for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Draft with AI",
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Brainstorm Ideas..",
        commandType: "prompt",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, setInputValue }) => {
          console.log({ setInputValue });

          setInputValue(`Brainstorm ideas for: `);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();

          // let content = await fetchData(`Brainstorm ideas for: \n ${inputElement.innerText}`);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Blog Post..",
        commandType: "prompt",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a blog post about: `);
        },
        type: "command",
      },
      {
        title: "Outline..",
        commandType: "prompt",
        Icon: AiOutlineEdit,
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write Outline for: `);
        },
        type: "command",
      },
    ],
  },
  {
    title: "Change tone",
    Icon: GiMicrophone,
    command: null,
    type: "heading",
    items: [
      {
        title: "Professional",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to professional for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Casual",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to casual for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Straightforward",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to straight forward for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Confident",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to confident for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Friendly",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Change tone to friendly for the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
  {
    title: "Translate",
    Icon: BsTranslate,
    command: null,
    type: "heading",
    items: [
      {
        title: "Spanish",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Translate to spanish the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Chinese",
        Icon: null,
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Translate to chinese the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
    ],
  },
];

export const SEARCHABLE_MENU_ITEMS_FLATTENED = flattenMenuItems(
  SEARCHABLE_MENU_ITEMS
);

export const FINISHED_MENU_ITEMS = [
  {
    title: "Done",
    Icon: MdDone,
    type: "command",
    command: async ({
      editor,
      range,
      fetchData,
      pos,
      content,
      setContent,
      deleteNode,
    }) => {
      console.log(editor);
      editor.commands.insertContentAt(
        pos,
        //props.getPos(),
        content
      );
      deleteNode();
      setContent("");
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
  },
  {
    title: "Try Again",
    Icon: AiOutlineReload,
    type: "command",
    command: async ({ editor, range, fetchData, content }) => {
      // update fetch content
      await fetchData(`Try again and write about :${content}`);
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
  },

  {
    title: "Make Longer",
    Icon: BsTextLeft,
    command: async ({ editor, range, fetchData, content }) => {
      await fetchData(`Make the following content longer: \n ${content}`);
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
    type: "command",
  },
  {
    title: "Make Shorter",
    Icon: MdShortText,
    command: async ({ editor, range, fetchData, content }) => {
      await fetchData(`Make the following content shorter: \n ${content}`);
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
    type: "command",
  },
  {
    title: "Delete",
    Icon: BsTrash3,
    command: async ({
      editor,
      range,
      fetchData,
      pos,
      content,
      setContent,
      deleteNode,
    }) => {
      setContent("");
      deleteNode();
    },
    type: "command",
  },
];
