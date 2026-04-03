import { Canvas } from "@/components/canvas";
import { FieldValues } from "@/components/field-values";
import { TemplateEditor } from "@/components/template-editor";
import { VisibilityRule } from "@/components/visibility-rule";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800/60 px-6 py-3">
        <h1 className="text-sm font-medium text-zinc-400">
          Dynamic Text Builder
        </h1>
      </header>

      <div className="mx-auto max-w-3xl px-6 pt-12 pb-20 space-y-12">
        <section>
          <Canvas />
        </section>

        <section>
          <details open>
            <summary className="mb-4 cursor-pointer text-[11px] font-semibold uppercase tracking-widest text-zinc-600 hover:text-zinc-400">
              Template
            </summary>
            <TemplateEditor />
          </details>
        </section>

        <section>
          <details open>
            <summary className="mb-4 cursor-pointer text-[11px] font-semibold uppercase tracking-widest text-zinc-600 hover:text-zinc-400">
              Field Values
            </summary>
            <FieldValues />
          </details>
        </section>

        <section>
          <details>
            <summary className="mb-4 cursor-pointer text-[11px] font-semibold uppercase tracking-widest text-zinc-600 hover:text-zinc-400">
              Visibility
            </summary>
            <VisibilityRule />
          </details>
        </section>
      </div>
    </div>
  );
}
