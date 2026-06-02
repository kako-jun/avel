+++
title = "インストール方法"
date = 2025-06-05

[taxonomies]
tags = ["installation"]
+++

git submodule として追加します。

```bash
cd your-zola-site
git submodule add https://github.com/kako-jun/avel themes/avel
```

`config.toml` にテーマを指定します。

```toml
theme = "avel"
```

`content/posts/_index.md` を作成します。

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 10
+++
```

あとは `zola serve` で確認すれば完了です。
