+++
title = "Changing Text and Link Colors"
date = 2025-07-20

[taxonomies]
tags = ["configuration"]
+++

The defaults follow classic browser colors.

| Key | Default | Purpose |
|---|---|---|
| `text_color` | `#000000` | Body text |
| `link_color` | `#0000ee` | Unvisited links |
| `link_visited` | `#551a8b` | Visited links |

Override them in `config.toml`.

```toml
[extra]
text_color = "#000000"
link_color = "#cc0000"
link_visited = "#880000"
```

Links stay underlined by default. That is intentional: readability comes first.

