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

Every module in this repo lives inside a **wrapper folder** that carries
the README and screenshots, with the actual uploadable `.module` bundle
nested one level deeper:

```
modules/<name>/
├── README.md
├── screenshots/
│   └── preview.png
└── <name>.module/
    ├── module.html
    ├── module.css
    ├── module.js
    ├── fields.json
    └── meta.json
```

### Why the wrapper folder?

HubSpot requires module folders to end in `.module` — that extension is
part of how the CLI identifies them. If documentation and screenshots
lived *inside* the `.module` folder, they would be uploaded to the
portal alongside the real assets and clutter Design Manager.

The wrapper folder (`modules/<name>/`) keeps docs and images **outside**
the upload target, so `hs upload` only touches the bundle that HubSpot
actually needs.

## How to use a module from this repo

### Option A — HubSpot CLI (recommended)

1. Install the CLI (one-time): `npm install -g @hubspot/cli`
2. Authenticate against your portal: `hs auth`
   (A free HubSpot developer account is enough for testing.)
3. Upload the module bundle — **point at the `.module` folder, not the
   wrapper**:
   ```
   hs upload modules/<name>/<name>.module <remote-path>/<name>.module
   ```
   Example:
   ```
   hs upload modules/hero-banner/hero-banner.module custom/modules/hero-banner.module
   ```

### Option B — Manual copy via Design Manager

1. In Design Manager, create a new custom module.
2. Open each file from `<name>.module/` in this repo and paste its
   contents into the matching panel in Design Manager (HTML + HubL, CSS,
   JS, Fields).
3. Copy any `meta.json` settings (label, `host_template_types`, etc.)
   into the module's settings panel manually.

Read the entry's own `README.md` for subscription, HubDB, and
`host_template_types` requirements before installing.

## Contributing a new module

See the root [CONTRIBUTING.md](../CONTRIBUTING.md) for the full process,
including the canonical folder layout, required `meta.json` keys, and
screenshot rules. Start every new entry by copying
[`../docs/SNIPPET_TEMPLATE.md`](../docs/SNIPPET_TEMPLATE.md) into your
module's wrapper folder as `README.md`.

## Index

<!-- Add one bullet per module as entries are contributed. -->
<!-- - [hero-banner](./hero-banner/) — full-width hero with configurable CTA. -->

_No modules yet — be the first to contribute one!_
