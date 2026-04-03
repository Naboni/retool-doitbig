# Dynamic Text Builder

A no-code tool for building dynamic text templates. Insert variables, apply transforms, and set visibility rules — all without writing code.

## Getting Started

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## How It Works

### 1. Preview

The top section shows your live output. Click on any highlighted value to edit it directly inline.

### 2. Template Editor

Type regular text in the editor. Press `/` to open a field menu — select a field to insert it as a visual pill. Click any pill to change the field or apply a transform (uppercase, lowercase, capitalize).

### 3. Field Values

Fields used in your template appear here with editable inputs. You can also add custom fields (text or number) or remove unused ones.

### 4. Visibility Rules

Toggle conditional visibility to show or hide the output based on field values. Add multiple conditions — operators adapt to the field type (e.g., "greater than" only appears for numbers).

## Tech Stack

- React 19 + TypeScript
- Vite 6
- TailwindCSS v4
- Zustand (state management)

## Project Structure

```
src/
  app.tsx                        — Single-column layout
  store.ts                       — Zustand store (fields, values, template, visibility)
  types.ts                       — Shared types, operators, transform helpers
  lib.ts                         — Pure functions (transforms, visibility evaluation)
  components/
    canvas.tsx                   — Live preview with inline editing
    field-values.tsx             — Key-value field list with add/remove
    visibility-rule.tsx          — Condition builder
    template-editor/
      index.tsx                  — Contenteditable editor + state sync
      suggestion-menu.tsx        — "/" slash-command dropdown
      pill-popover.tsx           — Field/transform popover
      utils.ts                   — DOM helpers (pills, parsing, rendering)
```
