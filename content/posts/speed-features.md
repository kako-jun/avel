+++
title = "Speed Features"
date = 2026-05-20

[taxonomies]
tags = ["configuration", "about"]
+++

avel uses a few browser-native features to improve perceived speed while staying light. They are enabled by default and can be changed in `config.toml`.

## View Transitions

Pages can cross-fade with CSS only. No JavaScript is used.

```toml
[extra]
view_transitions = true
```

## Speculation Rules

Internal links can be prerendered when hovered, so clicking often feels instant.

```toml
[extra]
speculation_rules = true
```

This adds one declarative `<script type="speculationrules">`. It is an instruction to the browser, not runtime application code.

## content-visibility

Long lists defer off-screen rendering until they scroll into view. Visible text still paints immediately.

