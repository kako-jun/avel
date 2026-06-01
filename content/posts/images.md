+++
title = "画像の埋め込み"
date = 2025-09-15

[taxonomies]
tags = ["usage"]
+++

記事に画像を埋め込むには、`static/` に画像を置いてから Markdown で参照します。

```markdown
![説明文](/sample.svg)
```

実際の表示：

![sample image](/sample.svg)

`width` や `height` を指定したい場合は HTML を直接書けます。

```html
<img src="/sample.svg" width="320" height="120" alt="sample image">
```

CLS（レイアウトシフト）を防ぐため、`width` と `height` の両方を指定することを推奨します。
