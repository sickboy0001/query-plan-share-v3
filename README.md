# QueryPlanShare V3

# Readme

# 背景

- QueryPlan の可視化は有用。それを共有する

# インフラ

- NextJS
- Vercel
- Supabase
  - データベース（MySQL）
  - 認証
- GitHub

# Todo

- [x]

# 参考

## QueryPlan

https://github.com/JustinPealing/html-query-plan

ひとまず、ダイアログ（チャート）表示可能。JS で使う必要あり。動的に、JS などを読み込みなどは調整必要だけど、期待通りにはなっている。

## Syntacs

[Prism.js の使い方！シンタックスハイライトにおすすめ](https://dezanari.com/prismjs/)

シンタックスツール

利用しているもの

https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+diff+sql&plugins=toolbar+copy-to-clipboard+download-button

https://kaiyuusya.jp/webLog/article/syntax-highlight

# 履歴

## 2023/08/10

- DB アクセスはクライアントに集中

## 2023/08/14

- 最低限の動き、完了、リスト、表示、調整

- 未 URL の公開周り、ログイン周りとの整合性

- PrismJS で Babel 利用やめて、動的に Link などを取り込むようにしたら期待通り動いた。

- import のパス、大文字小文字の NG で、HotReload が期待通り動かないケースあり。
