import type { Transform, VisibilityRule } from "@/types";

export function applyTransform(value: string, transform: Transform): string {
  switch (transform) {
    case "uppercase":
      return value.toUpperCase();
    case "lowercase":
      return value.toLowerCase();
    case "capitalize":
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    default:
      return value;
  }
}

export function evaluateRule(
  rule: VisibilityRule,
  values: Record<string, string>,
): boolean {
  if (!rule.enabled) return true;
  const val = values[rule.field] ?? "";
  switch (rule.operator) {
    case "is_empty":
      return val === "";
    case "is_not_empty":
      return val !== "";
    case "equals":
      return val === rule.value;
    case "not_equals":
      return val !== rule.value;
    case "contains":
      return val.includes(rule.value);
    case "greater_than":
      return Number(val) > Number(rule.value);
    case "less_than":
      return Number(val) < Number(rule.value);
  }
}
