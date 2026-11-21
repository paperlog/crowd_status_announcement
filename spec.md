# crowd_status_announcement設計メモ

## 参考
- [GAS 説明](https://developers.google.com/apps-script?hl=ja)
- [GAS API化](https://zenn.dev/kinakokyoryu/articles/6251e4edb37273)
- [GAS spreadsheet json出力](https://auto-worker.com/blog/?p=7605)
- [javascript apiを用いたjson取得](https://qiita.com/Jochun/items/9df8dccbc933679ab29c)

## 1. ゴール（何を作るか・やらないこと）
- **作るもの**：google spread sheetを元にサークルの混雑状況を公開するサイト
- **やらないこと**：UIの作り込み

## 2. コアロジック（やることリスト）
1. 起動時web apiを通してjson形式で混雑状況など取得
2. 情報取得できない場合エラー表示
3. 情報表示と何分前の情報化の表示

## 3. 入出力イメージ（完成形）
- **入力**：サイトを開く
- **出力**：更新時間、混雑状況
- **境界条件**：情報取得できない場合エラー
