import { useRef, useState, useEffect } from "react";
import { useStore } from "@/store";
import type { Transform } from "@/types";

const TRANSFORMS: { value: Transform; label: string }[] = [
  { value: "none", label: "As entered" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "capitalize", label: "Capitalized" },
  { value: "age", label: "Age (years)" },
  { value: "join_comma", label: "Comma-separated" },
];

type Props = {
  field: string;
  transform: Transform;
  rect: DOMRect;
  onChange: (field: string, transform: Transform) => void;
  onClose: () => void;
};

export function PillPopover({
  field,
  transform,
  rect,
  onChange,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fields = useStore((s) => s.fields);
  const [localField, setLocalField] = useState(field);
  const [localTransform, setLocalTransform] = useState(transform);
  const fieldDef = fields.find((f) => f.id === localField);
  const availableTransforms = TRANSFORMS.filter((t) =>
    fieldDef?.transforms.includes(t.value),
  );

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);

  const selectClass =
    "mt-1 block w-full rounded border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-200 focus:border-violet-500/50 focus:outline-none";

  return (
    <div
      ref={ref}
      className="fixed z-50 w-56 rounded-lg border border-zinc-800 bg-zinc-900 p-3 shadow-xl"
      style={{ left: rect.left, top: rect.bottom + 4 }}
    >
      <div className="space-y-3">
        <label className="block text-xs font-medium text-zinc-500">
          Field
          <select
            className={selectClass}
            value={localField}
            onChange={(e) => {
              const newField = e.target.value;
              const newFieldDef = fields.find((f) => f.id === newField);
              const keepTransform = newFieldDef?.transforms.includes(localTransform);
              const newTransform = keepTransform ? localTransform : (newFieldDef?.transforms[0] ?? "none");
              setLocalField(newField);
              setLocalTransform(newTransform);
              onChange(newField, newTransform);
            }}
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        {availableTransforms.length > 0 && (
          <label className="block text-xs font-medium text-zinc-500">
            Transform
            <select
              className={selectClass}
              value={localTransform}
              onChange={(e) => {
                const t = e.target.value as Transform;
                setLocalTransform(t);
                onChange(localField, t);
              }}
            >
              {availableTransforms.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
