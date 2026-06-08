+++
title = "SEO の設定"
date = 2025-05-22

[taxonomies]
tags = ["configuration"]
+++

avel は、検索エンジンや SNS に内容が正しく伝わるよう、いくつかのメタ情報を既定で出力します。canonical URL、Open Graph、Twitter Card、JSON-LD（構造化データ）、サイトマップ、フィードの自動検出が、設定なしで有効です。いずれも `<head>` 内のテキストなので、表示の速さには影響しません。

なお Twitter Card という呼び名と `twitter:` で始まるメタ名は、X（旧 Twitter）になった今もそのまま使われています。`x:` のような名前は無いので、これが正しい指定です。

SNS で共有されたときのカード画像を指定したい場合は `og_image` を、カードの発信元アカウントを示したい場合は `twitter` を設定します。

```toml
[extra]
og_image = "og.webp"        # static/ に置く
twitter = "@yourhandle"
```

`og_image` を設定すると、Twitter Card は大きな画像つきのレイアウトになります。設定しなくても、テキスト中心のカードとして共有されます。
