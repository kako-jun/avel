+++
title = "プロフィールと連絡先の設定"
date = 2025-06-10

[taxonomies]
tags = ["configuration"]
+++

トップページは、阿部寛のホームページに倣った 2 段構成です。左側にプロフィール（画像・名前・紹介文・連絡先）が並び、右側に「★★★ 最新情報 ★★★」として最新の記事が表示されます。スマートフォンなどの狭い画面では、上下に積み重なります。

## プロフィール

```toml
[extra]
name = "Your Name"
profile_image = "me.webp"
profile_width = "120"
profile_height = "120"
profile_text = "ひとことプロフィール"
```

画像は `static/` に置きます。`width`・`height` を指定しない場合は、既定値の `200` が使われます（本家の写真が大きめなのに倣っています）。表示のずれ（CLS）を防ぐため、両方を指定しておくと安心です。`profile_text` は任意で、指定すると名前の下に短い紹介文が表示されます。

## 連絡先（SNS アカウント）

阿部寛のホームページでは住所や電話番号が連絡先でしたが、ブログの連絡先としては SNS アカウントの一覧が自然です。`social` に並べると、プロフィールの下に「連絡先」として表示されます。

```toml
[extra]
social = [
  { label = "X", url = "https://x.com/yourname" },
  { label = "Instagram", url = "https://instagram.com/yourname" },
  { label = "GitHub", url = "https://github.com/yourname" },
]
```

外部リンクは自動的に別タブで開きます。`label` の文字はそのまま表示されるので、ハンドル名を入れても構いません。
