# Purple Cross — Employee Management Dashboard

> **Vue 3 ∙ Vite ∙ TypeScript ∙ Tailwind CSS ∙ Pinia ∙ Vitest**  
> Built with ❤️ by **Breno Mendes** 

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
5. [NPM Scripts](#npm-scripts)  
6. [Architecture](#architecture)  
7. [Author & Contact](#author--contact)

---

## Project Overview
**Purple Cross** is a responsive Employee Management dashboard that demonstrates enterprise‑grade front‑end patterns: composables, modular state management, headless UI building blocks, and exhaustive unit tests.  
It was designed to showcase best‑practice Vue 3 in a real‑world CRUD scenario, with attention to performance, accessibility and DX.

---

## Key Features
| Area | Highlights |
|------|------------|
| **Table** | Sort ▲▼, search filter, department dropdown, pagination (desktop & compact mobile), horizontal scroll only when needed |
| **CSV IO** | One‑click **Import** & **Export** with schema validation |
| **CRUD** | Create, edit & soft‑delete employees with graceful optimistic updates |
| **Profile** | Avatar card, status panel (Active / Terminated), edit‑in‑place form |
| **UX** | Toasts, skeleton loaders, keyboard shortcuts, focus‑trapped dialogs |

---

## Tech Stack
| Layer | Choice | Reason |
|-------|--------|--------|
| UI | **Vue 3 + `<script setup>` + Composition API** | Concise, reactive & testable |
| Bundler | **Vite** | Instant dev server & native TS support |
| Styling | **Tailwind CSS** | Utility‑first, fully responsive; themable via design tokens |
| State | **Pinia** | Type‑safe store modules; simple devtools integration |
| Routing | **Vue Router 4** | Code‑splitting & route guards |
| Tests | **Vitest + Vue Test Utils** | Jest‑compatible API, fast in‑memory DOM |

---

## Getting Started
```bash
# 1. Clone the repo
git clone https://github.com/your-org/purple-cross.git && cd purple-cross

# 2. Install deps
pnpm i   # or npm ci / yarn

# 3. Launch dev server
pnpm dev  # open http://localhost:5173

# 4. Run tests
pnpm test  # vitest --coverage
```

> **Node ≥ 18** & **pnpm ≥ 8** recommended.

---

## NPM Scripts
| Script | Description |
|--------|-------------|
| `dev` | Vite dev server + HMR |
| `build` | Production build (≈ 15 kB gzip) |
| `preview` | Serve dist build locally |
| `lint` | ESLint + Prettier check |
| `test:coverage` | Unit tests with coverage report |

---

## Architecture
```
src/
 ├─ components/
 │   ├─ common/            # IconComponent, ToastContainer, ToastMessage
 │   ├─ AppHeader.vue
 │   └─ __tests__/         # isolated unit tests for shared UI
 │
 ├─ employee/
 │   ├─ components/
 │   │   ├─ table/         # EmployeeTable, Filters, Pagination, Dialogs
 │   │   ├─ form/          # atomic inputs, ActionBar
 │   │   ├─ profile/       # AvatarCard, StatusPanel
 │   │   └─ __tests__/     # component tests
 │   │
 │   ├─ composables/       # useEmployeeHelpers, useCsvHandlers, useEmployeeForm, …
 │   ├─ pages/             # EmployeeForm, EmployeeList, EmployeeProfile (+ tests)
 │   └─ services/          # employees.ts (mock persistence layer)
 │
 ├─ layouts/               # future route shells
 └─ assets/                # svg & static
```

---

## Author & Contact
**Breno Mendes** — Senior Front‑End Engineer (React & Vue)  
[LinkedIn](https://www.linkedin.com/in/breno-mendes) • brenommartins889@gmail.com

---

© 2025 Breno Mendes — MIT License
