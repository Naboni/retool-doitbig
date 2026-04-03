import type { Transform, Visibility, VisibilityCondition } from "@/types";

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

function evaluateCondition(
  condition: VisibilityCondition,
  values: Record<string, string>,
): boolean {
  const val = values[condition.field] ?? "";
  switch (condition.operator) {
    case "is_empty":
      return val === "";
    case "is_not_empty":
      return val !== "";
    case "equals":
      return val === condition.value;
    case "not_equals":
      return val !== condition.value;
    case "contains":
      return val.includes(condition.value);
    case "greater_than":
      return Number(val) > Number(condition.value);
    case "less_than":
      return Number(val) < Number(condition.value);
  }
}

export function evaluateVisibility(
  visibility: Visibility,
  values: Record<string, string>,
): boolean {
  if (!visibility.enabled || visibility.conditions.length === 0) return true;
  return visibility.conditions.every((c) => evaluateCondition(c, values));
}
