+++
title = "リンク色の変更"
date = 2025-07-20

[taxonomies]
tags = ["configuration"]
+++

デフォルト値は古典的なブラウザのデフォルトに合わせてある。

| キー | デフォルト | 用途 |
|---|---|---|
| `link_color` | `#0000cc` | 未訪問リンク |
| `link_visited` | `#551a8b` | 訪問済みリンク |

```toml
[extra]
link_color = "#cc0000"
link_visited = "#880000"
```

リンクはデフォルトで下線付き。これも意図的。
