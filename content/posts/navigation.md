+++
title = "ナビゲーションのカスタマイズ"
date = 2025-06-15

[taxonomies]
tags = ["configuration"]
+++

サイドバーのナビゲーションリンクは `config.extra.nav` で定義します。

```toml
[extra]
nav = [
  { label = "トップ", url = "/" },
  { label = "記事一覧", url = "/posts/" },
  { label = "タグ一覧", url = "/tags/" },
  { label = "GitHub", url = "https://github.com/yourname" },
]
```

`nav` を設定しない場合は、トップと記事一覧のみのシンプルなデフォルトナビが表示されます。

## 箇条書き記号

各リンクの先頭に記号を付けられます。

```toml
[extra]
nav_bullet = "■"   # ■ ● ▶ など
```
