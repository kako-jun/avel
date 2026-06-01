+++
title = "タグの使い方"
date = 2025-08-01

[taxonomies]
tags = ["configuration"]
+++

記事にタグを付けると、タグ別のページが自動生成されます。

## config.toml に taxonomy を追加

```toml
[[taxonomies]]
name = "tags"
url = "tags"
feed = false
lang = "ja"
```

## 記事にタグを付ける

```toml
+++
title = "記事タイトル"
date = 2025-08-01

[taxonomies]
tags = ["foo", "bar"]
+++
```

タグ一覧は `/tags/` で、タグ別記事一覧は `/tags/{name}/` で閲覧できます。
