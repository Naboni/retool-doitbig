import { create } from "zustand";
import type { Segment, VisibilityRule } from "./types";
import { FIELDS } from "./types";

type Store = {
  values: Record<string, string>;
  template: Segment[];
  visibility: VisibilityRule;
  setValue: (field: string, value: string) => void;
  setTemplate: (template: Segment[]) => void;
  setVisibility: (patch: Partial<VisibilityRule>) => void;
};

export const useStore = create<Store>((set) => ({
  values: Object.fromEntries(FIELDS.map((f) => [f.id, ""])),
  template: [{ type: "text", value: "Here comes text with variables" }],
  visibility: {
    enabled: false,
    field: FIELDS[0].id,
    operator: "is_not_empty",
    value: "",
  },

  setValue: (field, value) =>
    set((s) => ({ values: { ...s.values, [field]: value } })),
  setTemplate: (template) => set({ template }),
  setVisibility: (patch) =>
    set((s) => ({ visibility: { ...s.visibility, ...patch } })),
}));
