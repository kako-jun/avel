+++
title = "むちゃくちゃ速い"
date = 2025-10-15

[taxonomies]
tags = ["about"]
+++

avel で作ったページは速い。

JS がないのでパース・実行コストがゼロ。外部リソースがないので DNS 解決も追加リクエストも発生しない。CSS はインラインなので別ファイルを取りに行かない。

HTML 1 ファイルをダウンロードすれば即表示される。

Lighthouse の Performance・Accessibility・Best Practices・SEO はすべて満点近くを記録する。低速回線でも古いスマートフォンでも遅いとは感じないはずだ。

阿部寛のホームページが速いのも同じ理由。余計なものが何もない。
