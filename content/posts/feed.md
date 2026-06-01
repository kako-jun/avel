+++
title = "Atom フィード"
date = 2025-09-01

[taxonomies]
tags = ["configuration"]
+++

avel は Atom フィードを自動生成します。サイドバー下部の「Atom」リンクから購読できます。

`config.toml` で有効化します（デフォルトで有効）。

```toml
generate_feeds = true
feed_filenames = ["atom.xml"]
```

フィードは `/atom.xml` で配信されます。RSS リーダーにこの URL を登録してください。
