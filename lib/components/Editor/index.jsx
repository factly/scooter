import React, { useState, useEffect } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import classNames from "classnames";
import ErrorWrapper from "components/Common/ErrorWrapper";
import { stringifyObject, isNilOrEmpty } from "utils/common";

import { DEFAULT_EDITOR_OPTIONS } from "./constants";
import BubbleMenu from "./CustomExtensions/BubbleMenu";
import CharacterCount from "./CustomExtensions/CharacterCount";
import EmbedFetcher from "./CustomExtensions/Embeds/EmbedFetcher";
import FixedMenu from "./CustomExtensions/FixedMenu";
import ImageUploader from "./CustomExtensions/Image/Uploader";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
import {
  generateAddonOptions,
  getEditorStyles,
  getIsPlaceholderActive,
  clipboardTextParser,
} from "./helpers";

const Editor = (
  {
    forceTitle = false,
    titleError = false,
    hideSlashCommands = false,
    defaults = DEFAULT_EDITOR_OPTIONS,
    addons = [],
    addonCommands,
    className,
    uploadEndpoint,
    iframelyEndpoint,
    uploadConfig = {},
    embedConfig = {
      Cookie:
        "csrf_token_2d785ea2f6536900108362e9bfff73eef3a32be3921b3abc74b0a990093487c9=WdsYiez/zgzwK/YzNhzLZwUucmImocZjzqTLVnvJlhE=; ory_kratos_session=MTY1NzM2NTkzMnxEdi1CQkFFQ180SUFBUkFCRUFBQVJfLUNBQUVHYzNSeWFXNW5EQThBRFhObGMzTnBiMjVmZEc5clpXNEdjM1J5YVc1bkRDSUFJRXBUZFdGcGRUQlNPRlZ5Ym5WWVJVNXRiVTVMWW5SQ1VsVTBXRGd6ZWxkMHw7B48V8525ldAIfi2D9QeByKc-19KY_kM82pxBb4dCWw==",
    },
    initialValue = "<p></p>",
    onChange = html => html,
    onFocus = () => {},
    onBlur = () => {},
    menuType = "fixed",
    variables,
    mentions,
    showImageInMention = false,
    placeholder = forceTitle ? { title: "Untitled" } : null,
    extensions,
    contentClassName,
    characterLimit,
    editorSecrets,
    rows = 6,
    autoFocus = false,
    onSubmit,
    heightStrategy = "fixed",
    characterCountStrategy = "hidden",
    keyboardShortcuts = [],
    error = null,
    ...otherProps
  },
  ref
) => {
  const [isImageUploadVisible, setImageUploadVisible] = useState(false);
  const [isEmbedFetcherVisible, setEmbedFetcherVisible] = useState(false);

  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";
  const isSlashCommandsActive = !hideSlashCommands;
  const isPlaceholderActive = getIsPlaceholderActive(placeholder);
  const showSlashCommandPlaceholder =
    !isPlaceholderActive && isSlashCommandsActive;
  const isUnsplashImageUploadActive = addons.includes("image-upload-unsplash");
  const isCharacterCountActive = characterCountStrategy !== "hidden";

  const addonOptions = generateAddonOptions(defaults, addons, {
    includeImageUpload: isUnsplashImageUploadActive,
  });

  const customExtensions = useCustomExtensions({
    contentClassName,
    forceTitle,
    placeholder,
    extensions,
    mentions,
    variables,
    isSlashCommandsActive,
    showImageInMention,
    setImageUploadVisible,
    setEmbedFetcherVisible,
    options: addonOptions,
    addonCommands,
    characterLimit,
    keyboardShortcuts,
    onSubmit,
  });

  const editorClasses = classNames("scooter-editor", {
    "slash-active": showSlashCommandPlaceholder,
    "fixed-menu-active border": isFixedMenuActive,
    "bubble-menu-active": isBubbleMenuActive,
    "force-title": forceTitle,
    "force-title--error": titleError,
    "placeholder-active": isPlaceholderActive,
    [className]: className,
  });

  const editorStyles = getEditorStyles({ heightStrategy, rows });

  const editor = useEditor({
    extensions: customExtensions,
    content: initialValue,
    injectCSS: false,
    autofocus: autoFocus && "end",
    editorProps: {
      attributes: {
        class: editorClasses,
        style: stringifyObject(editorStyles),
      },
      clipboardTextParser,
    },
    parseOptions: {
      preserveWhitespace: true,
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onFocus,
    onBlur,
  });

  /* Make editor object available to the parent */
  React.useImperativeHandle(ref, () => ({ editor }));

  useEffect(() => {
    const isProduction = [process.env.RAILS_ENV, process.env.NODE_ENV].includes(
      "production"
    );
    if (!isProduction && isNilOrEmpty(initialValue)) {
      // eslint-disable-next-line no-console
      console.warn(
        `[scooter-editor]: Empty value of "initialValue" in scooterEditor is expected to be "<p></p>" instead of "${initialValue}".`
      );
    }
  }, [initialValue]);

  return (
    <ErrorWrapper error={error} isFixedMenuActive={isFixedMenuActive}>
      {isFixedMenuActive && (
        <FixedMenu
          editor={editor}
          variables={variables}
          setImageUploadVisible={setImageUploadVisible}
          setEmbedFetcherVisible={setEmbedFetcherVisible}
          options={addonOptions}
          mentions={mentions}
          showImageInMention={showImageInMention}
        />
      )}
      {isBubbleMenuActive && (
        <BubbleMenu editor={editor} options={addonOptions} />
      )}
      <ImageUploader
        isVisible={isImageUploadVisible}
        setIsVisible={setImageUploadVisible}
        editor={editor}
        imageUploadUrl={uploadEndpoint}
        uploadConfig={uploadConfig}
        isUnsplashImageUploadActive={isUnsplashImageUploadActive}
        unsplashApiKey={editorSecrets?.unsplash}
      />
      <EmbedFetcher
        isVisible={isEmbedFetcherVisible}
        setIsVisible={setEmbedFetcherVisible}
        editor={editor}
        iframelyEndpoint={iframelyEndpoint}
        embedConfig={embedConfig}
      />
      <EditorContent editor={editor} {...otherProps} />
      {isCharacterCountActive && (
        <CharacterCount
          count={editor?.storage.characterCount.characters()}
          limit={characterLimit}
          strategy={characterCountStrategy}
        />
      )}
    </ErrorWrapper>
  );
};

export default React.forwardRef(Editor);
