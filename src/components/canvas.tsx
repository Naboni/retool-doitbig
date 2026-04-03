import { useState, useRef, useEffect } from "react";
import { useStore } from "@/store";
import { applyTransform, evaluateVisibility } from "@/lib";

export function Canvas() {
  const fields = useStore((s) => s.fields);
  const template = useStore((s) => s.template);
  const values = useStore((s) => s.values);
  const setValue = useStore((s) => s.setValue);
  const visible = useStore((s) => evaluateVisibility(s.visibility, s.values));

  const [editingField, setEditingField] = useState<string | null>(null);

  const isEmpty = template.length === 0;
  const hasOnlyEmptyText =
    template.length === 1 &&
    template[0].type === "text" &&
    template[0].value.trim() === "";

  if (isEmpty || hasOnlyEmptyText) {
    return (
      <p className="py-8 text-center text-lg text-gray-300">
        Use the template editor below to build dynamic text
      </p>
    );
  }

  return (
    <div
      className={`transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-20"}`}
    >
      <p className="text-2xl font-bold leading-relaxed">
        {template.map((seg, i) => {
          if (seg.type === "text") return <span key={i}>{seg.value}</span>;

          const val = values[seg.field];
          const label =
            fields.find((f) => f.id === seg.field)?.label ?? seg.field;

          if (editingField === seg.field) {
            return (
              <InlineInput
                key={i}
                value={val}
                onSave={(v) => {
                  setValue(seg.field, v);
                  setEditingField(null);
                }}
              />
            );
          }

          return val ? (
            <span
              key={i}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => setEditingField(seg.field)}
            >
              {applyTransform(val, seg.transform)}
            </span>
          ) : (
            <span
              key={i}
              className="cursor-pointer rounded bg-gray-100 px-1.5 py-0.5 text-lg text-gray-400 hover:bg-gray-200"
              onClick={() => setEditingField(seg.field)}
            >
              {label}
            </span>
          );
        })}
      </p>

      {!visible && (
        <p className="mt-2 text-sm text-gray-400">Hidden by visibility rule</p>
      )}
    </div>
  );
}

function InlineInput({
  value,
  onSave,
}: {
  value: string;
  onSave: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  return (
    <input
      ref={ref}
      className="inline-block w-32 rounded border border-blue-400 bg-blue-50 px-1.5 py-0.5 text-2xl font-bold text-blue-600 outline-none"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => onSave(draft)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSave(draft);
        if (e.key === "Escape") onSave(value);
      }}
    />
  );
}
