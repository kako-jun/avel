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

記事ごとの BBS は、ビルド前に同期スクリプトを実行して用意します。

```bash
npm run sync:nostalgic-bbs
zola build
```

同期スクリプトは `base_url` と `page.path` から記事の最終 URL を作り、Nostalgic BBS を検索または作成します。返ってきた公開 ID は `data/nostalgic_bbs.toml` に保存されます。このファイルは Zola の `page.path` をキーにした生成マップです。

```toml
[posts]
"/posts/my-post/" = "my-post-bbs-id"
```

既に ID がある記事は再利用されるので、毎回すべての記事を Nostalgic に問い合わせるわけではありません。新しい記事だけ、完成後の permalink URL で検索し、見つからなければ `Comments` という名前で作成します。

`NOSTALGIC_TOKEN` はビルド環境の環境変数に置いてください。front matter やテンプレート、生成された HTML に token を書く必要はありません。既存 BBS を手動で固定したい場合は、記事 Markdown ではなく `data/nostalgic_bbs.toml` を直接編集します。
