import { useStore } from "@/store";
import { FIELDS } from "@/types";
import { applyTransform, evaluateVisibility } from "@/lib";

export function Canvas() {
  const template = useStore((s) => s.template);
  const values = useStore((s) => s.values);
  const visible = useStore((s) => evaluateVisibility(s.visibility, s.values));

  const isEmpty = template.length === 0;
  const hasOnlyEmptyText =
    template.length === 1 &&
    template[0].type === "text" &&
    template[0].value.trim() === "";

  if (isEmpty || hasOnlyEmptyText) {
    return (
      <p className="text-lg text-gray-300">
        Use the sidebar editor to build dynamic text
      </p>
    );
  }

  return (
    <div
      className={`transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-20"}`}
    >
      <h2 className="text-2xl font-bold leading-relaxed">
        {template.map((seg, i) => {
          if (seg.type === "text") return <span key={i}>{seg.value}</span>;

          const val = values[seg.field];
          const label = FIELDS.find((f) => f.id === seg.field)?.label ?? seg.field;

          return val ? (
            <span key={i} className="text-blue-600">
              {applyTransform(val, seg.transform)}
            </span>
          ) : (
            <span
              key={i}
              className="rounded bg-gray-100 px-1.5 py-0.5 text-lg text-gray-400"
            >
              {label}
            </span>
          );
        })}
      </h2>

      {!visible && (
        <p className="mt-2 text-sm text-gray-400">
          Hidden by visibility rule
        </p>
      )}
    </div>
  );
}
