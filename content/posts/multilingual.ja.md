+++
title = "言語切替の設定"
date = 2026-06-08

[taxonomies]
tags = ["configuration"]
+++

avel は、Zola の多言語コンテンツ機能を使って静的な言語切替を行います。ブラウザの言語を JavaScript で判定するのではなく、Zola が各言語のページを事前に生成し、テーマは対応するページへの普通のリンクを表示します。

このデモでは、英語を既定言語にし、日本語を `/ja/` 配下に出しています。

> **実際に試す:** この記事自体も両言語で用意してあります。[Read in English →](@/posts/multilingual.md) — URL が `/posts/multilingual/` に変わり、英語ページからもここへまっすぐ戻ってこられます。どちらの向きもただの静的な `<a>` リンクで、JavaScript もリダイレクトもありません。

## 設定

`config.toml` で英語を既定言語にし、日本語を追加します。

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

既定言語の taxonomy はトップレベルに置きます。

```toml
[[taxonomies]]
name = "tags"
url = "tags"
feed = false
```

## コンテンツファイル

日英で同じ slug を使います。既定言語は通常のファイル名、日本語は `.ja` を `.md` の前に付けます。

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

生成される URL は次のようになります。

```txt
/posts/my-post/
/ja/posts/my-post/
```

Zola はこれらを同じページの翻訳として扱うため、avel は相互にリンクできます。

## テンプレートの動き

記事一覧は、現在の言語を指定して posts セクションを取得します。

```tera
{% set posts = get_section(path="posts/_index.md", lang=lang) %}
```

UI の文言は翻訳キーから表示します。

```tera
{{ trans(key="posts", lang=lang) }}
```

言語切替は通常の静的リンクです。実行時の言語判定や JavaScript の fallback はありません。

## 実用上のルール

日本語訳でも URL slug は英語のままにします。URL 構造が安定し、テーマギャラリーのデモとしても確認しやすくなります。

```txt
content/posts/respect.md
content/posts/respect.ja.md
```

画面に出るタイトルや本文は、日本語に完全翻訳して構いません。
