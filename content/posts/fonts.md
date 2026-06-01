+++
title = "フォントの変更"
date = 2025-07-01

[taxonomies]
tags = ["configuration"]
+++

デフォルトは `sans-serif`（システムのゴシック体）。

## システムフォント

```toml
[extra]
font = "serif"
font_family = "Georgia"
font_size = "14px"
```

外部リクエストなしで完結する。

## Google Fonts

```toml
[extra]
google_fonts_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
font_family = "Noto Serif JP"
font = "serif"
```

初回だけ Google のサーバーへリクエストが発生する。
