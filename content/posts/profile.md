+++
title = "プロフィール画像の設定"
date = 2025-06-10

[taxonomies]
tags = ["configuration"]
+++

サイドバーにプロフィール画像と名前を表示できます。

`config.toml` の `[extra]` に以下を追加します。

```toml
[extra]
name = "Your Name"
profile_image = "me.webp"
profile_width = "120"
profile_height = "120"
```

画像ファイルは `static/` ディレクトリに置いてください。

`profile_width` と `profile_height` を指定することで CLS（レイアウトシフト）を防げます。省略するとデフォルト値 `120` が使われます。
