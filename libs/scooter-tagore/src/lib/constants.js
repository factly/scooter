import { RiBoldLine, RiPlayListAddFill } from "react-icons/ri";
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

// TODO: Add tags for searching options
// TODO: Ask AI icon
// TODO: Remove border
// TODO: Add all the options from notion

export const MENU_ITEMS = [
  {
    title: "Write with AI",
    searchTags: ["Write with AI", "Continue writing"],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Continue writing",
        searchTags: ["Continue writing"],
        Icon: AiOutlineEdit,
        commandType: "generate",
        prompt: "Continue writing the following content: \n",
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
    searchTags: [
      "Generate from page",
      "Summarize",
      "Find action Items",
      "Translate",
      "Explain this",
    ],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Summarize",
        searchTags: ["Summarize"],
        Icon: TbBlockquote,
        commandType: "generate",
        prompt: "Summarize the following content: \n",
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
        searchTags: ["Find action Items"],
        Icon: BsListCheck,
        commandType: "generate",
        prompt: "Find action items in the following content: \n",
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Fin action items in the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Translate",
        searchTags: ["Translate"],
        Icon: BsTranslate,
        command: null,
        type: "sub-heading",
        items: [
          {
            title: "Spanish",
            searchTags: ["Spanish"],
            Icon: null,
            commandType: "generate",
            prompt: "Translate to spanish the following content: \n",
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
            searchTags: ["Chinese"],
            Icon: null,
            commandType: "generate",
            prompt: "Translate to chinese the following content: \n",
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
        searchTags: ["Explain this"],
        Icon: BsQuestion,
        commandType: "generate",
        prompt: "Explain the following content: \n",
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
    searchTags: [
      "Edit or Review Page",
      "Improve writing",
      "Fix spelling & Grammar",
      "Make Shorter",
      "Make longer",
      "Change tone",
      "Professional",
      "Casual",
      "Straightforward",
      "Confident",
      "Friendly",
      "Simplify language",
    ],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Improve writing",
        searchTags: ["Improve writing"],
        Icon: TbWand,
        commandType: "replace",
        prompt: "Improve the following content: \n",
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Improve the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Fix spelling & Grammar",
        searchTags: ["Fix spelling & Grammar"],
        Icon: BsCheck,
        commandType: "replace",
        prompt: "Fix spelling & grammar in the following content: \n",
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
        searchTags: ["Make Shorter"],
        Icon: MdShortText,
        commandType: "replace",
        prompt: "Make the content shorter for the following content: \n",
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
        searchTags: ["Make longer"],
        Icon: BsTextLeft,
        commandType: "replace",
        prompt: "Make the content longer for the following content: \n",
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
        searchTags: ["Change tone"],
        Icon: GiMicrophone,
        command: null,
        type: "sub-heading",
        items: [
          {
            title: "Professional",
            searchTags: ["Professional"],
            Icon: null,
            commandType: "replace",
            prompt: "Change tone to professional for the following content: \n",
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
            searchTags: ["Casual"],
            Icon: null,
            commandType: "replace",
            prompt: "Change tone to casual for the following content: \n",
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
            searchTags: ["Straightforward"],
            Icon: null,
            commandType: "replace",
            prompt:
              "Change tone to straight forward for the following content: \n",
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
            searchTags: ["Confident"],
            Icon: null,
            commandType: "replace",
            prompt: "Change tone to confident for the following content: \n",
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
            searchTags: ["Friendly"],
            Icon: null,
            commandType: "replace",
            prompt: "Change tone to friendly for the following content: \n",
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
        searchTags: ["Simplify language"],
        Icon: BsStars,
        commandType: "replace",
        prompt:
          "Change tone to simplify language for the following content: \n",
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
    searchTags: [
      "Draft with AI",
      "Brainstorm Ideas..",
      "Blog Post..",
      "Outline..",
      "Social media post..",
      "Press Release..",
      "Creative Story..",
      "Essay..",
      "Poem..",
      "To-do list..",
      "Meeting agenda..",
      "Pros and cons list..",
      "Job Description..",
      "Sales email..",
      "Recruiting email..",
    ],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Brainstorm Ideas..",
        searchTags: ["Brainstorm Ideas.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Brainstorm ideas for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Brainstorm ideas for: `);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();

          // let content = await fetchData(`Brainstorm ideas for: \n ${inputElement.innerText}`);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Blog Post..",
        searchTags: ["Blog Post.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a blog post about: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a blog post about: `);
        },
        type: "command",
      },
      {
        title: "Outline..",
        searchTags: ["Outline.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write Outline for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write Outline for: `);
        },
        type: "command",
      },
      {
        title: "Social media post..",
        searchTags: ["Social media post.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a Social Media Post for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write Social Media Post for: `);
        },
        type: "command",
      },
      {
        title: "Press Release..",
        searchTags: ["Press Release.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a press release for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a press release for: `);
        },
        type: "command",
      },
      {
        title: "Creative Story..",
        searchTags: ["Creative Story.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a creative story for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a creative story for: `);
        },
        type: "command",
      },
      {
        title: "Essay..",
        searchTags: ["Essay.."],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write an Essay for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write an essay for: `);
        },
        type: "command",
      },
      {
        title: "See more",
        searchTags: ["See more"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write Outline for: \n",
        command: null,
        type: "sub-heading",
        items: [
          {
            title: "Poem..",
            searchTags: ["Poem.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a Poem for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a poem for: `);
            },
            type: "command",
          },
          {
            title: "To-do list..",
            searchTags: ["To-do list.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a to-do list for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a to-do list for: `);
            },
            type: "command",
          },
          {
            title: "Meeting agenda..",
            searchTags: ["Meeting agenda.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a meeting agenda for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a meeting agenda for: `);
            },
            type: "command",
          },
          {
            title: "Pros and cons list..",
            searchTags: ["Pros and cons list.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a pros and cons list for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a pros and cons list for: `);
            },
            type: "command",
          },
          {
            title: "Job Description..",
            searchTags: ["Job Description.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a job description for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a job description for: `);
            },
            type: "command",
          },
          {
            title: "Sales email..",
            searchTags: ["Sales email.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a sales email for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a Sales email for: `);
            },
            type: "command",
          },
          {
            title: "Recruiting email..",
            searchTags: ["Recruiting email.."],
            commandType: "prompt",
            Icon: AiOutlineEdit,
            prompt: "Write a recruiting email for: \n",
            command: async ({ editor, range, setInputValue }) => {
              setInputValue(`Write a recruiting email for: `);
            },
            type: "command",
          },
        ],
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
    searchTags: ["Write with AI", "Continue writing"],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Continue writing",
        searchTags: ["Continue writing", "Write with AI"],
        Icon: AiOutlineEdit,
        commandType: "generate",
        prompt: "Continue writing the following content: \n",
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
    searchTags: [
      "Generate from page",
      "Summarize",
      "Find action Items",
      "Explain this",
    ],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Summarize",
        searchTags: ["Summarize", "Generate from page"],
        Icon: TbBlockquote,
        commandType: "generate",
        prompt: "Summarize the following content: \n",
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
        searchTags: ["Find action Items", "Generate from page"],
        Icon: BsListCheck,
        commandType: "generate",
        prompt: "Find action items in the following content: \n",
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
        searchTags: ["Explain this", "Generate from page"],
        Icon: BsQuestion,
        commandType: "generate",
        prompt: "Explain the following content: \n",
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
    searchTags: [
      "Edit or Review Page",
      "Improve writing",
      "Fix spelling & Grammar",
      "Make Shorter",
      "Make longer",
      "Simplify language",
    ],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Improve writing",
        searchTags: ["Improve writing", "Edit or Review Page"],
        Icon: TbWand,
        commandType: "replace",
        prompt: "Improve the following content: \n",
        command: async ({ editor, range, fetchData }) => {
          let content = await fetchData(
            `Improve the following content: \n ${editor.getText()}`
          );
          // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Fix Spelling & Grammar",
        searchTags: ["Fix Spelling & Grammar", "Edit or Review Page"],
        Icon: BsCheck,
        commandType: "replace",
        prompt: "Fix spelling & Grammar in the following content: \n",
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
        searchTags: ["Make Shorter", "Edit or Review Page"],
        Icon: MdShortText,
        commandType: "replace",
        prompt: "Make the content shorter for the following content: \n",
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
        searchTags: ["Make longer", "Edit or Review Page"],
        Icon: BsTextLeft,
        commandType: "replace",
        prompt: "Make the content longer for the following content: \n",
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
        searchTags: ["Simplify language", "Edit or Review Page"],
        Icon: null,
        commandType: "replace",
        prompt:
          "Change tone to simplify language for the following content: \n",
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
    searchTags: [
      "Draft with AI",
      "Brainstorm Ideas..",
      "Blog Post..",
      "Outline..",
      "Social media post..",
      "Press Release..",
      "Creative Story..",
      "Essay..",
      "Poem..",
      "To-do list..",
      "Meeting agenda..",
      "Pros and cons list..",
      "Job Description..",
      "Sales email..",
      "Recruiting email..",
    ],
    Icon: null,
    command: null,
    type: "heading",
    items: [
      {
        title: "Brainstorm Ideas..",
        searchTags: ["Brainstorm Ideas..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Brainstorm ideas for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Brainstorm ideas for: `);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();

          // let content = await fetchData(`Brainstorm ideas for: \n ${inputElement.innerText}`);
          // // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
        },
        type: "command",
      },
      {
        title: "Blog Post..",
        searchTags: ["Blog Post..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a blog post about: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a blog post about: `);
        },
        type: "command",
      },
      {
        title: "Outline..",
        searchTags: ["Outline..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write Outline for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write Outline for: `);
        },
        type: "command",
      },
      {
        title: "Social media post..",
        searchTags: ["Social media post..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a Social Media Post for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write Social Media Post for: `);
        },
        type: "command",
      },
      {
        title: "Press Release..",
        searchTags: ["Press Release..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a press release for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a press release for: `);
        },
        type: "command",
      },
      {
        title: "Creative Story..",
        searchTags: ["Creative Story..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a creative story for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a creative story for: `);
        },
        type: "command",
      },
      {
        title: "Essay..",
        searchTags: ["Essay..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write an Essay for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write an essay for: `);
        },
        type: "command",
      },
      {
        title: "Poem..",
        searchTags: ["Poem..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a Poem for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a poem for: `);
        },
        type: "command",
      },
      {
        title: "To-do list..",
        searchTags: ["To-do list..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a to-do list for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a to-do list for: `);
        },
        type: "command",
      },
      {
        title: "Meeting agenda..",
        searchTags: ["Meeting agenda..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a meeting agenda for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a meeting agenda for: `);
        },
        type: "command",
      },
      {
        title: "Pros and cons list..",
        searchTags: ["Pros and cons list..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a pros and cons list for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a pros and cons list for: `);
        },
        type: "command",
      },
      {
        title: "Job Description..",
        searchTags: ["Job Description..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a job description for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a job description for: `);
        },
        type: "command",
      },
      {
        title: "Sales email..",
        searchTags: ["Sales email..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a sales email for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a Sales email for: `);
        },
        type: "command",
      },
      {
        title: "Recruiting email..",
        searchTags: ["Recruiting email..", "Draft with AI"],
        commandType: "prompt",
        Icon: AiOutlineEdit,
        prompt: "Write a recruiting email for: \n",
        command: async ({ editor, range, setInputValue }) => {
          setInputValue(`Write a recruiting email for: `);
        },
        type: "command",
      },
    ],
  },
  {
    title: "Change tone",
    searchTags: [
      "Change tone",
      "Professional",
      "Casual",
      "Friendly",
      " Straightforward",
      "Confident",
    ],
    Icon: GiMicrophone,
    command: null,
    type: "heading",
    items: [
      {
        title: "Professional",
        searchTags: ["Professional", "Change tone"],
        Icon: null,
        commandType: "replace",
        prompt: "Change tone to professional for the following content: \n",
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
        searchTags: ["Casual", "Change tone"],
        Icon: null,
        commandType: "replace",
        prompt: "Change tone to casual for the following content: \n",
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
        searchTags: ["Straightforward", "Change tone"],
        Icon: null,
        commandType: "replace",
        prompt: "Change tone to straight forward for the following content: \n",
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
        searchTags: ["Confident", "Change tone"],
        Icon: null,
        commandType: "replace",
        prompt: "Change tone to confident for the following content: \n",
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
        searchTags: ["Friendly", "Change tone"],
        Icon: null,
        commandType: "replace",
        prompt: "Change tone to friendly for the following content: \n",
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
    searchTags: ["Translate", "Spanish", "Chinese"],
    Icon: BsTranslate,
    command: null,
    type: "heading",
    items: [
      {
        title: "Spanish",
        searchTags: ["Spanish", "Translate"],
        Icon: null,
        commandType: "replace",
        prompt: "Translate to spanish the following content: \n",
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
        searchTags: ["Chinese", "Translate"],
        Icon: null,
        commandType: "replace",
        prompt: "Translate to chinese the following content: \n",
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
    title: "Replace Selection",
    searchTags: ["Replace Selection"],
    Icon: MdDone,
    type: "command",
    commandType: "replace",
    command: async ({
      editor,
      range,
      fetchData,
      from,
      to,
      pos,
      content,
      setContent,
      deleteNode,
    }) => {
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
    title: "Insert Below",
    searchTags: ["Insert Below"],
    Icon: RiPlayListAddFill,
    type: "command",
    commandType: "replace",

    command: async ({
      editor,
      range,
      fetchData,
      pos,
      content,
      setContent,
      deleteNode,
    }) => {
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
    searchTags: ["Try Again"],
    Icon: AiOutlineReload,
    type: "command",
    commandType: "replace",
    command: async ({ editor, range, fetchData, content }) => {
      // update fetch content
      await fetchData(`Try again and write about :${content}`);
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
  },

  {
    title: "Make Longer",
    searchTags: ["Make Longer"],
    Icon: BsTextLeft,
    commandType: "replace",
    prompt: "Make the following content longer: \n",
    command: async ({ editor, range, fetchData, content }) => {
      await fetchData(`Make the following content longer: \n ${content}`);
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
    type: "command",
  },
  {
    title: "Make Shorter",
    searchTags: ["Make Shorter"],
    Icon: MdShortText,
    commandType: "replace",
    prompt: "Make the following content shorter: \n",
    command: async ({ editor, range, fetchData, content }) => {
      await fetchData(`Make the following content shorter: \n ${content}`);
      // content ? editor.chain().focus().insertContent(content.output).run() : editor.chain().focus().run();
    },
    type: "command",
  },
  {
    title: "Delete",
    searchTags: ["Delete"],
    Icon: BsTrash3,
    commandType: "delete",
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