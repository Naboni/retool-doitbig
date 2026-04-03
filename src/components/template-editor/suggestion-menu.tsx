import { useRef, useEffect } from "react";
import type { Field } from "@/types";

type Props = {
  position: { x: number; y: number };
  fields: Field[];
  selectedIndex: number;
  filter: string;
  onSelect: (fieldId: string) => void;
  onClose: () => void;
};

export function SuggestionMenu({
  position,
  fields,
  selectedIndex,
  filter,
  onSelect,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="fixed z-50 w-48 rounded-lg border border-zinc-800 bg-zinc-900 py-1 shadow-xl"
      style={{ left: position.x, top: position.y }}
    >
      {filter && (
        <div className="px-3 py-1.5 text-xs text-zinc-500">/{filter}</div>
      )}
      {!filter && (
        <div className="px-3 py-1.5 text-xs text-zinc-500">Insert field</div>
      )}

      {fields.length === 0 ? (
        <div className="px-3 py-2 text-sm text-zinc-600">No matches</div>
      ) : (
        fields.map((field, i) => (
          <button
            key={field.id}
            className={`flex w-full items-center px-3 py-2 text-sm ${
              i === selectedIndex
                ? "bg-violet-500/10 text-violet-400"
                : "text-zinc-300 hover:bg-zinc-800"
            }`}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(field.id);
            }}
          >
            {field.label}
          </button>
        ))
      )}
    </div>
  );
}
