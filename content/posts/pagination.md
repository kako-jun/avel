+++
title = "Pagination"
date = 2025-08-15

[taxonomies]
tags = ["configuration"]
+++

Add `paginate_by` to `content/posts/_index.md`.

```toml
+++
title = "Posts"
sort_by = "date"
paginate_by = 20
+++
```

When there are multiple pages, avel shows page numbers and previous/next arrows below the post list.

The homepage shows only the latest five posts. `/posts/` shows all posts with pagination.

