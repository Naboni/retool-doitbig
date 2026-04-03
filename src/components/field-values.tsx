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
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {usedFields.map((field) => (
            <div key={field.id} className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{field.label}</span>
              <input
                className="w-36 rounded border border-gray-200 px-2 py-1 text-sm focus:border-blue-400 focus:outline-none"
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
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600">
            {unusedFields.length} unused field{unusedFields.length > 1 ? "s" : ""}
          </summary>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {unusedFields.map((field) => (
              <div key={field.id} className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">{field.label}</span>
                <input
                  className="w-36 rounded border border-gray-200 px-2 py-1 text-sm focus:border-blue-400 focus:outline-none"
                  type={field.inputType}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  min={field.inputType === "number" ? 0 : undefined}
                  value={values[field.id]}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
                <button
                  className="text-xs text-gray-300 hover:text-red-500"
                  onClick={() => removeField(field.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </details>
      )}

      {showAdd ? (
        <div className="mt-3 flex items-center gap-2">
          <input
            className="w-32 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-400 focus:outline-none"
            placeholder="Field name"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            autoFocus
          />
          <select
            className="rounded border border-gray-300 px-2 py-1 text-sm"
            value={newType}
            onChange={(e) => setNewType(e.target.value as "text" | "number")}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
          <button
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            className="text-sm text-gray-400 hover:text-gray-600"
            onClick={() => setShowAdd(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="mt-3 text-sm text-blue-600 hover:text-blue-800"
          onClick={() => setShowAdd(true)}
        >
          + Add field
        </button>
      )}
    </div>
  );
}
