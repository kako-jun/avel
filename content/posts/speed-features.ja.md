+++
title = "表示を速くする仕組み"
date = 2026-05-20

[taxonomies]
tags = ["configuration", "about"]
+++

avel は、軽さを保ったまま体感速度を上げるために、ブラウザ標準の仕組みをいくつか使っています。いずれも既定で有効ですが、`config.toml` で切り替えられます。

## ページ遷移をなめらかに（View Transitions）

ページを移動するときに、CSS だけで画面を軽くフェードさせます。JavaScript は使いません。無効にしたい場合は次のように書きます。

```toml
[extra]
view_transitions = true   # 既定で有効
```

## リンクの先読み（Speculation Rules）

サイト内のリンクにカーソルを合わせた時点で、次のページをあらかじめ用意します。クリックしたときには、ほとんど待ち時間がありません。

```toml
[extra]
speculation_rules = true   # 既定で有効
```

外部リンクとフィード（`/atom.xml`）は対象外です。この機能のために、宣言的な `<script type="speculationrules">` が 1 つ入ります（SEO 用の JSON-LD とは別物です）。どちらも動作するコードではなく、ブラウザへの指示書きやデータにあたります。

## 画面外の描画を後回しに（content-visibility）

記事一覧のように縦に長くなる部分は、画面に入るまで描画を後回しにします。画面内の文字はこれまでどおりすぐ表示されるので、最初の表示はかえって速くなります。この挙動は CSS だけで実現しており、設定は必要ありません。
