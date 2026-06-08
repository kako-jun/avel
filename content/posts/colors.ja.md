+++
title = "文字色・リンク色の変更"
date = 2025-07-20

[taxonomies]
tags = ["configuration"]
+++

既定値は、古典的なブラウザの既定色に合わせてあります。

| キー | デフォルト | 用途 |
|---|---|---|
| `text_color` | `#000000` | 本文の文字色 |
| `link_color` | `#0000ee` | 未訪問リンク |
| `link_visited` | `#551a8b` | 訪問済みリンク |

色を変えたい場合は `config.toml` で上書きします。

```toml
[extra]
text_color = "#000000"
link_color = "#cc0000"
link_visited = "#880000"
```

リンクには既定で下線が付きます。これも、読みやすさを優先した意図的な設定です。
