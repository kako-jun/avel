+++
title = "Customizing Navigation"
date = 2025-06-15

[taxonomies]
tags = ["configuration"]
+++

Sidebar links can be defined with `config.extra.nav`.

```toml
[extra]
nav = [
  { label = "Home", url = "/" },
  { label = "Posts", url = "/posts/" },
  { label = "Tags", url = "/tags/" },
  { label = "GitHub", url = "https://github.com/yourname" },
]
```

If `nav` is omitted, avel renders language-aware default links.

## Bullets

By default, each item has a colored `●`, following the seven-color menu feel of Hiroshi Abe's homepage.

```toml
[extra]
nav_bullet = "●"
nav_bullet_colors = ["#ffcccc", "#00ff00", "#33ffff", "#0099ff", "#0000ff", "#333399", "#cc00cc"]
```

Colors cycle from the first item onward.

## Previous and next posts

Post pages show previous and next links at the bottom, using the section's `sort_by` order.

