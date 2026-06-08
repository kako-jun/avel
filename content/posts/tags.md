+++
title = "Using Tags"
date = 2025-08-01

[taxonomies]
tags = ["configuration"]
+++

Add a taxonomy to `config.toml`.

```toml
[[taxonomies]]
name = "tags"
url = "tags"
feed = false
```

For multilingual sites, add the same taxonomy under each language.

```toml
[languages.ja]
taxonomies = [
  { name = "tags", url = "tags", feed = false },
]
```

Then add tags in post front matter.

```toml
+++
title = "Post title"
date = 2025-08-01

[taxonomies]
tags = ["foo", "bar"]
+++
```

Zola generates `/tags/` and each tag page.

