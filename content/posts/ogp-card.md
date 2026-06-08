+++
title = "OGP Card Image"
date = 2026-06-08

[taxonomies]
tags = ["configuration"]
+++

avel can emit an Open Graph image for social sharing, but the image is optional. The theme does not force one fixed card on every site.

The demo uses `static/ogp.png` so links to the demo render as a large social card. Your own site should replace that image with one that matches your title, brand, and content.

## Configuration

Place an image in `static/`, then point `extra.og_image` at it.

```toml
[extra]
og_image = "ogp.png"
og_image_alt = "My site"
```

When `og_image` is set, avel emits `og:image`, `twitter:image`, and a large Twitter Card. When `og_image_alt` is set, it is used for both Open Graph and Twitter image alt text. If the alt text is omitted, the current page title is used.

## Image Size

Use a 1200 x 630 image for the most predictable preview across social sites.

The OGP image is separate from `screenshot.png`. `screenshot.png` is for the Zola theme gallery. `ogp.png` is for social sharing of your own site.
