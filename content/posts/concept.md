+++
title = "The Idea Behind avel"
date = 2025-11-15

[taxonomies]
tags = ["about"]
+++

The web has become heavier little by little. Many pages run external scripts, initialize frameworks, and make readers wait before a simple article appears.

avel is one answer to that problem. A blog does not need much to work: text, a little structure, and readable links are often enough.

Zola is a static site generator written in Rust. It builds quickly and outputs simple HTML. avel keeps that simplicity instead of adding a large frontend layer on top.

This does not mean "never add anything." avel avoids runtime JavaScript, but it does use browser-native declarative features such as Speculation Rules (link prerendering) when they improve perceived speed without adding application code. CSS View Transitions are available too, but off by default — they can flash on dark themes during navigation.

