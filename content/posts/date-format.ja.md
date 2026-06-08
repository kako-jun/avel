+++
title = "日付の表示形式を変える"
date = 2025-05-12

[taxonomies]
tags = ["configuration"]
+++

記事の日付は、`date_format` で表示形式を変えられます。指定しない場合は `%Y年%m月%d日`（例: 2025年05月12日）で表示されます。

```toml
[extra]
date_format = "%Y-%m-%d"
```

書式は strftime の記法に従います。たとえば `%Y/%m/%d` なら 2025/05/12、`%B %d, %Y` なら英語の月名で表示されます。読み手に合わせて選ぶとよいでしょう。
