# Partials

Reusable HubL **partials** live here. A partial is a fragment of a
template that gets pulled into a parent template with `{% include %}`.

## What is a HubL partial?

A partial is just an HTML / HubL file that is designed to be included
from another template. Unlike macros, partials do **not** take
parameters — they read from whatever variables are already available in
the surrounding template context.

```hubl
{# In the parent template #}
{% include 'custom/partials/site-footer.html' %}
```

```hubl
{# custom/partials/site-footer.html #}
<footer class="site-footer">
  <p>&copy; {{ local_dt|datetimeformat('%Y') }} {{ site_settings.company_name }}</p>
</footer>
```

Reference: https://developers.hubspot.com/docs/cms/hubl/tags/standard-tags#include

## Partials vs modules vs macros

| Feature                              | Module | Macro | Partial |
| ------------------------------------ | :----: | :---: | :-----: |
| Editor-facing fields in the UI       |   yes  |   no  |    no   |
| Takes arguments                      |   via fields  |   yes  |    no   |
| Marketer can add multiple instances  |   yes  |  via caller  | via caller  |
| Best for structured, reusable UI     |   yes  |   ok  |    ok   |
| Best for plain "insert this chunk"   |    no  |   no  |   yes   |

Use a **partial** when you just need to drop the same block into
multiple templates without parameterising it. Reach for a **macro** if
you need arguments, and a **module** if a marketer should be able to
configure it from the page editor.

## Folder structure

```
partials/<name>/
├── README.md
├── screenshots/
│   └── preview.png
└── <name>.html
```

## How to use

1. In Design Manager, create a new HTML file, e.g.
   `custom/partials/<name>.html`.
2. Paste the contents of this entry's `.html` file into it and save.
3. In the parent template:
   ```hubl
   {% include 'custom/partials/<name>.html' %}
   ```
4. Ensure the surrounding template provides any variables the partial
   references (the entry's README will list them under **Requirements**).

## Contributing

See the root [CONTRIBUTING.md](../CONTRIBUTING.md). Start each new entry
by copying [`../docs/SNIPPET_TEMPLATE.md`](../docs/SNIPPET_TEMPLATE.md)
into your partial's folder as `README.md`.

## Index

<!-- Add one bullet per partial as entries are contributed. -->

_No partials yet — be the first to contribute one!_
