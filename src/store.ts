import { create } from "zustand";
import type { Segment, Visibility, VisibilityCondition } from "./types";
import { FIELDS } from "./types";

const DEFAULT_CONDITION: VisibilityCondition = {
  field: FIELDS[0].id,
  operator: "is_not_empty",
  value: "",
};

type Store = {
  values: Record<string, string>;
  template: Segment[];
  visibility: Visibility;
  setValue: (field: string, value: string) => void;
  setTemplate: (template: Segment[]) => void;
  setVisibilityEnabled: (enabled: boolean) => void;
  addCondition: () => void;
  updateCondition: (index: number, patch: Partial<VisibilityCondition>) => void;
  removeCondition: (index: number) => void;
};

export const useStore = create<Store>((set) => ({
  values: Object.fromEntries(FIELDS.map((f) => [f.id, ""])),
  template: [
    { type: "text", value: "Hello " },
    { type: "variable", field: "name", transform: "none" as const },
    { type: "text", value: ", welcome to " },
    { type: "variable", field: "city", transform: "none" as const },
  ],
  visibility: { enabled: false, conditions: [{ ...DEFAULT_CONDITION }] },

  setValue: (field, value) =>
    set((s) => ({ values: { ...s.values, [field]: value } })),
  setTemplate: (template) => set({ template }),
  setVisibilityEnabled: (enabled) =>
    set((s) => ({ visibility: { ...s.visibility, enabled } })),
  addCondition: () =>
    set((s) => ({
      visibility: {
        ...s.visibility,
        conditions: [...s.visibility.conditions, { ...DEFAULT_CONDITION }],
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
