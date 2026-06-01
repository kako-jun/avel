+++
title = "インストール方法"
date = 2025-06-05

[taxonomies]
tags = ["installation"]
+++

git submodule で追加する。

```bash
cd your-zola-site
git submodule add https://github.com/kako-jun/avel themes/avel
```

`config.toml` にテーマを指定する。

```toml
theme = "avel"
```

`content/posts/_index.md` を作る。

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 10
+++
```

`zola serve` で確認して完了。
