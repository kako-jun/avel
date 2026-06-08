+++
title = "Changing Fonts"
date = 2025-07-01

[taxonomies]
tags = ["configuration"]
+++

The default font is `sans-serif`. This follows Hiroshi Abe's homepage: because it has almost no styling, browsers show their own default fonts.

## System fonts

```toml
[extra]
font = "serif"
font_family = "Georgia"
font_size = "14px"
```

System fonts add no external requests, so they keep the site fast.

## Google Fonts

```toml
[extra]
google_fonts_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
font_family = "Noto Serif JP"
font = "serif"
```

This adds a request to Google's servers on first load. Use it only when the font is worth the cost.

