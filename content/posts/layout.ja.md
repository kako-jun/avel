+++
title = "本文レイアウトの調整"
date = 2025-05-26

[taxonomies]
tags = ["configuration"]
+++

本文まわりの見え方は、いくつかの値で調整できます。

```toml
[extra]
max_width = "960px"      # ページ全体の最大幅（指定すると中央寄せになる）
content_align = "left"   # 本文の文字揃え（left / center / justify）
line_height = "1.5"      # 行間
title_align = "center"   # ページタイトルの揃え
main_padding = "1em"     # 本文エリアの余白
```

`max_width` を指定すると、横長の画面でも一行が長くなりすぎず、読みやすくなります。どれも指定しなければ、既定の見た目のままです。
