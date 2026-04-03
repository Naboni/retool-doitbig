import { useStore } from "@/store";
import { OPERATORS } from "@/types";

export function VisibilityRule() {
  const fields = useStore((s) => s.fields);
  const visibility = useStore((s) => s.visibility);
  const setEnabled = useStore((s) => s.setVisibilityEnabled);
  const addCondition = useStore((s) => s.addCondition);
  const updateCondition = useStore((s) => s.updateCondition);
  const removeCondition = useStore((s) => s.removeCondition);

  const selectClass =
    "rounded border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-200 focus:border-violet-500/50 focus:outline-none";

  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-zinc-400">
        <input
          type="checkbox"
          className="rounded border-zinc-700 bg-zinc-900 text-violet-500 focus:ring-violet-500/30"
          checked={visibility.enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        Show only when conditions are met
      </label>

      {visibility.enabled && (
        <div className="mt-3 space-y-2">
          {visibility.conditions.map((condition, i) => {
            const fieldDef = fields.find((f) => f.id === condition.field);
            const validOps = OPERATORS.filter((o) =>
              o.types.includes(fieldDef?.inputType ?? "text"),
            );
            const activeOp = validOps.find((o) => o.value === condition.operator);

            return (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <span className="text-zinc-600">
                  {i === 0 ? "Show when" : "and"}
                </span>

                <select
                  className={selectClass}
                  value={condition.field}
                  onChange={(e) => {
                    const newField = fields.find((f) => f.id === e.target.value);
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
                  {fields.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>

                <select
                  className={selectClass}
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
                    className="w-24 rounded border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-200 placeholder-zinc-600 focus:border-violet-500/50 focus:outline-none"
                    placeholder="value"
                    value={condition.value}
                    onChange={(e) =>
                      updateCondition(i, { value: e.target.value })
                    }
                  />
                )}

                {visibility.conditions.length > 1 && (
                  <button
                    className="text-zinc-700 hover:text-red-400"
                    onClick={() => removeCondition(i)}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

          <button
            className="mt-1 text-sm text-violet-500 hover:text-violet-400"
            onClick={addCondition}
          >
            + Add condition
          </button>
        </div>
      )}
    </div>
  );
}
