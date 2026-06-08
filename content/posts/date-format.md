+++
title = "Changing the Date Format"
date = 2025-05-12

[taxonomies]
tags = ["configuration"]
+++

Post dates use the translated `date_format` key. For a single-language site, you can set a format directly.

```toml
[extra]
date_format = "%Y-%m-%d"
```

The format follows `strftime`. For example, `%Y/%m/%d` renders `2025/05/12`, and `%B %d, %Y` renders an English month name.

