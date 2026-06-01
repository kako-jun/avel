+++
title = "ナビゲーションのカスタマイズ"
date = 2025-06-15

[taxonomies]
tags = ["configuration"]
+++

サイドバーのリンクは `config.extra.nav` で定義する。

```toml
[extra]
nav = [
  { label = "トップ", url = "/" },
  { label = "記事一覧", url = "/posts/" },
  { label = "タグ一覧", url = "/tags/" },
  { label = "GitHub", url = "https://github.com/yourname" },
]
```

`nav` を設定しない場合はデフォルトのナビ（トップ・記事一覧）が表示される。

## 箇条書き記号

```toml
[extra]
nav_bullet = "■"   # ■ ● ▶ など
```
