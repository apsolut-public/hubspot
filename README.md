# Hubspot Snippets

A curated, browseable collection of sharable HubSpot HubL code —
modules, macros, partials, and snippets — that you can drop into any
HubSpot CMS Hub portal.

## What this is

This repo is a library of **HubL** (HubSpot's server-side templating
language, based on Jinjava) code intended for HubSpot CMS Hub. Every
entry lives in its own folder with a README and at least one screenshot,
so you can browse the collection on GitHub and understand each entry
without cloning anything.

> HubL reference: https://developers.hubspot.com/docs/cms/hubl
>
> Note: HubL only runs inside HubSpot's CMS Hub — there is no local
> runtime. The only reliable way to test a HubL file is to upload it to
> a real HubSpot portal.

## Who it's for

- **HubSpot CMS developers** who want to stop reinventing modules and
  macros.
- **Designers** looking for ready-made editor-facing building blocks.
- **Marketers and ops folks** who want copy-pasteable HubL patterns for
  landing pages, blog posts, and emails.

## What's inside

| Folder                          | What lives there                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`modules/`](./modules/)        | Full HubSpot custom modules with `fields.json` / `meta.json`, ready to `hs upload`.              |
| [`macros/`](./macros/)          | Reusable, parameterised HubL macros imported with `{% from … import … %}`.                        |
| [`partials/`](./partials/)      | Drop-in HubL template fragments pulled in with `{% include … %}`.                                 |
| [`snippets/`](./snippets/)      | Short HubL patterns and idioms to paste directly into your own templates.                         |

Not sure which category your problem belongs in? See the decision guide
in [CONTRIBUTING.md](./CONTRIBUTING.md#pick-the-right-category).

## How to browse

- Open any of the four category folders above.
- Each category README explains the category, shows the canonical
  folder layout, and links to the individual entries.
- Every entry is its own folder containing:
  - `README.md` — description, requirements, installation, usage
    example, and notes.
  - `screenshots/preview.png` — at minimum, a hero image of the entry
    in action.
  - The actual code (`.module/` bundle, `.html` file, or `snippet.html`).

## Requirements

- **HubSpot CMS Hub.** Every entry runs server-side in a HubSpot portal.
  Individual entries may require a specific subscription tier (CMS Hub
  Free, Starter, Professional, or Enterprise) — check the entry's
  README.
- **Optional: HubSpot CLI.** The CLI (`@hubspot/cli`) is the recommended
  way to upload modules. Install it with:
  ```
  npm install -g @hubspot/cli
  ```
  then authenticate with `hs auth`. A free HubSpot developer account is
  enough: https://developers.hubspot.com/

## Quick start (for users)

### Modules

With the HubSpot CLI authenticated, upload the **inner `.module`
bundle** (not the wrapper folder):

```
hs upload modules/<name>/<name>.module <remote-path>/<name>.module
```

Without the CLI, open the files under `<name>.module/` and paste each
one into the matching panel of a new custom module in Design Manager.

### Macros, partials, and snippets

1. Open the entry's `.html` file on GitHub.
2. Copy its contents into a new HTML file in HubSpot's Design Manager
   (e.g. `custom/macros/<name>.html` or `custom/partials/<name>.html`).
3. Import or include it from your template, following the instructions
   in the entry's README. Snippets are just pasted directly into an
   existing template.

Full per-category instructions live in the category READMEs:
[modules](./modules/README.md),
[macros](./macros/README.md),
[partials](./partials/README.md),
[snippets](./snippets/README.md).

## Contributing

Contributions are welcome! Every entry must be self-documenting on its
own GitHub page. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- the canonical folder layout for each category,
- the per-entry README template
  ([`docs/SNIPPET_TEMPLATE.md`](./docs/SNIPPET_TEMPLATE.md)),
- screenshot rules,
- module-specific requirements (`fields.json`, `meta.json`,
  `host_template_types`, the `.module` folder extension),
- the pull request checklist.

## License

[MIT](./LICENSE). Copyright © 2026.

## Disclaimer

This project is **not affiliated with, endorsed by, or sponsored by
HubSpot, Inc.** HubSpot®, HubL, and HubSpot CMS Hub are trademarks of
HubSpot, Inc. All code in this repository is provided **as-is**,
without warranty of any kind; test every entry in a sandbox before
using it on a production portal.
