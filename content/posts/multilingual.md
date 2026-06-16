+++
title = "Language Switching"
date = 2026-06-08

[taxonomies]
tags = ["configuration"]
+++

avel supports static language switching with Zola's multilingual content model. It does not detect the browser language with JavaScript. Instead, Zola builds each language ahead of time and the theme renders ordinary links between matching pages.

The demo uses English as the default language and Japanese under `/ja/`.

> **Try it now:** this very article exists in both languages. [日本語で読む →](@/posts/multilingual.ja.md) — the URL changes to `/ja/posts/multilingual/`, and the Japanese page links straight back here. Both directions are plain static `<a>` links: no JavaScript, no redirect.

## Configuration

Set English as the default language, then add Japanese in `config.toml`.

```toml
default_language = "en"

[translations]
home = "Home"
posts = "Posts"

[languages.ja]
title = "avel のホームページ（サンプル）"
description = "とにかく表示が速い、no-JS の Zola ブログテーマ"
taxonomies = [
  { name = "tags", url = "tags", feed = false },
]

[languages.ja.translations]
home = "トップ"
posts = "記事一覧"

[extra]
language_switch = true
```

Keep the default-language taxonomy at the top level.

```toml
[[taxonomies]]
name = "tags"
url = "tags"
feed = false
```

## Content files

Use the same slug for both languages. The default language has the plain filename, and Japanese adds `.ja` before `.md`.

```txt
content/
  _index.md
  _index.ja.md
  posts/
    _index.md
    _index.ja.md
    my-post.md
    my-post.ja.md
```

This produces:

```txt
/posts/my-post/
/ja/posts/my-post/
```

Zola matches these files as translations of the same page, so avel can link between them.

## Template behavior

The post list uses the active language when it reads the posts section.

```tera
{% set posts = get_section(path="posts/_index.md", lang=lang) %}
```

UI labels use translation keys.

```tera
{{ trans(key="posts", lang=lang) }}
```

The language switcher is a normal static link. There is no runtime language detection and no JavaScript fallback.

## Practical rule

Use English slugs even for Japanese translations. This keeps the URL structure stable and makes the theme gallery demo easier to inspect:

```txt
content/posts/respect.md
content/posts/respect.ja.md
```

The visible title can still be fully translated.
