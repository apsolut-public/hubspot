# Snippets

Small, copy-pasteable HubL **snippets** live here: one-off patterns and
short idioms that solve a specific problem inside an existing template.

## What's a snippet here?

A "snippet" in this repo is a bite-sized block of HubL that you drop
directly into a template you already own. Typical examples:

- Formatting a date with `|datetimeformat`.
- Looping over a HubDB table and rendering rows.
- Conditional content based on the current page, contact, or language.
- Rewriting a URL, building a query string, or escaping output safely.
- Showing different markup for logged-in vs anonymous visitors.

Snippets are **not** full templates, modules, macros, or partials.
They're short — often just a few lines — and they're meant to be
understood, adapted, and pasted in place.

Reference: https://developers.hubspot.com/docs/cms/hubl

## Folder structure

```
snippets/<name>/
├── README.md
├── screenshots/
│   └── preview.png
└── snippet.html
```

Note the canonical filename: **`snippet.html`** (singular, lowercase).
This keeps every snippet entry pointing at a predictable path.

## How to use

1. Open the entry's `snippet.html` on GitHub.
2. Copy the block you need.
3. Paste it directly into your own HubSpot template, module, or email.
4. Rename the variables to match your context (e.g. swap
   `content.publish_date` for your own date field).

Read the entry's README for the expected variables, HubSpot subscription
tier, and any HubDB or field dependencies before using it.

## Contributing

See the root [CONTRIBUTING.md](../CONTRIBUTING.md). Start each new entry
by copying [`../docs/SNIPPET_TEMPLATE.md`](../docs/SNIPPET_TEMPLATE.md)
into your snippet's folder as `README.md`.

## Index

<!-- Add one bullet per snippet as entries are contributed. -->

_No snippets yet — be the first to contribute one!_
