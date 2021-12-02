# アプリ概要
**[全国の人口推移](https://demographic-composition.vercel.app/)**
選択した都道府県の人口の推移をグラフで比較できます。

## 使用技術 
- TypeScript
- Axios
- Next.js
    - SWR
    - Recharts
- CSS Module
- ES Lint
- Prettier
- Jest
- Vercel

## 工夫点
- API Keyを用いたRESAS APIへのリクエストは、Next.jsのAPI Routesを経由させることで、フロントエンド側へのAPI Key公開を防いだ。
- APIへのリクエスト中は、ローディングのスピナーを表示させた。
- 画面が縦長・横長の場合でも、それぞれに適した表示にした。
    - 縦長：縦にチェックボックスとグラフを並べる。
    - 横長：横にチェックボックスとグラフを並べる。

## 反省点
- 環境構築やAPIのリクエスト関係（特に型）に時間を掛けすぎた（全体の半分以上）。
- JestやSWRなどほとんど利用したことが無いライブラリも多く、勉強することに時間がかかった。
- Gitのコミット履歴が滅茶苦茶であり、非常にわかりにくくなった。
    - ブランチを細かく作っていくべきだった。
- 細かくローディングが挟まり、複数の都道府県を選択するのに時間がかかる。
    - 同時に複数の都道府県を選択するとエラーが起こる可能性があるため、このような処理になった。
- コンポーネントとロジックの分離が不充分であり、単体テストができていない。

## テストケース
### 単体テスト（.tsファイルの関数のみ）
1. `yarn test`コマンドを用いて単体テストを行う。

```text:"結果"
yarn run v1.22.15
$ jest
 PASS  src/utils/resas/types.spec.ts
 PASS  src/utils/resas/index.spec.ts

Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.598 s
Ran all test suites.
Done in 3.06s.
```

<br>
以下のテストでは都度画面を再読み込みさせてから行う

### Next.jsのAPI Routeにリクエストを送る
1. https://demographic-composition.vercel.app/api/prefectures

```json
{"type":"success","result":[{"prefCode":1,"prefName":"北海道"},{"prefCode":2,"prefName":"青森県"},{"prefCode":3,"prefName":"岩手県"},{"prefCode":4,"prefName":"宮城県"},{"prefCode":5,"prefName":"秋田県"},{"prefCode":6,"prefName":"山形県"},{"prefCode":7,"prefName":"福島県"},{"prefCode":8,"prefName":"茨城県"},{"prefCode":9,"prefName":"栃木県"},{"prefCode":10,"prefName":"群馬県"},{"prefCode":11,"prefName":"埼玉県"},{"prefCode":12,"prefName":"千葉県"},{"prefCode":13,"prefName":"東京都"},{"prefCode":14,"prefName":"神奈川県"},{"prefCode":15,"prefName":"新潟県"},{"prefCode":16,"prefName":"富山県"},{"prefCode":17,"prefName":"石川県"},{"prefCode":18,"prefName":"福井県"},{"prefCode":19,"prefName":"山梨県"},{"prefCode":20,"prefName":"長野県"},{"prefCode":21,"prefName":"岐阜県"},{"prefCode":22,"prefName":"静岡県"},{"prefCode":23,"prefName":"愛知県"},{"prefCode":24,"prefName":"三重県"},{"prefCode":25,"prefName":"滋賀県"},{"prefCode":26,"prefName":"京都府"},{"prefCode":27,"prefName":"大阪府"},{"prefCode":28,"prefName":"兵庫県"},{"prefCode":29,"prefName":"奈良県"},{"prefCode":30,"prefName":"和歌山県"},{"prefCode":31,"prefName":"鳥取県"},{"prefCode":32,"prefName":"島根県"},{"prefCode":33,"prefName":"岡山県"},{"prefCode":34,"prefName":"広島県"},{"prefCode":35,"prefName":"山口県"},{"prefCode":36,"prefName":"徳島県"},{"prefCode":37,"prefName":"香川県"},{"prefCode":38,"prefName":"愛媛県"},{"prefCode":39,"prefName":"高知県"},{"prefCode":40,"prefName":"福岡県"},{"prefCode":41,"prefName":"佐賀県"},{"prefCode":42,"prefName":"長崎県"},{"prefCode":43,"prefName":"熊本県"},{"prefCode":44,"prefName":"大分県"},{"prefCode":45,"prefName":"宮崎県"},{"prefCode":46,"prefName":"鹿児島県"},{"prefCode":47,"prefName":"沖縄県"}]}
```

2. https://demographic-composition.vercel.app/api/populationCompositionPerYear?prefCode=1

```json
{"type":"success","result":{"1":{"boundaryYear":2015,"data":[{"label":"総人口","data":[{"year":1960,"value":5039206},{"year":1965,"value":5171800},{"year":1970,"value":5184287},{"year":1975,"value":5338206},{"year":1980,"value":5575989},{"year":1985,"value":5679439},{"year":1990,"value":5643647},{"year":1995,"value":5692321},{"year":2000,"value":5683062},{"year":2005,"value":5627737},{"year":2010,"value":5506419},{"year":2015,"value":5381733},{"year":2020,"value":5216615},{"year":2025,"value":5016554},{"year":2030,"value":4791592},{"year":2035,"value":4546357},{"year":2040,"value":4280427},{"year":2045,"value":4004973}]},{"label":"年少人口","data":[{"year":1960,"value":1681479,"rate":33.3},{"year":1965,"value":1462123,"rate":28.2},{"year":1970,"value":1309487,"rate":25.2},{"year":1975,"value":1312611,"rate":24.5},{"year":1980,"value":1298324,"rate":23.2},{"year":1985,"value":1217959,"rate":21.4},{"year":1990,"value":1034251,"rate":18.3},{"year":1995,"value":898673,"rate":15.7},{"year":2000,"value":792352,"rate":13.9},{"year":2005,"value":719057,"rate":12.7},{"year":2010,"value":657312,"rate":11.9},{"year":2015,"value":608296,"rate":11.3},{"year":2020,"value":561558,"rate":10.7},{"year":2025,"value":511677,"rate":10.1},{"year":2030,"value":465307,"rate":9.7},{"year":2035,"value":423382,"rate":9.3},{"year":2040,"value":391086,"rate":9.1},{"year":2045,"value":360177,"rate":8.9}]},{"label":"生産年齢人口","data":[{"year":1960,"value":3145664,"rate":62.4},{"year":1965,"value":3460359,"rate":66.9},{"year":1970,"value":3575731,"rate":68.9},{"year":1975,"value":3657884,"rate":68.5},{"year":1980,"value":3823808,"rate":68.5},{"year":1985,"value":3910729,"rate":68.8},{"year":1990,"value":3924717,"rate":69.5},{"year":1995,"value":3942868,"rate":69.2},{"year":2000,"value":3832902,"rate":67.4},{"year":2005,"value":3696064,"rate":65.6},{"year":2010,"value":3482169,"rate":63.2},{"year":2015,"value":3190804,"rate":59.2},{"year":2020,"value":2959481,"rate":56.7},{"year":2025,"value":2781175,"rate":55.4},{"year":2030,"value":2594718,"rate":54.1},{"year":2035,"value":2394230,"rate":52.6},{"year":2040,"value":2140781,"rate":50},{"year":2045,"value":1931265,"rate":48.2}]},{"label":"老年人口","data":[{"year":1960,"value":212063,"rate":4.2},{"year":1965,"value":249318,"rate":4.8},{"year":1970,"value":299069,"rate":5.7},{"year":1975,"value":366651,"rate":6.8},{"year":1980,"value":451727,"rate":8.1},{"year":1985,"value":549487,"rate":9.6},{"year":1990,"value":674881,"rate":11.9},{"year":1995,"value":844927,"rate":14.8},{"year":2000,"value":1031552,"rate":18.1},{"year":2005,"value":1205692,"rate":21.4},{"year":2010,"value":1358068,"rate":24.6},{"year":2015,"value":1558387,"rate":28.9},{"year":2020,"value":1695576,"rate":32.5},{"year":2025,"value":1723702,"rate":34.3},{"year":2030,"value":1731567,"rate":36.1},{"year":2035,"value":1728745,"rate":38},{"year":2040,"value":1748560,"rate":40.8},{"year":2045,"value":1713531,"rate":42.7}]}]}}}
```

3. https://demographic-composition.vercel.app/api/populationCompositionPerYear?prefCode=

```json
{"type":"success","result":{"1":{"boundaryYear":2015,"data":[{"label":"総人口","data":[{"year":1960,"value":5039206},{"year":1965,"value":5171800},{"year":1970,"value":5184287},{"year":1975,"value":5338206},{"year":1980,"value":5575989},{"year":1985,"value":5679439},{"year":1990,"value":5643647},{"year":1995,"value":5692321},{"year":2000,"value":5683062},{"year":2005,"value":5627737},{"year":2010,"value":5506419},{"year":2015,"value":5381733},{"year":2020,"value":5216615},{"year":2025,"value":5016554},{"year":2030,"value":4791592},{"year":2035,"value":4546357},{"year":2040,"value":4280427},{"year":2045,"value":4004973}]},{"label":"年少人口","data":[{"year":1960,"value":1681479,"rate":33.3},{"year":1965,"value":1462123,"rate":28.2},{"year":1970,"value":1309487,"rate":25.2},{"year":1975,"value":1312611,"rate":24.5},{"year":1980,"value":1298324,"rate":23.2},{"year":1985,"value":1217959,"rate":21.4},{"year":1990,"value":1034251,"rate":18.3},{"year":1995,"value":898673,"rate":15.7},{"year":2000,"value":792352,"rate":13.9},{"year":2005,"value":719057,"rate":12.7},{"year":2010,"value":657312,"rate":11.9},{"year":2015,"value":608296,"rate":11.3},{"year":2020,"value":561558,"rate":10.7},{"year":2025,"value":511677,"rate":10.1},{"year":2030,"value":465307,"rate":9.7},{"year":2035,"value":423382,"rate":9.3},{"year":2040,"value":391086,"rate":9.1},{"year":2045,"value":360177,"rate":8.9}]},{"label":"生産年齢人口","data":[{"year":1960,"value":3145664,"rate":62.4},{"year":1965,"value":3460359,"rate":66.9},{"year":1970,"value":3575731,"rate":68.9},{"year":1975,"value":3657884,"rate":68.5},{"year":1980,"value":3823808,"rate":68.5},{"year":1985,"value":3910729,"rate":68.8},{"year":1990,"value":3924717,"rate":69.5},{"year":1995,"value":3942868,"rate":69.2},{"year":2000,"value":3832902,"rate":67.4},{"year":2005,"value":3696064,"rate":65.6},{"year":2010,"value":3482169,"rate":63.2},{"year":2015,"value":3190804,"rate":59.2},{"year":2020,"value":2959481,"rate":56.7},{"year":2025,"value":2781175,"rate":55.4},{"year":2030,"value":2594718,"rate":54.1},{"year":2035,"value":2394230,"rate":52.6},{"year":2040,"value":2140781,"rate":50},{"year":2045,"value":1931265,"rate":48.2}]},{"label":"老年人口","data":[{"year":1960,"value":212063,"rate":4.2},{"year":1965,"value":249318,"rate":4.8},{"year":1970,"value":299069,"rate":5.7},{"year":1975,"value":366651,"rate":6.8},{"year":1980,"value":451727,"rate":8.1},{"year":1985,"value":549487,"rate":9.6},{"year":1990,"value":674881,"rate":11.9},{"year":1995,"value":844927,"rate":14.8},{"year":2000,"value":1031552,"rate":18.1},{"year":2005,"value":1205692,"rate":21.4},{"year":2010,"value":1358068,"rate":24.6},{"year":2015,"value":1558387,"rate":28.9},{"year":2020,"value":1695576,"rate":32.5},{"year":2025,"value":1723702,"rate":34.3},{"year":2030,"value":1731567,"rate":36.1},{"year":2035,"value":1728745,"rate":38},{"year":2040,"value":1748560,"rate":40.8},{"year":2045,"value":1713531,"rate":42.7}]}]},"2":{"boundaryYear":2015,"data":[{"label":"総人口","data":[{"year":1960,"value":1426606},{"year":1965,"value":1416591},{"year":1970,"value":1427520},{"year":1975,"value":1468646},{"year":1980,"value":1523907},{"year":1985,"value":1524448},{"year":1990,"value":1482873},{"year":1995,"value":1481663},{"year":2000,"value":1475728},{"year":2005,"value":1436657},{"year":2010,"value":1373339},{"year":2015,"value":1308265},{"year":2020,"value":1235971},{"year":2025,"value":1157332},{"year":2030,"value":1076393},{"year":2035,"value":993737},{"year":2040,"value":908974},{"year":2045,"value":823610}]},{"label":"年少人口","data":[{"year":1960,"value":513397,"rate":35.9},{"year":1965,"value":447068,"rate":31.5},{"year":1970,"value":396883,"rate":27.8},{"year":1975,"value":380218,"rate":25.8},{"year":1980,"value":366454,"rate":24},{"year":1985,"value":338554,"rate":22.2},{"year":1990,"value":289082,"rate":19.4},{"year":1995,"value":252414,"rate":17},{"year":2000,"value":223141,"rate":15.1},{"year":2005,"value":198959,"rate":13.8},{"year":2010,"value":171842,"rate":12.5},{"year":2015,"value":148208,"rate":11.3},{"year":2020,"value":129567,"rate":10.4},{"year":2025,"value":114024,"rate":9.8},{"year":2030,"value":100253,"rate":9.3},{"year":2035,"value":87648,"rate":8.8},{"year":2040,"value":77258,"rate":8.4},{"year":2045,"value":67472,"rate":8.1}]},{"label":"生産年齢人口","data":[{"year":1960,"value":848838,"rate":59.5},{"year":1965,"value":894521,"rate":63.1},{"year":1970,"value":940235,"rate":65.8},{"year":1975,"value":977541,"rate":66.5},{"year":1980,"value":1022786,"rate":67.1},{"year":1985,"value":1027329,"rate":67.3},{"year":1990,"value":1000804,"rate":67.4},{"year":1995,"value":991311,"rate":66.9},{"year":2000,"value":964661,"rate":65.3},{"year":2005,"value":910856,"rate":63.4},{"year":2010,"value":843587,"rate":61.4},{"year":2015,"value":757867,"rate":57.9},{"year":2020,"value":686364,"rate":55.5},{"year":2025,"value":618505,"rate":53.4},{"year":2030,"value":555479,"rate":51.6},{"year":2035,"value":494561,"rate":49.7},{"year":2040,"value":428573,"rate":47.1},{"year":2045,"value":370849,"rate":45}]},{"label":"老年人口","data":[{"year":1960,"value":64371,"rate":4.5},{"year":1965,"value":75002,"rate":5.2},{"year":1970,"value":90402,"rate":6.3},{"year":1975,"value":110752,"rate":7.5},{"year":1980,"value":134516,"rate":8.8},{"year":1985,"value":158547,"rate":10.4},{"year":1990,"value":191776,"rate":12.9},{"year":1995,"value":236745,"rate":15.9},{"year":2000,"value":287099,"rate":19.4},{"year":2005,"value":326562,"rate":22.7},{"year":2010,"value":352768,"rate":25.6},{"year":2015,"value":390940,"rate":29.8},{"year":2020,"value":420040,"rate":33.9},{"year":2025,"value":424803,"rate":36.7},{"year":2030,"value":420661,"rate":39},{"year":2035,"value":411528,"rate":41.4},{"year":2040,"value":403143,"rate":44.3},{"year":2045,"value":385289,"rate":46.7}]}]}}}
```

### 初期読み込み時
1. ブラウザから再読み込みを行った際、スピナーが表示されることを確認する。
![ローディングのスピナー](https://user-images.githubusercontent.com/61417777/144462252-09688170-04b0-4308-a7c3-70c2b3eb090c.png)

### 都道府県をチェックする・チェックを外す
1. 北海道を初めてチェックしたとき、スピナーが表示されることを確認する。
1. グラフが更新されることを確認する。
1. 北海道のチェックを外したとき、グラフが更新されることを確認する。
1. 北海道を2回目チェックしたとき、スピナーが表示されないことを確認する。
1. グラフが更新されることを確認する。

```txt
成功
```

- チェック前
![チェック前](https://user-images.githubusercontent.com/61417777/144463085-1503b69a-ffcc-42cb-bcdf-67766ef28847.png)
- チェック後
![チェック後](https://user-images.githubusercontent.com/61417777/144463324-fd9c7c98-fa55-43d1-a3dd-ae37d4beee4e.png)

### 全ての都道府県をエラー無く読み込む
1. 都道府県チェックボックスを一つ一つクリックする。
1. グラフに情報が反映されたことを確認する。
1. 全ての都道府県を選択するまで続ける。

- 全都道府県チェック後
![チェック後](https://user-images.githubusercontent.com/61417777/144464764-1bdea64e-0554-4d77-8364-187c59b08e9b.png)

### 画面サイズに応じて表示を切り替える
レイアウトを確認する際は、北海道にチェックを付ける。

1. Google Chromeのデベロッパーツールを開く。
1. サイズをiPadにする。
1. 縦と横をそれぞれ一度再読み込みをして、レイアウトがはみ出たり、崩れていないことを確認する。
1. サイズをiPhone8にする。
1. 縦と横をそれぞれ一度再読み込みをして、レイアウトがはみ出たり、崩れていないことを確認する。
1. サイズを1920×1080にする
1. 一度再読み込みをして、レイアウトがはみ出たり、崩れていないことを確認する。

```
成功
```

一部の表示がおかしいが実際にテストした際は正常に表示されていた
- iPad：縦
![チェック後](https://user-images.githubusercontent.com/61417777/144465376-7e5120f7-7e77-4f20-ad9b-bb95d5868155.png)
- iPad：横
![チェック後](https://user-images.githubusercontent.com/61417777/144465278-225750c8-8901-4b60-9917-a53dc20cb4e5.png)
- iPhone 8：縦
![チェック後](https://user-images.githubusercontent.com/61417777/144465801-a57ceb9c-61d0-4ca6-bd35-c69a78d01680.png)
- iPhone 8：横
![チェック後](https://user-images.githubusercontent.com/61417777/144465900-262cab70-52dc-4eb1-8075-0c243bb695dd.png)
- PC：1920×1080
![チェック後](https://user-images.githubusercontent.com/61417777/144466539-00be1725-2ef1-4c6a-987f-e9dddce11681.png)