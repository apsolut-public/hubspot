# Macros

Reusable HubL **macros** live here. A macro is the HubL equivalent of a
function: a named block of template code that accepts arguments and
returns rendered markup.

## What is a HubL macro?

Macros are defined inline in a HubL file using the `{% macro %}`
directive, then imported into other templates:

```hubl
{# custom/macros/button.html #}
{% macro cta_button(label, url, style='primary') %}
  <a href="{{ url }}" class="btn btn--{{ style }}">{{ label }}</a>
{% endmacro %}
```

Consumers pull the macro in with `{% from %}` or `{% import %}`:

```hubl
{% from 'custom/macros/button.html' import cta_button %}

{{ cta_button('Start free trial', '/signup') }}
{{ cta_button('Learn more', '/features', 'secondary') }}
```

Reference: https://developers.hubspot.com/docs/cms/hubl/variables-macros-syntax#macros

Macros are the right choice when you need a reusable, parameterised
fragment of markup **but do not need a marketer-editable module in the
page editor**.

## Folder structure

```
macros/
├── <name>.md              ← GitHub docs for this macro
└── <name>.html            ← the macro definition(s)

screenshots/
└── <name>/
    └── preview.png        ← referenced from <name>.md
```

The `.html` file contains one or more macro definitions. The sibling
`.md` file documents each macro's arguments, defaults, and an example
call.

## How to use a macro from this repo

1. In HubSpot's Design Manager, create a new HTML file — a good
   convention is `custom/macros/<name>.html`.
2. Paste the contents of this entry's `.html` file into it and save.
3. In the template that needs the macro, import it:
   ```hubl
   {% from 'custom/macros/<name>.html' import <macro_name> %}
   ```
4. Call the macro wherever you need its output.

Read the entry's own `README.md` for the exact macro names, arguments,
and any dependencies.

## Contributing

See the root [CONTRIBUTING.md](../CONTRIBUTING.md). Start each new entry
by copying [`../docs/SNIPPET_TEMPLATE.md`](../docs/SNIPPET_TEMPLATE.md)
into your macro's folder as `README.md`.

## Index

<!-- Add one bullet per macro as entries are contributed. -->

_No macros yet — be the first to contribute one!_
