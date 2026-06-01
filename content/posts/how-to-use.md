+++
title = "avel の使い方"
date = 2026-05-01
+++

avel は阿部寛のホームページにインスパイアされた、JS ゼロの軽量 Zola テーマです。

## インストール

```bash
cd your-site
git submodule add https://github.com/kako-jun/avel themes/avel
```

`config.toml` に以下を追加します。

```toml
theme = "avel"
```

## 設定

`config.toml` の `[extra]` セクションでスタイルを調整できます。

```toml
[extra]
name = "Your Name"
profile_image = "me.webp"
nav_width = "20%"
nav_bg = "#f0f0ff"
font = "serif"
footer = "© Your Name"

nav = [
  { label = "トップ", url = "/" },
  { label = "記事一覧", url = "/posts/" },
]
```

## ナビゲーション

`nav` を設定するとサイドバーにリンクが並びます。未設定の場合はデフォルトのナビが表示されます。

## フォント

システムフォントのみを使う場合は `font_family` に書体名を直接指定します。Google Fonts を使う場合は `google_fonts_url` に URL を設定します。

```toml
google_fonts_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
font_family = "Noto Serif JP"
```
