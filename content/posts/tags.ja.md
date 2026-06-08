+++
title = "タグの使い方"
date = 2025-08-01

[taxonomies]
tags = ["configuration"]
+++

`config.toml` に taxonomy を追加します。

```toml
[[taxonomies]]
name = "tags"
url = "tags"
feed = false
lang = "ja"
```

記事のフロントマターにタグを書きます。

```toml
+++
title = "記事タイトル"
date = 2025-08-01

[taxonomies]
tags = ["foo", "bar"]
+++
```

これで `/tags/` にタグ一覧が、`/tags/{name}/` にタグ別の記事一覧が生成されます。
