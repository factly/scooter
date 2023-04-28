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

export const TagoreComponent = props => {
  console.log({ props });
  const {
    editor,
    node,
    menuIndex = 0,
    extension: {
      options: { apiUrl = "http://localhost:8080" },
    },
  } = props;
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);
  const [generated, setGenerated] = React.useState(false);

  const [content, setContent] = React.useState("");
  const [activeMenuIndex, setActiveMenuIndex] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [items, setItems] = React.useState(
    filterByTitle(MENU_ITEMS, "", editor.getText().length > 15)
  );
  const [loading, setLoading] = React.useState(false);
  const [showImprovingOptions, setShowImprovingOptions] = React.useState(false);

  React.useEffect(() => {
    const { node, editor } = props;
    const { content } = node.attrs;
    content && setContent(content);
    setShowImprovingOptions(editor.getText().length > 15);
  }, [props]);

  React.useEffect(() => {
    // if content is present and is not loading, then set menu items
    if (content && !loading) {
      setItems(FINISHED_MENU_ITEMS);
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
      setContent("");
      const response = await axios.post(
        `${apiUrl}/prompts/generate`,
        { input: input || inputValue, max_tokens: 200 },
        { headers: { "X-User": "20" } }
      );
      setContent(response.data.output);
      hideMenu();
      setLoading(false);
      setGenerated(true);
      setInputValue("");
      return response.data;
    } catch (error) {
      hideMenu();
      setLoading(false);
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
    console.log({ generated });
    // if enterkey is clicked fetchData

    setInputValue(e.target.value);
    if (e.target.value.length === 0) {
      const filterItems = generated ? FINISHED_MENU_ITEMS : MENU_ITEMS;
      const filteredItems = filterByTitle(
        filterItems,
        e.target.value,
        editor.getText().length > 15
      );
      setItems(filteredItems);
      return;
    }
    const filterItems = generated ? FINISHED_MENU_ITEMS : SEARCHABLE_MENU_ITEMS;
    const filteredItems = filterByTitle(
      filterItems,
      e.target.value,
      editor.getText().length > 15
    );
    setItems(filteredItems);
  };

  const handleEnter = e => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const handleSubmit = () => {
    fetchData();
  };

  const showMenu = () => {
    setMenuOpen(true);
  };

  const hideMenu = () => {
    setMenuOpen(false);
  };

  return (
    <NodeViewWrapper className="react-component">
      <div className="content">
        <div
          className="generated-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        {loading && <div className="generated-content">Generating...</div>}
        <div className="tagore-input-container">
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
            className={inputValue.length > 0 ? "active" : ""}
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
          pos={props.getPos()}
          content={content}
          deleteNode={props.deleteNode}
          hideMenu={hideMenu}
        />
      )}
    </NodeViewWrapper>
  );
};

export default TagoreComponent;
