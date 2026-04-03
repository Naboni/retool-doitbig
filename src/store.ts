import { create } from "zustand";
import type { Field, Segment, Visibility, VisibilityCondition } from "./types";
import { defaultTransforms } from "./types";

const DEFAULT_FIELDS: Field[] = [
  { id: "name", label: "Name", inputType: "text", transforms: ["none", "uppercase", "lowercase", "capitalize"] },
  { id: "age", label: "Age", inputType: "number", transforms: [] },
  { id: "email", label: "Email", inputType: "text", transforms: ["none", "lowercase"] },
  { id: "city", label: "City", inputType: "text", transforms: ["none", "uppercase", "lowercase", "capitalize"] },
];

type Store = {
  fields: Field[];
  values: Record<string, string>;
  template: Segment[];
  visibility: Visibility;

  addField: (label: string, inputType: "text" | "number") => void;
  removeField: (id: string) => void;
  setValue: (field: string, value: string) => void;
  setTemplate: (template: Segment[]) => void;
  setVisibilityEnabled: (enabled: boolean) => void;
  addCondition: () => void;
  updateCondition: (index: number, patch: Partial<VisibilityCondition>) => void;
  removeCondition: (index: number) => void;
};

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export const useStore = create<Store>((set, get) => ({
  fields: DEFAULT_FIELDS,
  values: Object.fromEntries(DEFAULT_FIELDS.map((f) => [f.id, ""])),
  template: [
    { type: "text", value: "Hello " },
    { type: "variable", field: "name", transform: "none" as const },
    { type: "text", value: ", welcome to " },
    { type: "variable", field: "city", transform: "none" as const },
  ],
  visibility: {
    enabled: false,
    conditions: [{ field: DEFAULT_FIELDS[0].id, operator: "is_not_empty", value: "" }],
  },

  addField: (label, inputType) => {
    const id = slugify(label);
    if (!id || get().fields.some((f) => f.id === id)) return;
    const field: Field = { id, label, inputType, transforms: defaultTransforms(inputType) };
    set((s) => ({
      fields: [...s.fields, field],
      values: { ...s.values, [id]: "" },
    }));
  },

  removeField: (id) =>
    set((s) => {
      const { [id]: _, ...restValues } = s.values;
      return {
        fields: s.fields.filter((f) => f.id !== id),
        values: restValues,
        template: s.template.filter((seg) => seg.type === "text" || seg.field !== id),
        visibility: {
          ...s.visibility,
          conditions: s.visibility.conditions.filter((c) => c.field !== id),
        },
      };
    }),

  setValue: (field, value) =>
    set((s) => ({ values: { ...s.values, [field]: value } })),
  setTemplate: (template) => set({ template }),
  setVisibilityEnabled: (enabled) =>
    set((s) => ({ visibility: { ...s.visibility, enabled } })),
  addCondition: () =>
    set((s) => ({
      visibility: {
        ...s.visibility,
        conditions: [
          ...s.visibility.conditions,
          { field: s.fields[0]?.id ?? "", operator: "is_not_empty" as const, value: "" },
        ],
      },
    })),
  updateCondition: (index, patch) =>
    set((s) => ({
      visibility: {
        ...s.visibility,
        conditions: s.visibility.conditions.map((c, i) =>
          i === index ? { ...c, ...patch } : c,
        ),
      },
    })),
  removeCondition: (index) =>
    set((s) => ({
      visibility: {
        ...s.visibility,
        conditions: s.visibility.conditions.filter((_, i) => i !== index),
      },
    })),
}));
