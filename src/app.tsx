import { Canvas } from "@/components/canvas";
import { FieldValues } from "@/components/field-values";
import { TemplateEditor } from "@/components/template-editor";
import { VisibilityRule } from "@/components/visibility-rule";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <h1 className="text-sm font-semibold tracking-tight text-gray-800">
          Dynamic Text Builder
        </h1>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">
        <section>
          <Canvas />
        </section>

        <section>
          <p className="mb-3 text-xs uppercase tracking-wide text-gray-400">
            Field Values
          </p>
          <FieldValues />
        </section>

        <section>
          <details open>
            <summary className="mb-3 cursor-pointer text-xs uppercase tracking-wide text-gray-400 hover:text-gray-600">
              Template
            </summary>
            <TemplateEditor />
          </details>
        </section>

        <section>
          <details>
            <summary className="mb-3 cursor-pointer text-xs uppercase tracking-wide text-gray-400 hover:text-gray-600">
              Visibility
            </summary>
            <VisibilityRule />
          </details>
        </section>
      </div>
    </div>
  );
}
