import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type ClipboardEvent,
  type MouseEvent,
} from "react";
import { useStore } from "@/store";
import { FIELDS } from "@/types";
import type { Transform } from "@/types";
import { createPillElement, parseSegments, renderToDOM } from "./utils";
import { SuggestionMenu } from "./suggestion-menu";
import { PillPopover } from "./pill-popover";

export function TemplateEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const template = useStore((s) => s.template);
  const setTemplate = useStore((s) => s.setTemplate);

  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [menuIndex, setMenuIndex] = useState(0);
  const [popover, setPopover] = useState<{
    element: HTMLSpanElement;
    rect: DOMRect;
  } | null>(null);

  useEffect(() => {
    if (editorRef.current) renderToDOM(editorRef.current, template);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncToStore = useCallback(() => {
    if (editorRef.current) setTemplate(parseSegments(editorRef.current));
  }, [setTemplate]);

  const insertField = useCallback(
    (fieldId: string) => {
      const editor = editorRef.current;
      if (!editor) return;

      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const pill = createPillElement(fieldId);
        range.insertNode(pill);

        const space = document.createTextNode("\u00A0");
        pill.after(space);
        range.setStartAfter(space);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        editor.appendChild(createPillElement(fieldId));
        editor.appendChild(document.createTextNode("\u00A0"));
      }

      setMenuPos(null);
      setMenuIndex(0);
      syncToStore();
      editor.focus();
    },
    [syncToStore],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (menuPos) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setMenuIndex((i) => (i + 1) % FIELDS.length);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setMenuIndex((i) => (i - 1 + FIELDS.length) % FIELDS.length);
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          insertField(FIELDS[menuIndex].id);
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setMenuPos(null);
          return;
        }
      }

      if (e.key === "/" && !menuPos) {
        e.preventDefault();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const rect = sel.getRangeAt(0).getBoundingClientRect();
          setMenuPos({ x: rect.left, y: rect.bottom + 4 });
          setMenuIndex(0);
        }
      }
    },
    [menuPos, menuIndex, insertField],
  );

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.field) {
      setPopover({
        element: target as HTMLSpanElement,
        rect: target.getBoundingClientRect(),
      });
    } else {
      setPopover(null);
    }
  }, []);

  const handlePillChange = useCallback(
    (field: string, transform: Transform) => {
      if (!popover) return;
      popover.element.dataset.field = field;
      popover.element.dataset.transform = transform;
      popover.element.textContent =
        FIELDS.find((f) => f.id === field)?.label ?? field;
      syncToStore();
    },
    [popover, syncToStore],
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      e.preventDefault();
      document.execCommand(
        "insertText",
        false,
        e.clipboardData.getData("text/plain"),
      );
      syncToStore();
    },
    [syncToStore],
  );

  return (
    <div>
      <h2 className="text-xs uppercase tracking-wide text-gray-400">Text</h2>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncToStore}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onPaste={handlePaste}
        className="mt-2 min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p className="mt-1.5 text-xs text-gray-400">
        Type <kbd className="rounded bg-gray-200 px-1 font-mono">/</kbd> to
        insert a field
      </p>

      {menuPos && (
        <SuggestionMenu
          position={menuPos}
          selectedIndex={menuIndex}
          onSelect={insertField}
          onClose={() => setMenuPos(null)}
        />
      )}

      {popover && (
        <PillPopover
          field={popover.element.dataset.field!}
          transform={
            (popover.element.dataset.transform as Transform) ?? "none"
          }
          rect={popover.rect}
          onChange={handlePillChange}
          onClose={() => setPopover(null)}
        />
      )}
    </div>
  );
}
