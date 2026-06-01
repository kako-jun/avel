+++
title = "背景画像の設定"
date = 2025-07-10

[taxonomies]
tags = ["configuration"]
+++

このサイトで使っている水玉模様のような背景は、SVG ファイルをタイル表示したものです。

```toml
[extra]
background_image = "bg.svg"
```

`static/` に置いた任意の画像ファイルを指定できます。小さい画像は自動的にタイル表示されます。

## 背景色のみにする

画像を使わず背景色だけにする場合は `body_bg` を指定します。

```toml
[extra]
body_bg = "#fffff0"   # 薄いクリーム色など
```
