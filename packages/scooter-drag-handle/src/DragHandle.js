import { Extension } from "@tiptap/core";

import { NodeSelection, Plugin } from "@tiptap/pm/state";

import { __serializeForClipboard } from "@tiptap/pm/view";

function absoluteRect(node) {
  const data = node.getBoundingClientRect();

  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

function nodeDOMAtCoords(coords) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      elem =>
        elem.parentElement?.matches?.(".ProseMirror") ||
        elem.matches(
          [
            "li",
            "p:not(:first-child)",
            "pre",
            "blockquote",
            "h1, h2, h3, h4, h5, h6",
          ].join(", ")
        )
    );
}

function nodePosAtDOM(node, view) {
  const boundingRect = node.getBoundingClientRect();

  return view.posAtCoords({
    left: boundingRect.left + 50 + 24,
    top: boundingRect.top + 1,
  })?.inside;
}

export const ScooterDragHandle = Extension.create({
  name: "dragHandle",

  addProseMirrorPlugins() {
    function handleDragStart(event, view) {
      view.focus();

      if (!event.dataTransfer) return;

      const node = nodeDOMAtCoords({
        x: event.clientX + 50 + 24,
        y: event.clientY,
      });

      if (!(node instanceof Element)) return;

      const nodePos = nodePosAtDOM(node, view);
      if (nodePos == null || nodePos < 0) return;

      view.dispatch(
        view.state.tr.setSelection(
          NodeSelection.create(view.state.doc, nodePos)
        )
      );

      const slice = view.state.selection.content();
      const { dom, text } = __serializeForClipboard(view, slice);

      event.dataTransfer.clearData();
      event.dataTransfer.setData("text/html", dom.innerHTML);
      event.dataTransfer.setData("text/plain", text);
      event.dataTransfer.effectAllowed = "copyMove";

      event.dataTransfer.setDragImage(node, 0, 0);

      view.dragging = { slice, move: event.ctrlKey };
    }

    function handleClick(event, view) {
      view.focus();

      view.dom.classList.remove("dragging");

      const node = nodeDOMAtCoords({
        x: event.clientX + 50 + 24,
        y: event.clientY,
      });

      if (!(node instanceof Element)) return;

      const nodePos = nodePosAtDOM(node, view);
      if (!nodePos) return;

      view.dispatch(
        view.state.tr.setSelection(
          NodeSelection.create(view.state.doc, nodePos)
        )
      );
    }

    let dragHandleElement = null;

    function hideDragHandle() {
      if (dragHandleElement) {
        dragHandleElement.classList.add("hide");
      }
    }

    function showDragHandle() {
      if (dragHandleElement) {
        dragHandleElement.classList.remove("hide");
      }
    }
    return [
      new Plugin({
        view: view => {
          dragHandleElement = document.createElement("div");
          dragHandleElement.draggable = true;
          dragHandleElement.dataset.dragHandle = "";
          dragHandleElement.classList.add("drag-handle");
          dragHandleElement.addEventListener("dragstart", e => {
            handleDragStart(e, view);
          });
          dragHandleElement.addEventListener("click", e => {
            handleClick(e, view);
          });

          hideDragHandle();

          view?.dom?.parentElement?.appendChild(dragHandleElement);

          return {
            destroy: () => {
              dragHandleElement?.remove?.();
              dragHandleElement = null;
            },
          };
        },
        props: {
          handleDOMEvents: {
            mousemove: (view, event) => {
              if (!view.editable) {
                return;
              }

              const node = nodeDOMAtCoords({
                x: event.clientX + 50 + 24,
                y: event.clientY,
              });

              if (!(node instanceof Element)) {
                hideDragHandle();
                return;
              }

              const compStyle = window.getComputedStyle(node);
              const lineHeight = parseInt(compStyle.lineHeight, 10);
              const paddingTop = parseInt(compStyle.paddingTop, 10);

              const rect = absoluteRect(node);

              rect.top += (lineHeight - 24) / 2;
              rect.top += paddingTop;
              if (node.matches("ul:not([data-type=taskList]) li, ol li")) {
                rect.left -= 24;
              }
              rect.width = 24;

              if (!dragHandleElement) return;

              dragHandleElement.style.left = `${rect.left - rect.width}px`;
              dragHandleElement.style.top = `${rect.top}px`;
              showDragHandle();
            },
            keydown: () => {
              hideDragHandle();
            },
            mousewheel: () => {
              hideDragHandle();
            },
            dragstart: view => {
              view.dom.classList.add("dragging");
            },
            drop: view => {
              view.dom.classList.remove("dragging");
              hideDragHandle();
            },
            dragend: view => {
              view.dom.classList.remove("dragging");
            },
          },
        },
      }),
    ];
  },
});
