# Architecture

## Project Structure

```
src/
  app.tsx                          — Single-column layout
  main.tsx                         — Entry point
  store.ts                         — Zustand store (fields, values, template, visibility)
  types.ts                         — Shared types, operators, transform helpers
  lib.ts                           — Pure functions (transforms, visibility evaluation)
  components/
    canvas.tsx                     — Live preview with inline click-to-edit values
    field-values.tsx               — Compact key-value field list with add/remove
    visibility-rule.tsx            — Dropdown-based condition builder
    template-editor/
      index.tsx                    — Main editor (contenteditable + state wiring)
      suggestion-menu.tsx          — "/" slash-command dropdown with type-ahead filter
      pill-popover.tsx             — Click-a-pill popover (field switch + transform)
      utils.ts                     — DOM helpers (create pill, parse segments, render)
```

Imports use the `@/` path alias configured in `tsconfig.json` and `vite.config.ts`.

## Layout

Single-column, top-down flow. No sidebar, no dashboard. Preview is the hero element at the top, followed by field values, then collapsible configuration panels (template editor, visibility rules).

## State — Zustand

Single store with selector-based subscriptions.

- `fields` — user-definable field definitions (name, type, transforms). Users can add/remove custom fields.
- `values` — current values keyed by field id
- `template` — ordered array of text/variable segments
- `visibility` — toggle + array of AND conditions

## Template Editor — "/" Mention System

Users type `/` to open a filtered suggestion dropdown. Selecting a field inserts an inline pill (`<span contenteditable="false">`). Clicking a pill opens a popover to change the field or apply a transform.

## Preview — Inline Editing

Click any dynamic value or placeholder in the preview to edit it in-place. The preview serves as both output display and primary input method.

## Field Values — Contextual Key-Value List

Shows only fields referenced in the template. Unused fields are tucked into a collapsible "unused" section. Users can add custom fields (name + type) or remove unused ones.

## Visibility — Multiple Conditions

Dropdown-based rule builder with AND logic. Operators are filtered by field type.

## Transforms — Field-Aware

Scoped per field definition. Text fields support uppercase/lowercase/capitalize. Number fields have no transforms. Custom fields get defaults based on type.

## Stack

Vite 6 + React 19 + TypeScript + TailwindCSS v4 + Zustand.
