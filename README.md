# 4i RADIO Web

GitHub Pages ではリポジトリのルートから公開する。

- ルートの HTML は既存のラジオ公式ページ。
- `members/<name>/` は個人ページ。各ディレクトリに HTML と画像などをまとめ、内部の参照は相対パスにする。
- `world/<site>/` は関連する架空サイトを移行するときの配置先。
- `source/<name>/` はビルドが必要なページの編集用ソース。神崎ページは `cd source/kanzaki && npm install && npm run build` で公開用 JS/CSS を更新する。
