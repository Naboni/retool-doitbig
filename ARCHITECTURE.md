# Architecture

## State Management — Zustand

Chose Zustand over React Context + useReducer.

- **Selector-based subscriptions**: components only re-render when the specific data they read changes, not on every state update.
- **No Provider boilerplate**: just import `useStore` and use it anywhere.
- **~1KB**: negligible bundle cost for a meaningful DX improvement.

## Stack — Vite + TypeScript + TailwindCSS v4

Kept Vite (no Next.js — no routing or SSR needed for a prototype). Added TypeScript for type safety and TailwindCSS v4 for styling, replacing inline styles from the starter.
