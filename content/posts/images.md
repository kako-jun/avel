+++
title = "画像の埋め込み"
date = 2025-09-15

[taxonomies]
tags = ["usage"]
+++

`static/` に画像を置いて Markdown で参照する。

```markdown
![説明文](/sample.svg)
```

Markdown で書いた画像には自動的に `loading="lazy"` が付く（`config.toml` の `lazy_async_image = true` による）。

実際の表示：

![sample image](/sample.svg)

HTML で直書きする場合は手動で指定する。CLS 防止のため `width`・`height` も両方書く。

```html
<img src="/sample.svg" width="320" height="120" alt="sample image" loading="lazy">
```
