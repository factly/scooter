import { NodeViewWrapper } from "@tiptap/react";
import React from "react";
import axios from "axios";
import { Input } from "@factly/scooter-ui";
import TagoreCommandsMenu from "./Menu";
import {
  FINISHED_MENU_ITEMS,
  MENU_ITEMS_FLATTENED as MENU_ITEMS,
  SEARCHABLE_MENU_ITEMS_FLATTENED as SEARCHABLE_MENU_ITEMS,
} from "./constants";
import Tippy from "@tippyjs/react";
import { BiUpArrow, BiUpArrowAlt, BiUpArrowCircle } from "react-icons/bi";
import { TbWand } from "react-icons/tb";
import { BsStars } from "react-icons/bs";

export const TagoreComponent = props => {
  const {
    editor,
    node,
    menuIndex = 0,
    extension: {
      options: {
        // apiUrl = "http://localhost:8080",
        // userId = "20",
        menuItems = {},
        //systemPrompt=` Return the response as a valid HTML without html, head or body tags`,
        fetcher,
      } = {},
    },
  } = props;

  const { content: selectedContent, type, to, from } = node.attrs;

  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);
  const [generated, setGenerated] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [content, setContent] = React.useState("");
  const [activeMenuIndex, setActiveMenuIndex] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [items, setItems] = React.useState(
    filterByTitle(
      menuItems.MENU ? [...MENU_ITEMS, ...menuItems.MENU] : MENU_ITEMS,
      "",
      editor.getText().length > 15
    )
  );
  const [loading, setLoading] = React.useState(false);
  const [showImprovingOptions, setShowImprovingOptions] = React.useState(false);

  React.useEffect(() => {
    const { node, editor } = props;
    // const { content } = node.attrs;
    // content && setContent(content);
    setShowImprovingOptions(editor.getText().length > 15);
  }, [props]);

  React.useEffect(() => {
    // if content is present and is not loading, then set menu items
    if (content && !loading) {
      setItems(
        menuItems.FINISHED
          ? [...FINISHED_MENU_ITEMS, ...menuItems.FINISHED]
          : FINISHED_MENU_ITEMS
      );
      showMenu();
    }
  }, [content, loading]);

  React.useEffect(() => {
    // if input vaue changes, focus on input
    if (inputValue && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  async function fetchData(input) {
    try {
      setLoading(true);
      setError(null);
      setContent("");
      const data = await fetcher(content ? content : input || inputValue);

      // axios.post(
      //   `${apiUrl}/prompts/generate`,
      //   { input: `${input || inputValue}\n ${systemPrompt}`, max_tokens: 200 },
      //   { headers: { "X-User": userId } }
      // );
      // setContent();

      setLoading(false);
      setGenerated(true);
      setInputValue("");
      return data;
    } catch (error) {
      hideMenu();
      setLoading(false);
      setError(error);
      console.log("Couldn't fetch data");
    }
  }

  function filterByTitle(arr, title = "", showImprovingOptions = false) {
    if (title.length === 0 && showImprovingOptions) return arr;
    if (!showImprovingOptions) {
      const draftWithAiArray = arr.filter(item =>
        item.title.toLowerCase().includes("draft with ai")
      );
      // console.log({draftWithAiArray})
      const result = draftWithAiArray[0]
        ? [...draftWithAiArray, ...draftWithAiArray[0].items]
        : draftWithAiArray;
      return result;
    }

    return arr.reduce((acc, obj) => {
      if (obj.title.toLowerCase().includes(title.toLowerCase())) {
        // If the object's title matches the filter, filter its nested items recursively
        const filteredItems = obj.items; //? filterByTitle(obj.items, title) : null;

        // If the object or any of its nested items match the filter, add it to the result array
        if (filteredItems !== null) {
          acc.push({
            ...obj,
            items: filteredItems,
          });
        }
      } else if (Array.isArray(obj.items)) {
        // If the object's title doesn't match the filter but it has nested items,
        // filter the nested items recursively and add them to a new copy of the object
        const filteredItems = filterByTitle(
          obj.items,
          title,
          editor.getText().length > 15
        );

        if (filteredItems.length > 0) {
          acc.push({
            ...obj,
            items: filteredItems,
          });
        }
      }

      return acc;
    }, []);
  }

  const handleChange = e => {
    // if enterkey is clicked fetchData

    setInputValue(e.target.value);
    if (e.target.value.length === 0) {
      const filterItems = generated
        ? menuItems.FINISHED
          ? [...FINISHED_MENU_ITEMS, ...menuItems.FINISHED]
          : FINISHED_MENU_ITEMS
        : menuItems.MENU
        ? [...MENU_ITEMS, ...menuItems.MENU]
        : MENU_ITEMS;
      const filteredItems = filterByTitle(
        filterItems,
        e.target.value,
        editor.getText().length > 15
      );
      setItems(filteredItems);
      return;
    }
    const filterItems = generated
      ? menuItems.FINISHED
        ? [...FINISHED_MENU_ITEMS, ...menuItems.FINISHED]
        : FINISHED_MENU_ITEMS
      : menuItems.SEARCHABLE
      ? [...SEARCHABLE_MENU_ITEMS, ...menuItems.SEARCHABLE]
      : SEARCHABLE_MENU_ITEMS;

    const filteredItems = filterByTitle(
      filterItems,
      e.target.value,
      editor.getText().length > 15
    );
    setItems(filteredItems);
  };

  const handleEnter = async e => {
    if (e.key === "Enter") {
      const data = await fetchData();
      editor.commands.insertContentAt(
        props.getPos(),
        //props.getPos(),
        `${data.output}`
      );

      hideMenu();
      props.deleteNode();
      setContent("");
    }
    if (e.key === "Escape") {
      hideMenu();
      // props.deleteNode();
      // setContent("");
      if (!menuOpen) {
        props.deleteNode();
      }
    }
  };

  const handleSubmit = async () => {
    const data = await fetchData();
    editor.commands.insertContentAt(
      props.getPos(),
      //props.getPos(),
      `${data.output}`
    );

    hideMenu();
    props.deleteNode();
    setContent("");
  };

  const showMenu = () => {
    setMenuOpen(true);
  };

  const hideMenu = () => {
    setMenuOpen(false);
  };

  const getPosition = () => {
    const { view } = props.editor;

    if (view.state.selection.empty) return null;
    const { from, to } = view.state.selection;
    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    const box = view.dom.offsetParent.getBoundingClientRect();
    const avgLeft = Math.max((start.left + end.left) / 2, start.left + 3);
    return {
      left: 16,
      bottom: -25, // end.top - 25 // - 275 to send it to the top
    };
  };

  //getPosition();

  return (
    <NodeViewWrapper
      className={
        type === "float" ? "react-component float-tagore" : "react-component"
      }
      style={{
        transform: `translate(${getPosition()?.left}px, ${
          getPosition()?.bottom
        }px)`,
      }}
    >
      {/* { console.log(`translate(${getPosition()?.left}px, ${getPosition()?.bottom}px)`)} */}
      <div className="content">
        <div
          className="generated-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        {error && (
          <div
            className="generated-content"
            dangerouslySetInnerHTML={{ __html: "try again" }}
          ></div>
        )}

        {loading && <div className="generated-content">Generating...</div>}
        <div className="tagore-input-container">
          <BsStars className="icon" size={"1rem"} />
          <input
            className="tagore-input"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder="Ask AI to write anything..."
            onFocus={showMenu}
            //onBlur={}
            onSubmit={fetchData}
            ref={inputRef}
          />
          <button
            onClick={handleSubmit}
            className={inputValue?.length > 0 ? "active" : ""}
          >
            <BiUpArrowCircle size={"1.5rem"} />
          </button>
        </div>
      </div>
      {/* {!loading && content.length >0 &&

    <div className='tagore-options'>
    {content.length>0 && <button onClick={()=> {}}>Accept</button>}
      <button onClick={()=>fetchData()}>Try Again</button>
      <button onClick={()=> {}}>Delete</button>

      </div>} */}
      {menuOpen && !loading && items.length > 0 && (
        <TagoreCommandsMenu
          {...props}
          setActiveMenuIndex={setActiveMenuIndex}
          activeMenuIndex={activeMenuIndex}
          items={items}
          inputValue={inputValue}
          setInputValue={setInputValue}
          fetchData={fetchData}
          setContent={setContent}
          selectedContent={selectedContent}
          to={to}
          from={from}
          pos={props.getPos()}
          content={content}
          deleteNode={props.deleteNode}
          hideMenu={hideMenu}
          showMenu={showMenu}
        />
      )}
    </NodeViewWrapper>
  );
};

export default TagoreComponent;
