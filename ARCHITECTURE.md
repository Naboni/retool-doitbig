# Architecture

## Project Structure

```
src/
  app.tsx                          — Root layout (canvas + sidebar)
  main.tsx                         — Entry point
  store.ts                         — Zustand store (global state)
  types.ts                         — Shared types and constants
  components/
    template-editor/
      index.tsx                    — Main editor (contenteditable + state wiring)
      suggestion-menu.tsx          — "/" slash-command dropdown
      pill-popover.tsx             — Click-a-pill popover (field switch + transform)
      utils.ts                     — DOM helpers (create pill, parse segments, render)
```

Imports use the `@/` path alias (e.g. `@/store`, `@/types`) configured in `tsconfig.json` and `vite.config.ts`.

## State Management — Zustand

Chose Zustand over React Context + useReducer.

- **Selector-based subscriptions**: components only re-render when the specific data they read changes, , not on every state update.
- **No Provider boilerplate**: import `useStore` and use it anywhere.
- **~1KB**: negligible bundle cost.

## Template Editor — "/" Mention System

Non-technical users insert dynamic data by typing `/` in the editor, which opens a suggestion dropdown. Selecting a field inserts an inline pill (a styled, non-editable `<span>`). Clicking a pill opens a popover to change the field or apply a transform (uppercase, lowercase, capitalize).

The editor is a `contenteditable` div. On every edit, the DOM is parsed into a `Segment[]` array (text + variable references) and synced to the store. The preview reads from this array to render live output.

## Stack

Vite + React 19 + TypeScript + TailwindCSS v4. No Next.js — no routing or SSR needed for a prototype.
