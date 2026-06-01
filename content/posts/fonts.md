+++
title = "フォントの変更"
date = 2025-07-01

[taxonomies]
tags = ["configuration"]
+++

デフォルトは `sans-serif`（システムのゴシック体）です。

## システムフォントを使う

```toml
[extra]
font = "serif"              # serif / sans-serif / monospace
font_family = "Georgia"     # 具体的な書体名
font_size = "14px"
```

外部リソースを読み込まないため、高速です。

## Google Fonts を使う

```toml
[extra]
google_fonts_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
font_family = "Noto Serif JP"
font = "serif"
```

初回のみ Google のサーバーへリクエストが発生します。
