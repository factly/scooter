export const scrollHandler = ({ wrapperRef, index }) => {
  if (!wrapperRef.current || index >= wrapperRef.current.children.length) {
    return;
  }

  const MARGIN_HEIGHT = 8;
  const parentItem = wrapperRef.current;
  const selectedItem = parentItem.children[index];
  const itemHeight = selectedItem.clientHeight + MARGIN_HEIGHT;

  let scrollPosition = parentItem.scrollTop;
  if (
    selectedItem.offsetTop + itemHeight >
    scrollPosition + parentItem.clientHeight
  ) {
    scrollPosition =
      selectedItem.offsetTop - parentItem.clientHeight + itemHeight;
  } else if (scrollPosition > selectedItem.offsetTop) {
    scrollPosition = selectedItem.offsetTop - MARGIN_HEIGHT;
  }

  wrapperRef.current.scrollTop = scrollPosition;
};
