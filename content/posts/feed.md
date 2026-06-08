+++
title = "Atom Feed"
date = 2025-09-01

[taxonomies]
tags = ["configuration"]
+++

avel generates an Atom feed. Use the "Atom" link near the bottom of the sidebar.

```toml
generate_feeds = true
feed_filenames = ["atom.xml"]
```

The default-language feed is served at `/atom.xml`. In multilingual sites, translated feeds are generated under each language path.

