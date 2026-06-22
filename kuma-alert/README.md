# クマ通知エリア設定（kuma-alert）

自宅・通学路・実家などの市町村を登録しておくと、**その地域でクマが出たときに LINE 公式アカウントから通知が届く** ——
その「通知してほしい地域」を設定するための LINE ミニアプリ。ターゲットは高齢者なので、文字・ボタン・チェックを大きく、操作を簡単にしている。

## できること

- 秋田県の市町村（25市町村）から、通知してほしい場所を複数えらべる
- 通知の強さを選べる：「人身被害・警報だけ」/「目撃も全部」
- 「この内容で通知をうけとる」で登録。次回は前回の設定を復元

## 開発

```bash
npm install
npm run dev     # Vite dev server
npm run build   # 本番ビルド（tsc -b && vite build）
```

## 環境変数（`.env.example` 参照）

| 変数 | 役割 |
|------|------|
| `VITE_LIFF_ID` | LINE LIFF アプリ ID。未設定ならLIFFをスキップしてブラウザでも動く |
| `VITE_API_BASE` | 設定保存 API のベースURL。未設定なら `localStorage`（キー `neokuma_alert_prefs`）に保存するフォールバック |

## 使い方の想定

LINE 公式アカウントのリッチメニュー「通知エリア設定」からこのミニアプリを開いてもらう。

## 本番の連携設計

このアプリは設定値を保存するだけ。本番では **line-harness と連携** する：

1. ユーザーが選んだ市町村を、line-harness の friend メタデータ / タグに「エリアタグ」として保存する（例: `area:秋田市`）。通知の強さ（severity）もタグ化する。
2. クマ検知 Webhook が「○○市でクマ出没」を受け取ると、**該当エリアのタグを持つユーザーだけ** に LINE 公式アカウントから push メッセージを送る。

`VITE_API_BASE` を設定すると、保存・読込が `POST/GET /api/alert-prefs`（body / query に LIFF の `userId` を含む）に向く。この API 側で line-harness のタグ更新を行う想定。
