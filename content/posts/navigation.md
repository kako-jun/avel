+++
title = "ナビゲーションのカスタマイズ"
date = 2025-06-15

[taxonomies]
tags = ["configuration"]
+++

サイドバーのリンクは `config.extra.nav` で定義します。

```toml
[extra]
nav = [
  { label = "トップ", url = "/" },
  { label = "記事一覧", url = "/posts/" },
  { label = "タグ一覧", url = "/tags/" },
  { label = "GitHub", url = "https://github.com/yourname" },
]
```

`nav` を設定しない場合は、既定のナビ（トップ・記事一覧）が表示されます。

## 箇条書き記号

既定では「●」が、項目ごとに色を変えて表示されます。阿部寛のホームページの 7 色のメニューに倣った配色です。記号や配色を変えたい場合、また記号を消したい場合は次のように指定します。

```toml
[extra]
nav_bullet = "●"          # 記号を変える。"" を指定すると消える
nav_bullet_colors = ["#ffcccc", "#00ff00", "#33ffff", "#0099ff", "#0000ff", "#333399", "#cc00cc"]
```

記号の色は、リストの先頭から順に、指定した色を 1 つずつ使い、色を使い切ると最初に戻って循環します。
