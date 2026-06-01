+++
title = "ページネーションの設定"
date = 2025-08-15

[taxonomies]
tags = ["configuration"]
+++

`content/posts/_index.md` に `paginate_by` を追加する。

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 10
+++
```

ページが複数になると記事一覧の下に前後リンクが出る。

トップ（`/`）は最新 5 件のみ表示。記事一覧（`/posts/`）はページネーション付きの全件表示。
