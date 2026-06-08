+++
title = "Profile and Contact Settings"
date = 2025-06-10

[taxonomies]
tags = ["configuration"]
+++

The homepage uses a two-column layout inspired by Hiroshi Abe's homepage: profile on the left, latest posts on the right. On narrow screens, the columns stack.

## Profile

```toml
[extra]
name = "Your Name"
profile_image = "me.webp"
profile_width = "120"
profile_height = "120"
profile_text = "one-line profile"
```

Put the image in `static/`. Width and height help avoid layout shift.

## Contact links

Use `social` to show contact links below the profile.

```toml
[extra]
social = [
  { label = "X", url = "https://x.com/yourname" },
  { label = "Instagram", url = "https://instagram.com/yourname" },
  { label = "GitHub", url = "https://github.com/yourname" },
]
```

External links open in a new tab.

