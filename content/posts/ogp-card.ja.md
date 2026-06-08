+++
title = "OGP カード画像"
date = 2026-06-08

[taxonomies]
tags = ["configuration"]
+++

avel は SNS 共有用の Open Graph 画像を出力できます。ただし画像は任意です。テーマが固定のカード画像をすべてのサイトに強制することはありません。

このデモでは `static/ogp.png` を使い、デモ URL が大きなカードとして表示されるようにしています。自分のサイトでは、サイト名・ブランド・内容に合う画像へ差し替えてください。

## 設定

画像を `static/` に置き、`extra.og_image` で指定します。

```toml
[extra]
og_image = "ogp.png"
og_image_alt = "My site"
```

`og_image` を設定すると、avel は `og:image`、`twitter:image`、大きな Twitter Card を出力します。`og_image_alt` を設定すると、Open Graph と Twitter の画像 alt に使われます。省略した場合は現在のページタイトルが使われます。

## 画像サイズ

SNS のプレビューを安定させるには、1200 x 630 の画像を使います。

OGP 画像は `screenshot.png` とは別物です。`screenshot.png` は Zola テーマギャラリー用です。`ogp.png` は自分のサイトが SNS で共有されたときのカード用です。
