import { BubbleMenu } from "@tiptap/react";

import { useCallback } from "react";

export const DragHandle = ({ editor, children, pluginKey }) => {
  const shouldShow = useCallback(({ view, state, from }) => true, []);
  return (
    <BubbleMenu
      tippyOptions={{
        placement: "left",
        offset: [-2, 16],
        zIndex: 99,
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
          positionFixed: true,
        },
        arrow: false,
        theme: "drag-handle",
      }}
      editor={editor}
      pluginKey={pluginKey}
      shouldShow={shouldShow}
      updateDelay={0}
    >
      {children}
    </BubbleMenu>
  );
};
