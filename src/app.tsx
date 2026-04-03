import { useStore } from "@/store";
import { FIELDS } from "@/types";
import { Canvas } from "@/components/canvas";
import { TemplateEditor } from "@/components/template-editor";

export default function App() {
  const values = useStore((s) => s.values);
  const setValue = useStore((s) => s.setValue);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col gap-6 p-8">
          <Canvas />

          <div className="flex flex-wrap gap-4">
            {FIELDS.map((field) => (
              <label
                key={field.id}
                className="flex w-56 flex-col gap-1.5 text-sm text-gray-600"
              >
                {field.label}
                <input
                  className="rounded-md border border-gray-300 px-3 py-2 text-base"
                  type={field.inputType}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  min={field.inputType === "number" ? 0 : undefined}
                  value={values[field.id]}
                  onChange={(e) => setValue(field.id, e.target.value)}
                />
              </label>
            ))}
          </div>
        </main>

        <aside className="flex w-[400px] flex-col gap-6 border-l border-gray-200 bg-gray-50 p-6">
          <TemplateEditor />
        </aside>
      </div>
    </div>
  );
}
