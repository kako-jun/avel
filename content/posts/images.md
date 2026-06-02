+++
title = "画像の埋め込み"
date = 2025-09-15

[taxonomies]
tags = ["usage"]
+++

`static/` に画像を置いて、Markdown から参照します。

```markdown
![説明文](/sample.svg)
```

Markdown で書いた画像には、自動的に `loading="lazy"` が付きます（`config.toml` の `lazy_async_image = true` によるものです）。画面に入るまで読み込みを後回しにできるので、表示の速さを保てます。

実際の表示は次のとおりです。

![sample image](/sample.svg)

HTML で直接書く場合は、自分で指定します。表示のずれ（CLS）を防ぐため、`width`・`height` も両方書いておくとよいでしょう。

```html
<img src="/sample.svg" width="320" height="120" alt="sample image" loading="lazy">
```
