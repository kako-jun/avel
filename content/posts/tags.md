+++
title = "タグの使い方"
date = 2025-08-01

[taxonomies]
tags = ["configuration"]
+++

`config.toml` に taxonomy を追加する。

```toml
[[taxonomies]]
name = "tags"
url = "tags"
feed = false
lang = "ja"
```

記事のフロントマターにタグを書く。

```toml
+++
title = "記事タイトル"
date = 2025-08-01

[taxonomies]
tags = ["foo", "bar"]
+++
```

`/tags/` にタグ一覧、`/tags/{name}/` にタグ別記事一覧が生成される。
