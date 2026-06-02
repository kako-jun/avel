+++
title = "プロフィール画像の設定"
date = 2025-06-10

[taxonomies]
tags = ["configuration"]
+++

プロフィール画像と名前は、阿部寛のホームページに倣い、トップページ本文の中央に表示されます。サイドバーには出ません。

```toml
[extra]
name = "Your Name"
profile_image = "me.webp"
profile_width = "120"
profile_height = "120"
profile_text = "ひとことプロフィール"
```

画像は `static/` に置きます。`width`・`height` を指定しない場合は、既定値の `120` が使われます。表示のずれ（CLS）を防ぐため、両方を指定しておくと安心です。

`profile_text` は任意です。指定すると、名前の下に短い紹介文が表示されます。
