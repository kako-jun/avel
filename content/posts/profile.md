+++
title = "プロフィール画像の設定"
date = 2025-06-10

[taxonomies]
tags = ["configuration"]
+++

サイドバーにプロフィール画像と名前を出す。

```toml
[extra]
name = "Your Name"
profile_image = "me.webp"
profile_width = "120"
profile_height = "120"
```

画像は `static/` に置く。`width`・`height` を指定しないとデフォルト値 `120` が使われる。CLS 防止のため両方指定しておくのが無難。
