<!--
  Per-entry README template for hubspot-snippets.

  HOW TO USE:
  1. Copy this file into your new entry folder as `README.md`
     (e.g. modules/my-hero-banner/README.md).
  2. Fill in every section. Delete sections that genuinely do not apply
     (e.g. "Fields / Inputs" for a plain snippet).
  3. Remove these HTML comment hints before committing.
-->

# <Entry title>

<!-- Short, human-readable name. Match the folder name in Title Case. -->

## Description

<!--
  One to three sentences. What does this entry do, and why would someone
  drop it into their HubSpot portal? Avoid marketing copy — be specific.
-->

## Preview

![Preview](./screenshots/preview.png)

<!--
  `preview.png` is the canonical hero image for the entry. It is what
  GitHub shows on the README page and is referenced from category indexes.
-->

## Category

<!-- One of: modules / macros / partials / snippets -->

## Requirements

<!--
  List everything a user needs BEFORE they can use this entry:
    - HubSpot subscription tier (CMS Hub Free / Starter / Professional / Enterprise)
    - Dependencies: HubDB tables, global partials, external fonts / CDNs, icons
    - For modules: minimum HubSpot CLI version (`hs --version`)
    - Browser / device constraints, if any
-->

## Installation

<!--
  Per-category instructions. Pick the one that matches your entry and
  delete the others.

  Modules (recommended, uses the HubSpot CLI):
    hs upload modules/<name>/<name>.module <remote-path>/<name>.module

  Modules (manual, no CLI):
    In Design Manager, create a new custom module and paste the contents
    of module.html / module.css / module.js / fields.json into the matching
    panels.

  Macros:
    1. In Design Manager, create a new HTML file (e.g. `custom/macros/<name>.html`)
       and paste this entry's `.html` file into it.
    2. In the template that needs the macro, import it:
       {% from 'custom/macros/<name>.html' import <macro_name> %}

  Partials:
    1. In Design Manager, create a new HTML file (e.g. `custom/partials/<name>.html`)
       and paste this entry's `.html` file into it.
    2. In the parent template:
       {% include 'custom/partials/<name>.html' %}

  Snippets:
    Copy `snippet.html` and paste the relevant block directly into an
    existing template. Adapt variable names as needed.
-->

## Fields / Inputs

<!--
  Only applies to modules and parameterised macros. Delete this section
  for plain partials or snippets.
-->

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
|      |      |          |         |             |

## Usage example

<!--
  Show a real, paste-ready HubL call that demonstrates this entry in
  context. Use a fenced code block with `hubl` (or `html`) as the language.
-->

```hubl
{# example usage goes here #}
```

## Screenshots

<!--
  Optional additional images. Store them in `./screenshots/` alongside
  `preview.png`. Reference them here with relative paths and captions.

  ![Editor view](./screenshots/01-editor.png)
  *Module fields as they appear in the HubSpot page editor.*
-->

## Notes & caveats

<!--
  Known limitations, gotchas, accessibility notes, performance
  considerations, required `host_template_types` for modules, etc.
-->

## Changelog

<!-- Optional. Keep entries dated and terse.
  - 2026-04-10 — Initial version.
-->

## Credits

<!-- Optional. Original author, inspirations, links to source articles. -->
