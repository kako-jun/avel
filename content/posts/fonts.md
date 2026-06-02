+++
title = "フォントの変更"
date = 2025-07-01

[taxonomies]
tags = ["configuration"]
+++

既定のフォントは `sans-serif`（ゴシック体）です。阿部寛のホームページが CSS を持たず、多くのブラウザの既定フォント（日本語ではゴシック体）で表示されるのに倣っています。明朝体にしたい場合や、別の書体を使いたい場合は `config.toml` で変更できます。

## システムフォント

```toml
[extra]
font = "serif"
font_family = "Georgia"
font_size = "14px"
```

システムにある書体だけを使えば、外部へのリクエストは発生しません。表示の速さを優先するなら、この方法がおすすめです。

## Google Fonts

```toml
[extra]
google_fonts_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
font_family = "Noto Serif JP"
font = "serif"
```

この場合は、初回だけ Google のサーバーへリクエストが発生します。読み込みのぶん表示は遅くなりますので、必要なときだけ使うとよいでしょう。
