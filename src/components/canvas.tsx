import { useStore } from "@/store";
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
      <div className="flex flex-1 items-center justify-center text-gray-300">
        <p className="text-lg">
          Use the sidebar editor to build dynamic text
        </p>
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-20"}`}
    >
      <h1 className="text-2xl font-bold leading-relaxed">
        {template.map((seg, i) =>
          seg.type === "text" ? (
            <span key={i}>{seg.value}</span>
          ) : (
            <span key={i} className="text-blue-600">
              {values[seg.field]
                ? applyTransform(values[seg.field], seg.transform)
                : `[${seg.field}]`}
            </span>
          ),
        )}
      </h1>

      {!visible && (
        <p className="mt-2 text-sm text-gray-400">
          Hidden by visibility rule
        </p>
      )}
    </div>
  );
}
