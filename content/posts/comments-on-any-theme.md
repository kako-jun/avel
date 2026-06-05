+++
title = "このコメント欄を他のテーマでも使う"
date = 2026-06-06

[taxonomies]
tags = ["configuration"]
+++

avel のコメント欄は、テーマのデザインとは独立した部品で構成されています。Zola であれば他のテーマを使っているサイトにも導入できます。

avel を使っている場合は[コメント欄の設定](@/posts/comments.md)の記事に書いた通りにすれば動きます。この記事は「avel 以外のテーマを使っているが同じコメント欄を付けたい」というケースのレシピです。

この記事自体にもコメント欄が付いているので、動いているようすを一番下で確認できます。

## 前提

[Nostalgic](https://nostalgic.llll-ll.com) は無料で、アカウント登録も不要です。8〜16 文字の文字列を自分でトークンとして決めるだけで使い始められます。

## ステップ 1 — スクリプトを置く

このリポジトリの `scripts/sync-nostalgic-bbs.mjs` を自分のサイトの `scripts/` ディレクトリにコピーします。

ビルドコマンドをスクリプト実行後に `zola build` を呼ぶ形に変えます。

```bash
node scripts/sync-nostalgic-bbs.mjs && zola build
```

Cloudflare Pages など CI 環境のビルドコマンドも同様に変更します。

スクリプトは既定で `content/posts/` を走査します。記事が別のディレクトリにある場合は `NOSTALGIC_CONTENT_DIR` 環境変数で指定します。

```bash
NOSTALGIC_CONTENT_DIR=content/articles node scripts/sync-nostalgic-bbs.mjs && zola build
```

## ステップ 2 — トークンを環境変数に置く

スクリプトは `process.env.NOSTALGIC_TOKEN` を読みます。**トークンはリポジトリにコミットしません。**

ローカルではシェルで設定します。

```bash
export NOSTALGIC_TOKEN=your-token-here
```

Cloudflare Pages などの CI 環境では、プロジェクトの環境変数設定画面で `NOSTALGIC_TOKEN` を追加します。

`NOSTALGIC_TOKEN` が設定されていない場合、スクリプトは既存の ID を保持したまま終了します。新しい記事の BBS 作成はスキップされますが、既に ID がある記事のコメント欄は引き続き表示されます。

## ステップ 3 — config.toml に設定を追加

必須は `nostalgic_bbs = true` の 1 行だけです。残り 4 つはテンプレート側に既定値があるため省略可能です。

```toml
[extra]
nostalgic_bbs = true
nostalgic_bbs_limit = 3          # 画像に表示する最新コメント数（省略可、既定値 3）
nostalgic_bbs_width = 760        # SVG の描画幅（px）（省略可、既定値 760）
nostalgic_bbs_label = "Comments" # 画像の上に出る見出し（省略可、既定値 "Comments"）
nostalgic_bbs_hint = "クリックで書き込めます"  # 画像の下のキャプション（省略可、既定値 "Click to comment"）
```

## ステップ 4 — テンプレートに数行追加

サイトルートに `templates/page.html` を作成（またはテーマのファイルを上書き）し、記事本文の後ろに次のスニペットを追加します。テーマ本体のファイルを直接変更する必要はありません。

> これは貼り付け用の最小断片です。avel 本体の `templates/page.html` は CSS クラス等が付いた完全版なので、デザインを揃えたい場合はそちらを参照してください。

```html
{% if config.extra.nostalgic_bbs | default(value=false) %}
{% set_global nostalgic_bbs_public_id = "" %}
{% set nostalgic_bbs = load_data(path="data/nostalgic_bbs.toml", required=false) %}
{% if nostalgic_bbs and nostalgic_bbs.posts %}
  {% for post_path, post_bbs_id in nostalgic_bbs.posts %}
    {% if post_path == current_path %}
      {% set_global nostalgic_bbs_public_id = post_bbs_id %}
    {% endif %}
  {% endfor %}
{% endif %}
{% if nostalgic_bbs_public_id %}
  {% set limit = config.extra.nostalgic_bbs_limit | default(value=3) %}
  {% set width = config.extra.nostalgic_bbs_width | default(value=760) %}
  {% set label = config.extra.nostalgic_bbs_label | default(value="Comments") %}
  {% set hint  = config.extra.nostalgic_bbs_hint  | default(value="Click to comment") %}
  <div class="nostalgic-bbs">
    <p>{{ label }}</p>
    <a href="https://nostalgic.llll-ll.com/bbs?id={{ nostalgic_bbs_public_id | urlencode }}"
       target="_blank" rel="noopener noreferrer">
      <img src="https://api.nostalgic.llll-ll.com/bbs?action=get&id={{ nostalgic_bbs_public_id | urlencode }}&format=image&limit={{ limit }}&width={{ width }}"
           alt="{{ label }} for {{ page.title }}"
           loading="lazy" decoding="async">
    </a>
    <p>{{ hint }}</p>
  </div>
{% endif %}
{% endif %}
```

## JS 不要の設計

コメントの表示は Nostalgic API が返す SVG 画像を `<img>` タグで埋め込むだけです。クリックすると Nostalgic の掲示板ページに移動し、そこで書き込めます。この設計により、記事ページにはコメント欄のための JavaScript が一切入りません。ブラウザで JavaScript を無効にしていても表示されます。

Web Component を使わないため、追加の `<script>` タグも不要です。
