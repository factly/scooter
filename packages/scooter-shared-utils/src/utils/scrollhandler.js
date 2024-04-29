export const scrollHandler = ({ wrapperRef, itemIndex, groupIndex }) => {
  if (
    isNaN(itemIndex) ||
    isNaN(groupIndex) ||
    itemIndex === -1 ||
    groupIndex === -1 ||
    itemIndex === undefined ||
    groupIndex === undefined ||
    !wrapperRef.current
  ) {
    console.log("itemIndex or groupIndex is NaN or undefined or -ve");
    return;
  }
  const parentItem = wrapperRef.current;
  const MARGIN_HEIGHT = 8 + parentItem.children.length * 16;

  const groupElement = parentItem.children[groupIndex];

  if (!groupElement) {
    return;
  }

  const selectedItem = groupElement.children[itemIndex];

  if (!selectedItem) {
    return;
  }

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
