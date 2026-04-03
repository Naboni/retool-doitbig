import { useStore } from "@/store";
import { FIELDS } from "@/types";
import { Canvas } from "@/components/canvas";
import { TemplateEditor } from "@/components/template-editor";
import { VisibilityRule } from "@/components/visibility-rule";

export default function App() {
  const values = useStore((s) => s.values);
  const setValue = useStore((s) => s.setValue);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center border-b border-gray-200 px-6 py-3">
        <h1 className="text-sm font-semibold tracking-tight text-gray-800">
          Dynamic Text Builder
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col p-8">
          <div className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-wide text-gray-400">
              Preview
            </p>
            <Canvas />
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-gray-400">
              Input Fields
            </p>
            <div className="flex flex-wrap gap-4">
              {FIELDS.map((field) => (
                <label
                  key={field.id}
                  className="flex w-52 flex-col gap-1.5 text-sm text-gray-600"
                >
                  {field.label}
                  <input
                    className="rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type={field.inputType}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    min={field.inputType === "number" ? 0 : undefined}
                    value={values[field.id]}
                    onChange={(e) => setValue(field.id, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        </main>

        <aside className="flex w-[380px] shrink-0 flex-col gap-6 overflow-y-auto border-l border-gray-200 bg-gray-50 p-6">
          <TemplateEditor />
          <hr className="border-gray-200" />
          <VisibilityRule />
        </aside>
      </div>
    </div>
  );
}
