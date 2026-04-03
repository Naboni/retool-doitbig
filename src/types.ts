export type Transform = "none" | "uppercase" | "lowercase" | "capitalize";

export type Segment =
  | { type: "text"; value: string }
  | { type: "variable"; field: string; transform: Transform };

export type Field = {
  id: string;
  label: string;
  inputType: "text" | "number";
  transforms: Transform[];
};

export type Operator =
  | "is_empty"
  | "is_not_empty"
  | "equals"
  | "not_equals"
  | "contains"
  | "greater_than"
  | "less_than";

export type VisibilityCondition = {
  field: string;
  operator: Operator;
  value: string;
};

export type Visibility = {
  enabled: boolean;
  conditions: VisibilityCondition[];
};

export function defaultTransforms(inputType: "text" | "number"): Transform[] {
  return inputType === "text"
    ? ["none", "uppercase", "lowercase", "capitalize"]
    : [];
}

export const OPERATORS: { value: Operator; label: string; needsValue: boolean; types: ("text" | "number")[] }[] = [
  { value: "is_empty", label: "is empty", needsValue: false, types: ["text", "number"] },
  { value: "is_not_empty", label: "is not empty", needsValue: false, types: ["text", "number"] },
  { value: "equals", label: "equals", needsValue: true, types: ["text", "number"] },
  { value: "not_equals", label: "does not equal", needsValue: true, types: ["text", "number"] },
  { value: "contains", label: "contains", needsValue: true, types: ["text"] },
  { value: "greater_than", label: "is greater than", needsValue: true, types: ["number"] },
  { value: "less_than", label: "is less than", needsValue: true, types: ["number"] },
];
