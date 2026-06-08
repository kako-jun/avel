+++
title = "Use This Comment Section with Any Zola Theme"
date = 2026-06-06

[taxonomies]
tags = ["configuration"]
+++

avel's comment section is made from independent pieces. If your site is built with Zola, you can add the same no-JS comment block even when you use another theme.

If you already use avel, follow [the comment settings article](@/posts/comments.md). This article is for sites that want only the comment component.

This page also has a comment section at the bottom, so you can see the result in place.

## Prerequisites

[Nostalgic](https://nostalgic.llll-ll.com) is free and requires no account sign-up. Choose any 8-16 character string as your token.

## Step 1 - Copy the script

Copy `scripts/sync-nostalgic-bbs.mjs` into your site's `scripts/` directory. Then run the script before `zola build`.

```bash
node scripts/sync-nostalgic-bbs.mjs && zola build
```

Cloudflare Pages and other CI builds can use the same command.

The script scans `content/posts/` by default. If your articles live elsewhere, set `NOSTALGIC_CONTENT_DIR`.

```bash
NOSTALGIC_CONTENT_DIR=content/articles node scripts/sync-nostalgic-bbs.mjs && zola build
```

## Step 2 - Put the token in an environment variable

The script reads `process.env.NOSTALGIC_TOKEN`. Do not commit this token.

```bash
export NOSTALGIC_TOKEN=your-token-here
```

If the token is missing, existing BBS ids are kept and new BBS creation is skipped.

## Step 3 - Add config

Only `nostalgic_bbs = true` is required. The other keys have template defaults.

```toml
[extra]
nostalgic_bbs = true
nostalgic_bbs_limit = 3
nostalgic_bbs_width = 760
nostalgic_bbs_label = "Comments"
nostalgic_bbs_hint = "Click to comment"
```

## Step 4 - Add the template block

Override your theme's `templates/page.html` and place avel's Nostalgic BBS block after the article body. For the full version, see avel's own `templates/page.html`.

