# Modules

HubSpot **custom modules** live here. Each entry is a self-contained UI
building block that a marketer can drop onto a page, email, or blog post
from the HubSpot editor.

## What is a HubSpot module?

A module is a reusable, editor-facing component made up of:

- a **HubL template** (`module.html`) that renders the markup,
- optional **CSS** (`module.css`) and **JavaScript** (`module.js`),
- a **`fields.json`** file that defines the inputs a marketer sees in the
  page editor (text, image, rich text, color, choice, etc.),
- a **`meta.json`** file that declares the module's label, which template
  types it can be used on, linked assets, and smart-content behaviour.

Modules are the most powerful unit of reuse in HubSpot CMS Hub: once
uploaded, a non-technical user can add as many instances as they want
without touching HubL.

Reference: https://developers.hubspot.com/docs/cms/building-blocks/modules

## How entries are structured

Each module lives in a single `<name>.module/` folder directly under
`modules/`. Its documentation (`README.md`) sits **inside** the folder
next to the code; only the screenshots live outside, in the central
`/screenshots/<name>/` folder at the repo root.

```
modules/
└── <name>.module/
    ├── README.md          ← GitHub-facing docs (excluded from upload by .hsignore)
    ├── module.html
    ├── fields.json
    ├── meta.json
    ├── module.css         (optional)
    └── module.js          (optional)

screenshots/
└── <name>/
    └── preview.png        ← referenced from README.md with ../../screenshots/<name>/preview.png
```

### Why the README.md lives inside `.module/`

HubSpot requires module folders to end in `.module` — that extension is
how the CLI identifies them. Everything inside a `.module` folder gets
uploaded to the portal by `hs upload` **unless** `.hsignore` excludes
it. The `.hsignore` at the repo root already has `**/README.md` and
`**/screenshots`, so the README and screenshot folder are automatically
kept out of every upload.

This keeps the module self-contained on GitHub: open the folder, see
the docs right there. But the portal only ever receives `module.html`,
`fields.json`, `meta.json`, and the optional CSS / JS.

## How to use a module from this repo

### Option A — HubSpot CLI (recommended)

1. Install the CLI (one-time): `npm install -g @hubspot/cli`
2. Authenticate against your portal: `hs auth`
   (A free HubSpot developer account is enough for testing.)
3. Upload the module bundle **from the repo root** so `.hsignore` is
   honored:
   ```
   hs upload modules/<name>.module <remote-path>/<name>.module
   ```
   Example:
   ```
   hs upload modules/multistep-form-validation.module custom/modules/multistep-form-validation.module
   ```

### Option B — Manual copy via Design Manager

1. In Design Manager, create a new custom module.
2. Open each file from `<name>.module/` in this repo — **ignore the
   `README.md`** — and paste the contents into the matching panel in
   Design Manager (HTML + HubL, CSS, JS, Fields).
3. Copy any `meta.json` settings (label, `host_template_types`, etc.)
   into the module's settings panel manually.

Read the module's `README.md` for subscription, HubDB, and
`host_template_types` requirements before installing.

## Contributing a new module

See the root [CONTRIBUTING.md](../CONTRIBUTING.md) for the full process,
including the canonical layout, required `meta.json` keys, and
screenshot rules. Start every new module by copying
[`../docs/SNIPPET_TEMPLATE.md`](../docs/SNIPPET_TEMPLATE.md) into your
new `.module/` folder as `README.md` and filling it in.

## Index

- [multistep-form-validation](./multistep-form-validation.module/README.md) — client-side per-step validation for HubSpot HSFC multi-step forms.
