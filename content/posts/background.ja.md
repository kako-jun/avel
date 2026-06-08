+++
title = "背景画像の設定"
date = 2025-07-10

[taxonomies]
tags = ["configuration"]
+++

このサイトの背景は、SVG ファイルをタイル状に並べたものです。`static/` に置いた画像ファイルを指定すると、小さい画像は自動的にタイル表示されます。

```toml
[extra]
background_image = "bg.svg"
```

## 背景色のみ

画像を使わず、単色の背景にすることもできます。

```toml
[extra]
body_bg = "#fffff0"
```
