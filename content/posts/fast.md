+++
title = "It Renders Fast"
date = 2025-10-15

[taxonomies]
tags = ["about"]
+++

Pages built with avel appear very quickly. There is no runtime JavaScript to parse or execute, and no external resources by default, so there are no extra DNS lookups or blocking CDN requests. CSS is inline, so the browser can start painting as soon as the HTML arrives.

The HTML is designed to render from top to bottom. The first text should not wait for the whole page to finish loading.

The demo aims for Lighthouse 100 in Performance, Accessibility, Best Practices, and SEO.

<img src="/lighthouse.webp" width="453" height="154" alt="Lighthouse scores: 100 for Performance, Accessibility, Best Practices, and SEO" loading="lazy" decoding="async">

Hiroshi Abe's homepage is fast for the same reason: it does not put unnecessary work in front of the reader.

