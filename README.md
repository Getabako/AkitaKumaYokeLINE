# AkitaKumaYokeLINE（あきた見守りLINE）

秋田のクマ対策＋地域お守りを、**いつものLINEだけ**で実現するプロジェクト。
LINE公式アカウント＋リッチメニュー（6マス）を入口に、機能を **5つのLIFFミニアプリ** に分割。
さらに line-harness（Lステップ的な裏方）で「登録エリアでクマ出没→公式アカウントから自動通知」を担う。

> コンセプト：bearbell/クマダスと同じ"目撃速度競争"の土俵で殴り合わない。
> ①DL不要で家族みんなに即届く到達力 ②学校・子ども・交通まで含む地域お守り
> ③クマに"遭わない暮らし方"＝予防の知識、で差別化する。クマは入口、本体は家族と暮らしの安心。

---

## モノレポ構成

```
AkitaKumaYokeLINE/
├── kuma-map/        ① クマ出没マップ（地図で見る・フィルタ）
├── kuma-report/     ② クマ目撃をしらせる（GPS自動取得→通報）
├── kuma-bakuon/     ③ クマ撃退ブザー（Web Audio合成・熊鈴モード）
├── kuma-alert/      ④ クマ通知エリア設定（市町村を登録→通知）
├── kotsu-info/      ⑤ 交通・くらし情報（通行止め/除雪/バス/クマ規制）
├── assets/
│   └── richmenu.png リッチメニュー画像（2500×1686・そのままLINEへ）
├── slides/          議員向けスライド（PNG＋slides.pdf）
├── 議員向け企画書.md
├── アプリの仕様書.md
├── セットアップと運用ガイド.md
└── クマに遭わない暮らし方ガイド.md
```

各アプリ共通スタック：**React 19 + TypeScript + Vite + Tailwind CSS 3.4.17 + Zustand + LIFF**。
高齢者向けに基準17px・行間1.9・特大ボタンを徹底。地図は素のLeaflet＋OpenStreetMap（APIキー不要）。

---

## ローカルで動かす

各アプリは独立して動く（LIFF未設定でもデモデータで動作）：

```bash
cd kuma-map
npm install
npm run dev   # http://localhost:5173
```

`kuma-report` `kuma-bakuon` `kuma-alert` `kotsu-info` も同じ手順。

---

## Vercelデプロイ（モノレポ）

このリポジトリは「1リポジトリ＝5つのVercelプロジェクト」で運用する。
各Vercelプロジェクトの **Root Directory** を各アプリのフォルダ（例 `kuma-map`）に設定する。

- Framework: Vite（各フォルダの `vercel.json` で指定済み）
- Build: `npm run build` / Output: `dist`
- 環境変数（各プロジェクトに設定）：
  - `VITE_LIFF_ID` … 各アプリのLIFF ID
  - `VITE_API_BASE` … 共有API（DB接続後）。未設定ならデモ動作

CLIでのデプロイ例：
```bash
cd kuma-map && vercel --prod
```

---

## 今後（DB接続）

`kuma-map`（見る）と `kuma-report`（送る）等は本来同じデータを共有する。
共有API（`/api/sightings` 等）を1つ立て、各アプリの `VITE_API_BASE` に設定する。
DBは Neon PostgreSQL + Prisma を想定（未実装）。詳細は `アプリの仕様書.md` と `セットアップと運用ガイド.md`。

---

## ドキュメント
- **議員向け企画書.md** … 議員に渡す平易版（専門用語ゼロ）
- **セットアップと運用ガイド.md** … LINE公式作成→LIFF→リッチメニュー→通知配線の全手順
- **アプリの仕様書.md** … 技術仕様・競合分析・実装状況（内部用）
- **クマに遭わない暮らし方ガイド.md** … 製品の本体価値（遭わない6条件・今日のリスク構想）
