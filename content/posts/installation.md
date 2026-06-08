+++
title = "Installation"
date = 2025-06-05

[taxonomies]
tags = ["installation"]
+++

Add avel as a git submodule.

```bash
cd your-zola-site
git submodule add https://github.com/kako-jun/avel themes/avel
```

Set the theme in `config.toml`.

```toml
theme = "avel"
```

Create `content/posts/_index.md`.

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 20
+++
```

Run `zola serve` and check the site.

