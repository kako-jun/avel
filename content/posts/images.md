+++
title = "Embedding Images"
date = 2025-09-15

[taxonomies]
tags = ["usage"]
+++

Put images in `static/` and reference them from Markdown.

```markdown
![Description](/sample.svg)
```

Markdown images automatically receive `loading="lazy"` when `lazy_async_image = true` is set in `config.toml`.

<img src="/lighthouse.webp" width="453" height="154" alt="avel Lighthouse scores: 100 for Performance, Accessibility, Best Practices, and SEO" loading="lazy" decoding="async">

When writing HTML directly, include dimensions to avoid layout shift.

```html
<img src="/sample.svg" width="320" height="120" alt="sample image" loading="lazy">
```

