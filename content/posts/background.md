+++
title = "背景画像の設定"
date = 2025-07-10

[taxonomies]
tags = ["configuration"]
+++

このサイトの背景は SVG ファイルをタイル表示したもの。

```toml
[extra]
background_image = "bg.svg"
```

`static/` に置いた画像ファイルを指定する。小さい画像は自動的にタイル表示される。

## 背景色のみ

```toml
[extra]
body_bg = "#fffff0"
```
