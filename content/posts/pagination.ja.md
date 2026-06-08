+++
title = "ページネーションの設定"
date = 2025-08-15

[taxonomies]
tags = ["configuration"]
+++

`content/posts/_index.md` に `paginate_by` を追加します。

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 20
+++
```

ページが複数になると、記事一覧の下にページ番号と前後の矢印が表示されます。

トップ（`/`）には最新 5 件だけが並びます。記事一覧（`/posts/`）は、ページネーション付きですべての記事を表示します。
