import { useState } from "react";
import { useStore } from "@/store";

export function FieldValues() {
  const fields = useStore((s) => s.fields);
  const template = useStore((s) => s.template);
  const values = useStore((s) => s.values);
  const setValue = useStore((s) => s.setValue);
  const addField = useStore((s) => s.addField);
  const removeField = useStore((s) => s.removeField);

  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<"text" | "number">("text");

  const usedFieldIds = new Set(
    template.filter((s) => s.type === "variable").map((s) => s.type === "variable" ? s.field : ""),
  );
  const usedFields = fields.filter((f) => usedFieldIds.has(f.id));
  const unusedFields = fields.filter((f) => !usedFieldIds.has(f.id));

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    addField(newLabel.trim(), newType);
    setNewLabel("");
    setNewType("text");
    setShowAdd(false);
  };

  return (
    <div>
      {usedFields.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {usedFields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-zinc-500">
                {field.label}
              </span>
              <input
                className="w-full rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-violet-500/50 focus:outline-none"
                type={field.inputType}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                min={field.inputType === "number" ? 0 : undefined}
                value={values[field.id]}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {unusedFields.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-xs text-zinc-600 hover:text-zinc-400">
            {unusedFields.length} unused field{unusedFields.length > 1 ? "s" : ""}
          </summary>
          <div className="mt-3 grid grid-cols-3 gap-4">
            {unusedFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-600">
                    {field.label}
                  </span>
                  <button
                    className="text-xs text-zinc-700 hover:text-red-400"
                    onClick={() => removeField(field.id)}
                  >
                    ✕
                  </button>
                </div>
                <input
                  className="w-full rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-violet-500/50 focus:outline-none"
                  type={field.inputType}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  min={field.inputType === "number" ? 0 : undefined}
                  value={values[field.id]}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </details>
      )}

      {showAdd ? (
        <div className="mt-4 flex items-center gap-2">
          <input
            className="w-32 rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-sm text-zinc-100 placeholder-zinc-600 focus:border-violet-500/50 focus:outline-none"
            placeholder="Field name"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            autoFocus
          />
          <select
            className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-sm text-zinc-300"
            value={newType}
            onChange={(e) => setNewType(e.target.value as "text" | "number")}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
          <button
            className="rounded bg-violet-600 px-3 py-1 text-sm font-medium text-white hover:bg-violet-500"
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            className="text-sm text-zinc-600 hover:text-zinc-400"
            onClick={() => setShowAdd(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="mt-4 text-sm text-violet-500 hover:text-violet-400"
          onClick={() => setShowAdd(true)}
        >
          + Add field
        </button>
      )}
    </div>
  );
}
