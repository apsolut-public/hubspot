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

## Naming rules

- Use **lowercase-kebab-case** for entry names: `hero-banner`,
  `pricing-table`, `format-publish-date`.
- Names should be descriptive, not clever. `sticky-header` is good;
  `megathing` is not.
- Do not prefix names with category names (the parent folder already
  tells you the category).
- For modules, the bundle folder **must** be named `<name>.module` —
  HubSpot requires the `.module` extension and the CLI will refuse to
  upload without it.
- Documentation files:
  - Modules → `README.md` **inside** the `.module` folder.
  - Macros / partials / snippets → sibling `<name>.md` next to the
    entry's `.html` file.

---

## Required structure per entry

### Modules

```
modules/
└── <name>.module/
    ├── README.md          ← GitHub docs (kept out of upload by .hsignore)
    ├── module.html
    ├── fields.json
    ├── meta.json
    ├── module.css         (optional)
    └── module.js          (optional)
```

The `README.md` lives **inside** the `.module` folder next to the code.
`hs upload` would normally push it to the portal, but the `.hsignore`
at the repo root excludes `**/README.md` so only the runtime files ship.

### Macros, partials, snippets

```
<category>/
├── <name>.md              ← sibling documentation (copy from docs/SNIPPET_TEMPLATE.md)
└── <name>.html            ← the macro / partial / snippet code
```

Where `<category>` is `macros/`, `partials/`, or `snippets/`. These
categories don't use folders per entry — the `.md` and `.html` sit
flat inside the category folder.

### Screenshots (all categories)

Screenshots for every entry, regardless of category, live in a central
`/screenshots/` folder at the repo root:

```
screenshots/
└── <name>/
    ├── preview.png        ← canonical hero image
    └── 01-editor.png      (optional extras)
```

Reference them from your documentation file with a relative path:

- From `modules/<name>.module/README.md` → `../../screenshots/<name>/preview.png`
- From `macros|partials|snippets/<name>.md` → `../screenshots/<name>/preview.png`

---

## The per-entry documentation file

Every entry **must** have its own documentation file. Start by copying
[`docs/SNIPPET_TEMPLATE.md`](./docs/SNIPPET_TEMPLATE.md) to:

- `modules/<name>.module/README.md` for modules, **or**
- `<category>/<name>.md` for macros, partials, snippets.

Do not write a doc from scratch — the template exists so that entries
stay consistent.

Required sections (these must be present and filled in):

- **Title** (`# <Entry title>`)
- **Description** — what the entry does and why it exists.
- **Preview** — `![Preview](<relative-path>/screenshots/<name>/preview.png)`
  (`../../` from inside `.module/`, `../` from sibling `.md` files).
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

Every entry needs at least one screenshot so the documentation renders
nicely on GitHub.

- **Location:** `/screenshots/<name>/` at the repo root (NOT inside
  category folders, NOT inside `.module/` bundles). One subfolder per
  entry, even if the entry currently has only one image.
- **Canonical filename:** `preview.png` — this is the hero image shown
  at the top of the documentation file.
- **Additional images:** prefix with a two-digit order, e.g.
  `01-editor.png`, `02-mobile.png`.
- **Format:** PNG or JPG.
- **Size:** keep the longest edge under ~1600 px and the file under
  ~500 KB. Large PNGs bloat the repo and slow GitHub rendering.
- **Referencing:** always use relative Markdown paths, never absolute
  URLs:
  - From `modules/<name>.module/README.md` → `../../screenshots/<name>/preview.png`
  - From sibling `.md` files → `../screenshots/<name>/preview.png`
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
- [ ] Entry name is lowercase-kebab-case.
- [ ] For modules, the bundle folder is named `<name>.module` and its
      `README.md` is inside that folder.
- [ ] For macros / partials / snippets, the sibling `.md` file sits
      next to the `.html` file in the category folder.
- [ ] The documentation file was copied from
      `docs/SNIPPET_TEMPLATE.md` and every required section is filled
      in (including the correct relative path to the preview image).
- [ ] At least one screenshot exists at
      `screenshots/<name>/preview.png`.
- [ ] The entry has been uploaded to a real HubSpot portal and renders
      without errors. For modules, verify the upload ran from the repo
      root so `.hsignore` excluded the README.
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
