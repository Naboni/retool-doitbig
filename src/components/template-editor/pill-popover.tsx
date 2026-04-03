import { useRef, useState, useEffect } from "react";
import { FIELDS } from "@/types";
import type { Transform } from "@/types";

const TRANSFORMS: { value: Transform; label: string }[] = [
  { value: "none", label: "As entered" },
  { value: "uppercase", label: "UPPERCASE" },
  { value: "lowercase", label: "lowercase" },
  { value: "capitalize", label: "Capitalized" },
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
  const [localField, setLocalField] = useState(field);
  const [localTransform, setLocalTransform] = useState(transform);

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
      className="fixed z-50 w-56 rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
      style={{ left: rect.left, top: rect.bottom + 4 }}
    >
      <div className="space-y-3">
        <label className="block text-xs font-medium text-gray-500">
          Field
          <select
            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            value={localField}
            onChange={(e) => {
              setLocalField(e.target.value);
              onChange(e.target.value, localTransform);
            }}
          >
            {FIELDS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-gray-500">
          Transform
          <select
            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
            value={localTransform}
            onChange={(e) => {
              const t = e.target.value as Transform;
              setLocalTransform(t);
              onChange(localField, t);
            }}
          >
            {TRANSFORMS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
