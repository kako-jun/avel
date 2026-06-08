+++
title = "Customizing the Sidebar"
date = 2025-06-20

[taxonomies]
tags = ["configuration"]
+++

The left sidebar can be adjusted from `config.toml`: width, background color, border, and item spacing.

```toml
[extra]
nav_width = "18%"
nav_bg = "#f0f0ff"
nav_border = true
nav_item_gap = "1.3em"
```

The defaults follow Hiroshi Abe's homepage: a pale lavender background and an 18% sidebar.

On narrow screens, the sidebar automatically becomes a top horizontal menu.

