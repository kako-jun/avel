+++
title = "ページネーションの設定"
date = 2025-08-15

[taxonomies]
tags = ["configuration"]
+++

記事が増えてきたら、1ページあたりの表示件数を制限できます。

`content/posts/_index.md` に `paginate_by` を追加します。

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 10
+++
```

ページが複数になると、記事一覧の下に前後のページへのリンクが表示されます。

トップページ（`/`）は最新5件のみ表示し、「記事一覧をもっと見る →」リンクで `/posts/` に誘導する設計になっています。
