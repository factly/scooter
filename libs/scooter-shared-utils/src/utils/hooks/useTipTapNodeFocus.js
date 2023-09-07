// useTipTapNodeFocus.js
// https://github.com/ueberdosis/tiptap/issues/4063#issuecomment-1707398735
import { useRef, useEffect } from 'react';

export const useTipTapNodeFocus = (nodeRef) => {
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      animationIdRef.current = window.requestAnimationFrame(() => {
        nodeRef.current.focus();
      });
    }

    // Cleanup the animation frame when the component unmounts
    return () => {
      if (animationIdRef.current) {
        window.cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [nodeRef.current]);
}


