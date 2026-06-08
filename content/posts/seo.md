+++
title = "SEO Settings"
date = 2025-05-22

[taxonomies]
tags = ["configuration"]
+++

avel emits several metadata fields by default: canonical URL, Open Graph, Twitter Card, JSON-LD structured data, sitemap, and feed autodiscovery. They live in `<head>` and do not affect rendering speed.

The `twitter:` metadata names are still correct even after Twitter became X. There is no `x:` replacement.

Set `og_image` for social cards and `twitter` for the source account.

```toml
[extra]
og_image = "ogp.png"
og_image_alt = "My site"
twitter = "@yourhandle"
```

Without `og_image`, shared cards remain text-focused. When `og_image` is set, avel also emits image alt text. If `og_image_alt` is omitted, the current page title is used.
