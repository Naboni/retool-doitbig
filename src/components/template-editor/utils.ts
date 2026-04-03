import { useStore } from "@/store";
import type { Segment, Transform } from "@/types";

const PILL_CLASS =
  "inline-flex items-center px-2 py-0.5 mx-0.5 rounded-md bg-violet-500/15 text-violet-300 text-sm font-medium cursor-pointer select-none align-baseline";

export function createPillElement(
  fieldId: string,
  transform: Transform = "none",
) {
  const fields = useStore.getState().fields;
  const field = fields.find((f) => f.id === fieldId);
  const span = document.createElement("span");
  span.dataset.field = fieldId;
  span.dataset.transform = transform;
  span.contentEditable = "false";
  span.textContent = field?.label ?? fieldId;
  span.className = PILL_CLASS;
  return span;
}

export function parseSegments(editor: HTMLElement): Segment[] {
  const segments: Segment[] = [];
  for (const node of editor.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = node.textContent ?? "";
      if (value) segments.push({ type: "text", value });
    } else if (node instanceof HTMLElement && node.dataset.field) {
      segments.push({
        type: "variable",
        field: node.dataset.field,
        transform: (node.dataset.transform as Transform) ?? "none",
      });
    }
  }
  return segments;
}

export function renderToDOM(editor: HTMLElement, segments: Segment[]) {
  editor.innerHTML = "";
  for (const seg of segments) {
    if (seg.type === "text") {
      editor.appendChild(document.createTextNode(seg.value));
    } else {
      editor.appendChild(createPillElement(seg.field, seg.transform));
    }
  }
}
