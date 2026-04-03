import { useStore } from "@/store";
import { FIELDS, OPERATORS } from "@/types";

export function VisibilityRule() {
  const visibility = useStore((s) => s.visibility);
  const setEnabled = useStore((s) => s.setVisibilityEnabled);
  const addCondition = useStore((s) => s.addCondition);
  const updateCondition = useStore((s) => s.updateCondition);
  const removeCondition = useStore((s) => s.removeCondition);

  return (
    <div>
      <h2 className="text-xs uppercase tracking-wide text-gray-400">
        Visibility
      </h2>

      <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          className="rounded"
          checked={visibility.enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        Show only when conditions are met
      </label>

      {visibility.enabled && (
        <div className="mt-3 space-y-2">
          {visibility.conditions.map((condition, i) => {
            const fieldDef = FIELDS.find((f) => f.id === condition.field);
            const validOps = OPERATORS.filter((o) =>
              o.types.includes(fieldDef?.inputType ?? "text"),
            );
            const activeOp = validOps.find((o) => o.value === condition.operator);

            return (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <span className="text-gray-500">
                  {i === 0 ? "Show when" : "and"}
                </span>

                <select
                  className="rounded border border-gray-300 px-2 py-1.5 text-sm"
                  value={condition.field}
                  onChange={(e) => {
                    const newField = FIELDS.find((f) => f.id === e.target.value);
                    const newOps = OPERATORS.filter((o) =>
                      o.types.includes(newField?.inputType ?? "text"),
                    );
                    const keepOp = newOps.some((o) => o.value === condition.operator);
                    updateCondition(i, {
                      field: e.target.value,
                      ...(keepOp ? {} : { operator: newOps[0].value }),
                    });
                  }}
                >
                  {FIELDS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>

                <select
                  className="rounded border border-gray-300 px-2 py-1.5 text-sm"
                  value={condition.operator}
                  onChange={(e) =>
                    updateCondition(i, {
                      operator: e.target.value as typeof condition.operator,
                    })
                  }
                >
                  {validOps.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                {activeOp?.needsValue && (
                  <input
                    className="w-24 rounded border border-gray-300 px-2 py-1.5 text-sm"
                    placeholder="value"
                    value={condition.value}
                    onChange={(e) =>
                      updateCondition(i, { value: e.target.value })
                    }
                  />
                )}

                {visibility.conditions.length > 1 && (
                  <button
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => removeCondition(i)}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

          <button
            className="mt-1 text-sm text-blue-600 hover:text-blue-800"
            onClick={addCondition}
          >
            + Add condition
          </button>
        </div>
      )}
    </div>
  );
}
