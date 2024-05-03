/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import classNames from "classnames";
import { ErrorWrapper } from "@factly/scooter-ui";
import { EditorView } from "@tiptap/pm/view";
import { BubbleMenu } from "@factly/scooter-bubble-menu";
import CharacterCount from "./CustomExtensions/CharacterCount";
// import { EmbedFetcher } from "@factly/scooter-embed";
import { FixedMenu } from "@factly/scooter-fixed-menu";
// import { Uploader as ImageUploader } from "@factly/scooter-image";
import useCustomExtensions from "./CustomExtensions/useCustomExtensions";
// import { AddNewClaim } from "@factly/scooter-claim";
// import { AddExistingClaim } from "@factly/scooter-claim";
import { mergeExtensions } from "./CustomExtensions/mergeExtensions";
import {
  generateAddonOptions,
  getEditorStyles,
  getIsPlaceholderActive,
  clipboardTextParser,
  stringifyObject,
  isNilOrEmpty,
  DEFAULT_EDITOR_OPTIONS,
} from "@factly/scooter-shared-utils";

import "./scooter-core.scss";

export const ScooterCore = React.forwardRef(
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
      heightStrategy = "flexible",
      characterCountStrategy = "hidden",
      keyboardShortcuts = [],
      error = null,
      imagesFetcher,
      itemsPerPage,
      onFileAdded,
      onUploadComplete,
      editorInstance = () => {},
      tagoreEndpoint,
      userId,
      tagoreConfig,
      claimConfig,
      meta: metaData,
      ...otherProps
    },
    ref
  ) => {
    const mergedExtensions = mergeExtensions(extensions);
    const { extensionList, extensionUI } = mergedExtensions || {};
    const {
      AddExistingClaim,
      AddNewClaim,
      Uploader: ImageUploader,
      EmbedFetcher,
      ...otherExtensionUI
    } = extensionUI || {};
    const [isImageUploadVisible, setImageUploadVisible] = useState(false);
    const [isAddNewClaimVisible, setAddNewClaimVisible] = useState(false);
    const [isAddExistingClaimVisible, setAddExistingClaimVisible] =
      useState(false);
    const [meta, setMeta] = useState(metaData);

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
    const isCharacterCountActive = characterCountStrategy !== "hidden";

    const addonOptions = generateAddonOptions(
      defaults,
      addons,
      extensionList,
      extensionUI,
      {
        includeImageUpload: isUnsplashImageUploadActive,
      }
    );
    const customExtensions = useCustomExtensions({
      meta,
      contentClassName,
      forceTitle,
      placeholder,
      extensions: extensionList,
      mentions,
      variables,
      isSlashCommandsActive,
      showImageInMention,
      setImageUploadVisible,
      setEmbedFetcherVisible,
      setAddNewClaimVisible,
      setAddExistingClaimVisible,
      options: addonOptions,
      addonCommands,
      characterLimit,
      keyboardShortcuts,
      onSubmit,
      tagoreEndpoint,
      userId,
      tagoreConfig,
    });

    // https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-953348865
    EditorView.prototype.updateState = function updateState(state) {
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
    const removeEmptyTagoreTags = node => {
      if (node.type.name === "tagore" && node.childCount === 0) {
        console.log("executed");
        return false; // Ignore empty <tagore></tagore> tags
      }
      return true;
    };
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
      onUpdate: ({ editor }) => {
        return onChange({
          html: editor.getHTML(),
          json: editor.getJSON(),
          text: editor.getText(),
        });
      },
      onTransaction({ editor, transaction }) {
        const a = checkForTagoreNodes(editor);
        setIsTagoreNodePresent(a);
        // Transaction occurred.
      },
      onFocus,
      onBlur,
    });

    editor && editorInstance(editor);

    const checkForTagoreNodes = e => {
      if (!e.contentComponent) return false;
      const { state } = e.contentComponent;

      return (
        state?.renderers &&
        Object.values(state.renderers)?.filter(
          ({ props }) => props?.node?.type.name === "tagore"
        ).length > 0
      );
    };

    const [isTagoreNodePresent, setIsTagoreNodePresent] = useState(false);

    // useEffect(() => {
    //   if (isA)

    /* Make editor object available to the parent */
    React.useImperativeHandle(ref, () => ({ editor }));

    useEffect(() => {
      if (isNilOrEmpty(initialValue)) {
        // eslint-disable-next-line no-console
        console.warn(
          `[scooter-editor]: Empty value of "initialValue" in scooterEditor is expected to be "<p></p>" instead of "${initialValue}".`
        );
      }
    }, [initialValue]);

    useEffect(() => {
      if (editor) {
        // setIsTagoreNodePresent(checkForTagoreNodes(editor));
      }
    }, [editor]);
    if(!editor) {
      return null;
    }

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
        {isBubbleMenuActive && !isTagoreNodePresent && (
          <BubbleMenu editor={editor} options={addonOptions} />
        )}
        {AddNewClaim && extensionList.ClaimExtension && (
          <AddNewClaim
            claimConfig={claimConfig}
            isVisible={isAddNewClaimVisible}
            setIsVisible={setAddNewClaimVisible}
            editor={editor}
          />
        )}
        {AddExistingClaim && extensionList.ClaimExtension && (
          <AddExistingClaim
            editor={editor}
            claimConfig={claimConfig}
            setIsVisible={setAddExistingClaimVisible}
            setMeta={setMeta}
            isVisible={isAddExistingClaimVisible}
          />
        )}
        {ImageUploader && extensionList.ImageExtensionConfig && (
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
        )}
        {EmbedFetcher && extensionList.EmbedExtension && (
          <EmbedFetcher
            isVisible={isEmbedFetcherVisible}
            setIsVisible={setEmbedFetcherVisible}
            editor={editor}
            iframelyEndpoint={iframelyEndpoint}
            embedConfig={embedConfig}
          />
        )}
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
  }
);

export default ScooterCore;
