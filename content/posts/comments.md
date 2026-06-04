+++
title = "コメント欄の設定"
date = 2026-06-04

[taxonomies]
tags = ["configuration"]
+++

avel は、記事の末尾に [Nostalgic BBS](https://nostalgic.llll-ll.com/bbs) の画像コメント欄を表示できます。記事ページには JavaScript を入れず、最新の書き込みを SVG 画像として表示します。画像をクリックすると Nostalgic の掲示板ページへ移動し、そこで書き込めます。

有効にするには `config.toml` に次のように書きます。

```toml
[extra]
nostalgic_bbs = true
nostalgic_bbs_limit = 3
```

記事ごとに手動で BBS の公開 ID を指定する場合は、記事の front matter に `nostalgic_bbs_id` を書きます。

```toml
[extra]
nostalgic_bbs_id = "your-bbs-id"
```

すべての記事に自動で BBS を用意したい場合は、ビルド前に同期スクリプトを実行します。

```bash
npm run sync:nostalgic-bbs
zola build
```

同期スクリプトは `data/nostalgic_bbs.toml` を作成します。このファイルは Zola の `page.path` をキーにして、記事と BBS ID を対応させます。

```toml
[posts]
"/posts/my-post/" = "my-post-bbs-id"
```

既に ID がある記事は再利用されるので、毎回すべての記事を Nostalgic に問い合わせるわけではありません。新しい記事だけ、完成後の permalink URL で検索し、見つからなければ作成します。

`NOSTALGIC_TOKEN` はビルド環境の環境変数に置いてください。front matter やテンプレート、生成された HTML に token を書く必要はありません。
