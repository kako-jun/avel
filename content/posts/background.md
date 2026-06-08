+++
title = "Background Image"
date = 2025-07-10

[taxonomies]
tags = ["configuration"]
+++

The demo background is a tiled SVG file. Put an image in `static/` and point `background_image` at it.

```toml
[extra]
background_image = "bg.svg"
```

## Solid background

You can also skip the image and use a plain color.

```toml
[extra]
body_bg = "#fffff0"
```

