+++
title = "とにかく表示が速い"
date = 2025-10-15

[taxonomies]
tags = ["about"]
+++

avel で作ったページは、とても速く表示されます。ランタイムの JavaScript がないのでパースや実行のコストがかからず、外部リソースもないので追加のリクエストや DNS 解決も発生しません。CSS はインラインなので、別ファイルを取りに行く待ち時間もありません。

HTML はブラウザに届いたそばから、上から順に描画されていきます。内容をすべて読み込み終えるまで最初の文字が出ない、ということが起きないように作っています。

Lighthouse のスコアは、Performance・Accessibility・Best Practices・SEO のいずれも 100 を目標にしています。低速な回線でも古い端末でも、待たされる感覚は少ないはずです。

<img src="/lighthouse.webp" width="453" height="154" alt="Lighthouse スコア（Performance / Accessibility / Best Practices / SEO すべて 100）" loading="lazy" decoding="async">

阿部寛のホームページが速いのも、同じ理由だと思います。余計なものを置かない、それだけのことです。
