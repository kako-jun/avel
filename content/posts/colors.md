+++
title = "リンク色の変更"
date = 2025-07-20

[taxonomies]
tags = ["configuration"]
+++

デフォルトのリンク色は古典的なブラウザのデフォルト値に合わせています。

| 設定キー | デフォルト値 | 説明 |
|---|---|---|
| `link_color` | `#0000cc` | 未訪問リンクの色 |
| `link_visited` | `#551a8b` | 訪問済みリンクの色 |

変更する場合は `config.toml` に追加します。

```toml
[extra]
link_color = "#cc0000"
link_visited = "#880000"
```

avel のリンクはデフォルトで下線付き（`text-decoration: underline`）です。これも阿部寛スタイルの一部です。
