# Contributing to hubspot-snippets

Thanks for wanting to add something to this collection. This repo is a
curated, **GitHub-browsable** library of HubSpot HubL code: every entry
must be self-explanatory on its own GitHub page, with a README, at
least one screenshot, and enough context that a stranger can drop it
into their portal without asking questions.

This document is the execution manual for adding a new entry. Read it
start to finish before you open a pull request.

---

## Before you start

- **Write valid HubL.** HubL is HubSpot's server-side templating
  language (based on Jinjava). It is *not* Jinja2 and *not* Liquid —
  some filters and tags differ. Official reference:
  https://developers.hubspot.com/docs/cms/hubl
- **Test in a real HubSpot portal.** HubL has no mature offline
  validator; the only reliable way to catch bugs is to upload the code
  to a real portal and render it. A free HubSpot developer account is
  enough: https://developers.hubspot.com/
- **Never commit secrets.** Strip portal IDs, API keys, personal access
  tokens, personal email addresses, and account-specific paths from
  anything you contribute. If your entry needs a HubDB table ID or
  account ID, document it as a placeholder (e.g. `<YOUR_TABLE_ID>`) and
  explain it in the README.
- **Respect HubSpot's trademarks.** HubSpot and HubL are trademarks of
  HubSpot, Inc. This repo is unaffiliated.

---

## Pick the right category

Four top-level folders, four different use cases:

| If you want to…                                                                | Use      |
| ------------------------------------------------------------------------------ | -------- |
| Ship an editor-facing component with configurable fields (images, text, CTA…) | module   |
| Share a reusable, parameterised block of HubL (like a function)                | macro    |
| Share a drop-in template fragment with no arguments                            | partial  |
| Share a short HubL pattern or one-liner to paste into an existing template     | snippet  |

When in doubt:

- Does a non-technical marketer need to configure it? → **module**
- Does it take arguments but isn't editor-facing? → **macro**
- Is it a fixed chunk of markup reused in several templates? → **partial**
- Is it just "here's the HubL idiom for X"? → **snippet**

---

## Folder naming rules

- Use **lowercase-kebab-case**: `hero-banner`, `pricing-table`,
  `format-publish-date`.
- Names should be descriptive, not clever. `sticky-header` is good;
  `megathing` is not.
- Do not prefix folders with category names (the parent folder already
  tells you the category).
- For modules, the nested upload folder **must** end in `.module` — e.g.
  `hero-banner.module`. HubSpot requires this extension; the CLI will
  refuse to upload without it.

---

## Required structure per entry

### Modules

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

The wrapper folder (`modules/<name>/`) keeps README and screenshots
**outside** the uploadable `<name>.module` bundle, so `hs upload` does
not push documentation into the portal.

### Macros

```
macros/<name>/
├── README.md
├── screenshots/
│   └── preview.png
└── <name>.html
```

### Partials

```
partials/<name>/
├── README.md
├── screenshots/
│   └── preview.png
└── <name>.html
```

### Snippets

```
snippets/<name>/
├── README.md
├── screenshots/
│   └── preview.png
└── snippet.html
```

---

## The per-entry README

Every entry **must** have its own `README.md`. Start by copying
[`docs/SNIPPET_TEMPLATE.md`](./docs/SNIPPET_TEMPLATE.md) into your
entry's folder and filling it in. Do not write a README from scratch —
the template exists so that entries stay consistent.

Required sections (these must be present and filled in):

- **Title** (`# <Entry title>`)
- **Description** — what the entry does and why it exists.
- **Preview** — `![Preview](./screenshots/preview.png)`
- **Category** — modules / macros / partials / snippets.
- **Requirements** — HubSpot subscription tier, HubDB tables, global
  partials, CDN assets, minimum CLI version for modules, compatible
  `host_template_types`.
- **Installation** — exact steps for the entry's category (`hs upload`
  command for modules, `{% from … import … %}` for macros,
  `{% include … %}` for partials, copy-paste instructions for snippets).
- **Usage example** — a fenced HubL code block showing the entry in
  context.
- **Notes & caveats** — known limitations, accessibility notes, browser
  quirks, performance considerations.

Optional sections: **Fields / Inputs** (modules and parameterised
macros), **Screenshots** (additional images with captions),
**Changelog**, **Credits**.

Delete the HTML comment hints from the template before committing.

---

## Screenshots

Every entry needs at least one screenshot so the README renders nicely
on GitHub.

- **Location:** `<entry>/screenshots/`.
- **Canonical filename:** `preview.png` — this is the hero image shown
  at the top of the README.
- **Additional images:** prefix with a two-digit order, e.g.
  `01-editor.png`, `02-mobile.png`.
- **Format:** PNG or JPG.
- **Size:** keep the longest edge under ~1600 px and the file under
  ~500 KB. Large PNGs bloat the repo and slow GitHub rendering.
- **Referencing:** always use relative Markdown paths
  (`./screenshots/preview.png`), never absolute URLs.
- **Content:** do not include personal data, real customer information,
  portal IDs, or internal URLs. Blur or redact anything sensitive.

---

## HubL validation expectations

There is **no reliable offline HubL linter**. Do not assume CI will
catch your mistakes — there is no CI in this repo.

Before opening a pull request:

1. Install the HubSpot CLI: `npm install -g @hubspot/cli`.
2. Authenticate against a sandbox / developer portal: `hs auth`.
3. Upload your entry and render it on a real page, email, or blog post.
4. Confirm it works with the `host_template_types` you claim to support.

A free HubSpot developer account gives you a sandbox that is sufficient
for testing anything in this repo.

---

## Module-specific requirements

Modules have the most rules because HubSpot has strict requirements for
custom modules.

- **Folder name.** The inner upload folder **must** be named
  `<name>.module`. The `.module` extension is how HubSpot identifies
  the bundle — renaming it breaks uploads.
- **Required files** inside `<name>.module/`:
  - `module.html` — the HubL template.
  - `fields.json` — JSON array of field definitions.
  - `meta.json` — module metadata.
- **Optional files:**
  - `module.css` — module-scoped styles.
  - `module.js` — module-scoped JavaScript.
- **`meta.json` minimum keys:**
  - `label` — human-readable name shown in the editor.
  - `is_available_for_new_content` — boolean; whether marketers can add
    new instances.
  - `host_template_types` — array of template types the module can be
    used on (e.g. `["PAGE", "BLOG_POST", "BLOG_LISTING", "EMAIL"]`).
  - `css_assets` — array of linked stylesheet assets.
  - `js_assets` — array of linked script assets.
  - `smart_type` — smart-content behaviour (usually `"NOT_SMART"`).
  - Reference:
    https://developers.hubspot.com/docs/cms/building-blocks/modules/configuration
- **`fields.json`** is a JSON array of field definition objects. Each
  field object declares its `name`, `label`, `type`, and optional
  defaults / help text. Reference:
  https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields

Your entry's README **must** list the `host_template_types` it targets,
so users know whether they can drop it into a page, a blog post, or an
email.

Contributors without the HubSpot CLI can still contribute: paste the
files from `<name>.module/` directly into a new custom module in
Design Manager.

---

## Pull request checklist

Before you open a PR, confirm all of the following:

- [ ] The entry is in the correct top-level category folder.
- [ ] Folder name is lowercase-kebab-case.
- [ ] For modules, the inner folder ends in `.module` and the wrapper
      folder holds the README + `screenshots/`.
- [ ] `README.md` was copied from `docs/SNIPPET_TEMPLATE.md` and every
      required section is filled in.
- [ ] At least one screenshot exists at `screenshots/preview.png`.
- [ ] The entry has been uploaded to a real HubSpot portal and renders
      without errors.
- [ ] For modules: `meta.json` has `label`,
      `is_available_for_new_content`, `host_template_types`,
      `css_assets`, `js_assets`, and `smart_type`; `fields.json` is
      valid JSON.
- [ ] No secrets: no portal IDs, API keys, personal access tokens,
      personal email addresses, or account-specific paths.
- [ ] Screenshots contain no personal or customer data.

---

## Code of conduct

Be kind, be specific, and give credit. Assume good faith when reviewing
others' contributions and when receiving feedback on your own. This
repo exists to help people learn HubSpot CMS — keep it a place that
makes that easier.
