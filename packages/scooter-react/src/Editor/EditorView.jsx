import React, { useState, useEffect } from "react";
import { EditorContent } from "@tiptap/react";
import { EditorView as TiptapEditorView } from "@tiptap/pm/view";

import { useExtensions } from "../hooks/useExtensions";
// import { mergeExtensions } from "./CustomExtensions/mergeExtensions";
import {
  generateAddonOptions,
  getEditorStyles,
  getIsPlaceholderActive,
  clipboardTextParser,
  stringifyObject,
  isNilOrEmpty,
  DEFAULT_EDITOR_OPTIONS,
} from "@factly/scooter-shared-utils";

import classNames from "classnames";

import "../styles/scooter-core.scss";
import "../styles/scooter-table.scss";

import { noop } from "../utils/constants";
import { ErrorWrapper } from "../components/shared/ErrorWrapper";
import { ImageUploader } from "../ImageBlock";
import { useBlockEditor } from "../hooks/useBlockEditor";
import { TextMenu } from "../TextMenu/TextMenu";
import { EmbedFetcher } from "../components/EmbedFetcher";

export const EditorView = React.forwardRef(
  (
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
      embedConfig = {},
      initialValue = "<p></p>",
      onChange = ({ html, json, text }) => {
        console.log({ html, json, text });
        return { html, json, text };
      },
      onFocus = noop,
      onBlur = noop,
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
      heightStrategy = "flexible",
      characterCountStrategy = "hidden",
      keyboardShortcuts = [],
      error = null,
      imagesFetcher,
      itemsPerPage,
      onFileAdded,
      onUploadComplete,
      editorInstance = noop,
      tagoreEndpoint,
      userId,
      tagoreConfig,
      claimConfig,
      meta: metaData,
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
    const isUnsplashImageUploadActive = addons.includes(
      "image-upload-unsplash"
    );

    const addonOptions = generateAddonOptions(defaults, [], {
      includeImageUpload: isUnsplashImageUploadActive,
    });

    const customExtensions = useExtensions({
      characterLimit,
    });

    // https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-953348865
    TiptapEditorView.prototype.updateState = function updateState(state) {
      if (!this.docView) return;
      this.updateStateInner(state, this.state.plugins !== state.plugins);
    };

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
    const editor = useBlockEditor({
      extensions: customExtensions,
      content: initialValue,
      autofocus: autoFocus && "end",
      editorProps: {
        attributes: {
          class: editorClasses,
          style: stringifyObject(editorStyles),
        },
        clipboardTextParser,
      },
      onFocus,
      onBlur,
    });

    editor && editorInstance(editor);

    /* Make editor object available to the parent */
    React.useImperativeHandle(ref, () => ({ editor }));

    useEffect(() => {
      if (isNilOrEmpty(initialValue)) {
        console.warn(
          `[scooter-editor]: Empty value of "initialValue" in scooterEditor is expected to be "<p></p>" instead of "${initialValue}".`
        );
      }
    }, [initialValue]);

    return (
      <ErrorWrapper error={error} isFixedMenuActive={isFixedMenuActive}>
        {/* {isFixedMenuActive && (
          <FixedMenu
            editor={editor}
            variables={variables}
            setImageUploadVisible={setImageUploadVisible}
            setEmbedFetcherVisible={setEmbedFetcherVisible}
            options={addonOptions}
            mentions={mentions}
            showImageInMention={showImageInMention}
          />
        )} */}

        <EditorContent editor={editor} {...otherProps} />
        <TextMenu editor={editor} options={addonOptions} />
        <EmbedFetcher
          isVisible={isEmbedFetcherVisible}
          setIsVisible={setEmbedFetcherVisible}
          editor={editor}
          iframelyEndpoint={iframelyEndpoint}
          embedConfig={embedConfig}
        />
        <ImageUploader
          isVisible={isImageUploadVisible}
          setIsVisible={setImageUploadVisible}
          editor={editor}
          imageUploadUrl={uploadEndpoint}
          uploadConfig={uploadConfig}
          isUnsplashImageUploadActive={isUnsplashImageUploadActive}
          unsplashApiKey={editorSecrets?.unsplash}
          imagesFetcher={imagesFetcher}
          itemsPerPage={itemsPerPage}
          onFileAdded={onFileAdded}
          onUploadComplete={onUploadComplete}
        />
      </ErrorWrapper>
    );
  }
);
