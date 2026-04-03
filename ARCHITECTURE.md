# Architecture

## Project Structure

```
src/
  app.tsx                          — Root layout (canvas + sidebar + inputs)
  main.tsx                         — Entry point
  store.ts                         — Zustand store (global state)
  types.ts                         — Shared types and constants
  lib.ts                           — Pure utility functions (transforms, visibility eval)
  components/
    canvas.tsx                     — Live preview rendering
    visibility-rule.tsx            — Dropdown-based condition builder
    template-editor/
      index.tsx                    — Main editor (contenteditable + state wiring)
      suggestion-menu.tsx          — "/" slash-command dropdown with type-ahead filter
      pill-popover.tsx             — Click-a-pill popover (field switch + transform)
      utils.ts                    — DOM helpers (create pill, parse segments, render)
```

Imports use the `@/` path alias configured in `tsconfig.json` and `vite.config.ts`.

## State — Zustand

Single store with selector-based subscriptions. No Provider, no boilerplate.

- `values` — current input values keyed by field id
- `template` — ordered array of text/variable segments
- `visibility` — toggle + array of conditions (AND logic)

## Template Editor — "/" Mention System

Users insert dynamic data by typing `/` in the editor, which opens a filtered suggestion dropdown. Selecting a field inserts an inline pill (`<span contenteditable="false">`). Clicking a pill opens a popover to change the field or apply a transform.

The editor is a `contenteditable` div. On every edit, the DOM is parsed into a `Segment[]` array and synced to the store. The canvas reads this array to render live output.

## Visibility — Multiple Conditions

Dropdown-based rule builder. Each condition is a sentence: "Show when [field] [operator] [value]". Multiple conditions use AND logic. Operators are filtered by field type (text fields get "contains", number fields get "greater than" / "less than").

## Transforms — Field-Aware

Transforms are scoped per field type. Name/City support uppercase, lowercase, capitalize. Email supports lowercase only. Number fields have no transforms.

## Stack

Vite 6 + React 19 + TypeScript + TailwindCSS v4 + Zustand.
