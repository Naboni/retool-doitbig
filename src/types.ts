export type Transform = "none" | "uppercase" | "lowercase" | "capitalize";

export type Segment =
  | { type: "text"; value: string }
  | { type: "variable"; field: string; transform: Transform };

export type Field = {
  id: string;
  label: string;
  inputType: "text" | "number";
};

export type Operator =
  | "is_empty"
  | "is_not_empty"
  | "equals"
  | "not_equals"
  | "contains"
  | "greater_than"
  | "less_than";

export type VisibilityRule = {
  enabled: boolean;
  field: string;
  operator: Operator;
  value: string;
};

export const FIELDS: Field[] = [
  { id: "name", label: "Name", inputType: "text" },
  { id: "age", label: "Age", inputType: "number" },
  { id: "email", label: "Email", inputType: "text" },
  { id: "city", label: "City", inputType: "text" },
];

export const OPERATORS: { value: Operator; label: string; needsValue: boolean }[] = [
  { value: "is_empty", label: "is empty", needsValue: false },
  { value: "is_not_empty", label: "is not empty", needsValue: false },
  { value: "equals", label: "equals", needsValue: true },
  { value: "not_equals", label: "does not equal", needsValue: true },
  { value: "contains", label: "contains", needsValue: true },
  { value: "greater_than", label: "is greater than", needsValue: true },
  { value: "less_than", label: "is less than", needsValue: true },
];
