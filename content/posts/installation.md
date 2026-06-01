+++
title = "インストール方法"
date = 2025-06-05

[taxonomies]
tags = ["installation"]
+++

Zola サイトに avel を追加するには、git submodule を使います。

```bash
cd your-zola-site
git submodule add https://github.com/kako-jun/avel themes/avel
```

次に `config.toml` でテーマを指定します。

```toml
theme = "avel"
```

また、`content/posts/_index.md` を作成してください。

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 10
+++
```

`zola serve` で動作を確認したら完了です。
