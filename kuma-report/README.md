# クマ目撃をしらせる（kuma-report）

LINE ミニアプリ。リッチメニューのボタンを押すだけで、いまいる場所の GPS を自動取得して「クマを見た」を最短で登録できる。ターゲットは高齢者中心のため、文字・ボタンを大きく、手数を少なくしている。

## 画面の流れ

1. **home**: 大きな赤いボタン「いま ここで クマを見た」。下にイノシシ・シカ用のボタンも。
2. **locating**: GPS 取得中（取得できなければ error 画面で位置情報の許可を案内）。
3. **confirm**: 現在地を地図（Leaflet + OSM、APIキー不要）で表示。獣種・種別を大きなボタンで選び、任意でひとことを入力。
4. **done**: お礼を表示し、3 秒後または「とじる」で LIFF を閉じる。

LINE で本人確認しているため、いたずら通報が入りにくいしくみ。

## 開発

```bash
npm install
npm run dev      # Vite dev server
npm run build    # 本番ビルド
```

## 環境変数（`.env`）

`.env.example` をコピーして設定する。

- `VITE_LIFF_ID`: LINE LIFF ID。未設定でも動作するが本人確認（reporter 名）は付かない。
- `VITE_API_BASE`: 目撃情報の送信先 API のベース URL。設定時は `POST {VITE_API_BASE}/api/sightings` に送る。未設定時は `localStorage`（キー `neokuma_sightings`）に保存する。

## 利用想定

LINE リッチメニューの「目撃をしらせる」ボタンからこのミニアプリを開く想定。
