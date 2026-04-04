export type Transform = "none" | "uppercase" | "lowercase" | "capitalize" | "age" | "join_comma";

export type InputType = "text" | "number" | "date" | "list";

export type Segment =
  | { type: "text"; value: string }
  | { type: "variable"; field: string; transform: Transform };

export type Field = {
  id: string;
  label: string;
  inputType: InputType;
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

export function defaultTransforms(inputType: InputType): Transform[] {
  switch (inputType) {
    case "text":
      return ["none", "uppercase", "lowercase", "capitalize"];
    case "date":
      return ["none", "age"];
    case "list":
      return ["join_comma"];
    default:
      return [];
  }
}

export const OPERATORS: { value: Operator; label: string; needsValue: boolean; types: InputType[] }[] = [
  { value: "is_empty", label: "is empty", needsValue: false, types: ["text", "number", "date", "list"] },
  { value: "is_not_empty", label: "is not empty", needsValue: false, types: ["text", "number", "date", "list"] },
  { value: "equals", label: "equals", needsValue: true, types: ["text", "number"] },
  { value: "not_equals", label: "does not equal", needsValue: true, types: ["text", "number"] },
  { value: "contains", label: "contains", needsValue: true, types: ["text"] },
  { value: "greater_than", label: "is greater than", needsValue: true, types: ["number"] },
  { value: "less_than", label: "is less than", needsValue: true, types: ["number"] },
];
