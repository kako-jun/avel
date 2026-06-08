+++
title = "Comment Settings"
date = 2026-06-04

[taxonomies]
tags = ["configuration"]
+++

avel can show a [Nostalgic BBS](https://nostalgic.llll-ll.com/bbs) image comment section at the end of each post. The article page still has no runtime JavaScript. Recent comments are rendered as an SVG image, and clicking the image opens the Nostalgic posting page.

Enable it in `config.toml`.

```toml
[extra]
nostalgic_bbs = true
nostalgic_bbs_limit = 3
nostalgic_bbs_width = 760
nostalgic_bbs_label = "Comments"
nostalgic_bbs_hint = "Click to comment"
```

Before building, run the sync script.

```bash
npm run sync:nostalgic-bbs
zola build
```

The script uses `base_url` and each post path to find or create a Nostalgic BBS, then writes public ids to `data/nostalgic_bbs.toml`.

```toml
[posts]
"/posts/my-post/" = "my-post-bbs-id"
```

Keep `NOSTALGIC_TOKEN` in your build environment. Do not put it in front matter, templates, or generated HTML.

