# Design — Shogo Kamino Portfolio

> Status: 現行デザイン仕様（live）。これは Shogo Kamino Portfolio の
> すべてのスタイル判断の唯一の基準。コードを変えたら同じコミットで本書も更新する。
> エージェントへ: スタイル生成・変更時は本書のトークンとルールに従い、「Don'ts」に反しないこと。

テーマは **Crisp Editorial** — 白い地に、高コントラストの濃色テキストと爽やかなスカイブルーのアクセント。「くっきり・はっきり・爽やか」を基調にしつつ、静かでエディトリアルな組版を保つ。
本サイトは **モバイルファースト responsive** レイアウト。`body` は `width: 100%` で画面幅にフィットし、ブレークポイント tablet (`min-width: 768px`) / desktop (`min-width: 1100px`) の2点でカラム数・余白を段階的に拡大する。fluid な `clamp()` を余白・Hero見出しに併用して滑らかな変化を実現する。
値は実装（`globals.css` / `*.module.css`）から転記している（理想形ではなく出荷済みの状態を記す）。

## 1. Product & Principles
- プロダクト: Shogo Kamino のフロントエンド・ポートフォリオ。
  就職・転職で採用担当者にスキルと丁寧さを示すための個人サイト。
- 対象読者: 採用担当・エンジニア。短時間で「作れること」と「美意識」を伝える。
- フォーマット: **モバイルファースト responsive**（tablet 768+ / desktop 1100+）。
  モバイル（〜767px）: 単一カラム / tablet（768〜1099px）: 余白拡大・一部2col / desktop（1100px〜）: 2〜3col に展開。
- トーン: 涼しく爽やかでエディトリアル（雑誌的・上品）。大きなセリフのステートメント（Hero）で印象づける。

### デザイン原則（迷ったら、この順で優先する）
1. くっきり・余白を最優先 — 高コントラストで、要素を足すより引く
2. エディトリアルな品 — セリフ見出し・細い罫線・整った組版
3. 記憶に残る一点 — 大きなセリフのステートメント（Hero）と、その背後でゆっくり呼吸する空気感で印象づける
4. 採用文脈での信頼感 — 奇抜さより明快さ・読みやすさ

> モーション・グラデーションの扱い: 装飾を増やすためではなく「空気感」を作るためにのみ使う。
> 認可されている例外は §4 の Hero 背景アニメと scrolled Nav のフロストガラスのみ。
> その他の場所では従来通り「動かない・グラデーションなし」を保つ。

## 2. Color
全色を `:root` の CSS変数で管理する。新しい色を足さない（パレットは7つで固定）。

| トークン | 値 | 使う場面 | 使わない場面 |
|---|---|---|---|
| `--paper` | `#ffffff` | ページ全体の背景（純白） | これ以外を地の背景にしない |
| `--paper-card` | `#e9f1f8` | ホバー時の面（Work等） | 広い面の塗りに使わない |
| `--ink` | `#0e1217` | 見出し・強調文字（高コントラスト） | 薄い補助テキストに使わない |
| `--ink-soft` | `#3c4651` | 本文・補助テキスト | 見出しの主役色にしない |
| `--muted` | `#7c8893` | キャプション・番号・控えめ要素 | 本文に使わない（可読性低下） |
| `--line` | `rgba(14,18,23,.12)` | 罫線・下線のみ | 面の塗りに使わない |
| `--accent` | `#0a93d1` | 単一アクセント：ホバー / 現在地 / セクション番号 / Hero罫線 | 面の塗り・本文・1画面に多用しない |

ルール: アクセントはスカイブルー1色のみ。新規アクセント色を導入しない。

## 3. Typography
2書体のみ。新しいフォントを足さない。フォントサイズは原則 **モバイル前提の固定値**。`clamp(...)` は本文・補助テキストには使わない（例外: §4 のメニューパネルのリンク見出し / Hero statement / 余白）。

> **2026-06-12 移行メモ**: Cormorant Garamond のオールドスタイル数字が日本語混植で潰れる課題により、serif を Spectral へ移行。Spectral は lining figures が標準のため数字可読性が向上する。

- `--serif`: "Spectral" (400/500/600/700, next/font で自己ホスト), "Hiragino Mincho ProN", serif
- `--sans` : -apple-system, "Hiragino Sans", "Noto Sans JP", sans-serif

| スタイル名 | 用途 | 指定 |
|---|---|---|
| hero-statement | Hero の大見出し一文 | serif 500 / clamp(38px, 7.5vw, 110px) / line-height 1.15 / max-width 14ch |
| hero-name | Hero の名前 | serif 600 / 18px / 字間 3px / 大文字 |
| section-title | セクション見出し | serif 500 / 30px / line-height 1.2 |
| work-name | 作品名 | serif 500 / 22px |
| contact-mail | 連絡先メール（Footer） | serif / 22px |
| tools-item | Tools の各項目 | serif 18px / `/` 区切り |
| body (prose) | 本文 | sans 14px / line-height 1.7 / 色 --ink-soft |
| eyebrow | 番号・キッカー・肩書き・ナビ | sans 10–11px / 大文字 / 字間 1.5–3px |

ルール:
- 見出し系は必ず serif、本文・ラベルは必ず sans。逆にしない。
- 本文（prose）を大文字化しない。大文字＋広い字間は短いラベルだけ。
- 本文・section-title 等の通常テキストには `clamp(...)` を使わない（モバイル固定値）。例外は2点: メニューの大リンク `clamp(34px, 10vw, 64px)` / Hero statement `clamp(38px, 7.5vw, 110px)`。
- serif で digit を表示する箇所は tabular figures を有効化する。Spectral は lining figures が標準のため `lining-nums` の強制は不要だが、`tabular-nums` による等幅揃えは引き続き明示する（`font-variant-numeric: lining-nums tabular-nums` + `font-feature-settings: "lnum" 1, "tnum" 1`）。対象: Work 一覧の番号（`.no`）、Work モーダルタイトル（`.modalTitle`）、Footer メールリンク（`.mail`）など。

## 4. Components & Layout
- 角丸は使わない（`border-radius: 0` が基本）。直線・罫線で構成する。
- **キャンバス**: `body` は `width: 100% / overflow-x: hidden`。画面幅に追従。`html` にも `overflow-x: hidden` と `-webkit-text-size-adjust: 100%` を指定
- セクション共通: 余白は **fluid clamp** で全画面サイズに追従し、768/1100 ブレークポイントで段階的に拡大。
  - mobile: 左右 `clamp(28px, 7vw, 80px)` / 上下 `clamp(80px, 12vw, 140px)` / 上罫線1px(`--line`)
  - tablet (768+): 左右 `clamp(48px, 8vw, 100px)` / 上下 `clamp(100px, 13vw, 160px)`
  - desktop (1100+): 左右 `clamp(80px, 9vw, 140px)` / 上下 `clamp(100px, 11vw, 140px)`
  - 余白方針: 「どの画面サイズでも十分な余白を保つ」。小画面では密度が上がりすぎない最低値、大画面では間延びしない上限値を設定する
  - 横向き iPhone 等の左右セーフエリアにも `env(safe-area-inset-left/right)` で対応
- ページ構成（順序固定）: Hero → 01 About → 02 Tools → 03 Work → Footer(Contact統合)
- ナビ: 上部固定（`position: fixed / inset: 0 0 auto 0 / z-index: 60`）で画面幅100%。**ハンバーガー型**（モバイル特化のため inline リンクは廃止）。
  ヘッダー帯は2状態を持つ:
  - **静止時（scrollY ≤ 8 かつメニュー閉）**: 完全透過・罫線なし。Hero と一体化する
  - **scrolled（scrollY > 8 もしくはメニュー開）**: フロストガラス。背景 `rgba(255,255,255,.35)` ＋
    `backdrop-filter: blur(18px) saturate(180%)`、白1pxの境界線、
    上端から内側に光が差す radial-gradient、inset 白ハイライト、
    控えめな drop shadow。トランジション 0.35s ease
  - padding は左右 `clamp(18px, 5vw, 56px)`、上 14px、下 14px に加え `env(safe-area-inset-*)` を全方向で加算（iOS ノッチ/Dynamic Island 端末で要素が切れないようにする）
  - **brand**: "SK" モノグラム SVG（36×36、1px の正方形フレーム + 中央薄罫 0.5px + serif "S"/"K"）。`components/Logo.tsx` に切り出し。`currentColor` で色継承、hover で `--accent`。ハンバーガーの「細罫線」世界観と呼応する額縁型
  - **ハンバーガーボタン**: 44×44 ヒット領域、内側に 22×1px の細罫線3本、gap 6px、color `--ink`、hover で `--accent`。Nav の padding 内に置き、`margin-right` 等で食み出させない（小画面でカメラ/Dynamic Island と近接しないため）。
    開タップで上下線が中央に集まり X 字に交差（top: `translateY(7px) rotate(45deg)`、bottom: `translateY(-7px) rotate(-45deg)`、中央線は `opacity:0 + scaleX(0)`）。
    transition `0.42s cubic-bezier(0.4, 0, 0.2, 1)`。Crisp Editorial の「細い罫線」原則と整合
- **メニューパネル**: ハンバーガータップで全画面オーバーレイ。
  - 背景は scrolled Nav と統一感のあるフロストガラス（`rgba(255,255,255,.78)` + `blur(22px) saturate(180%)` + 上から radial の白光）。padding にも `env(safe-area-inset-*)` 加算
  - 開閉: opacity 0→1 + translateY(-12px)→0、0.35s ease / 0.45s cubic-bezier
  - リンク: 4項目（About / Tools / Work / Contact）。番号 eyebrow（serif 12px, muted）+ 大 serif 名前（`clamp(34px, 10vw, 64px)`, 500）の 2 列 grid。上罫線 1px、padding 22px 4px
  - リンク登場: stagger（delay `0.12 + 0.06*i` 秒）で順に opacity/translateY 復帰
  - hover/active で名前を `--accent` 化し、左 padding を 12px 追加（Work と同じ振る舞い）
  - 閉操作: ハンバーガー再タップ / Esc / オーバーレイ余白タップ / リンクタップ
  - 開いている間は `body { overflow: hidden }` で背景スクロール停止
  - a11y: `aria-expanded` / `aria-controls="primary-menu"` / `aria-label` / `aria-hidden`
- Hero: min-height 100dvh / 中央（ステートメント型）。並び順固定:
  kicker → 大きなセリフの一文 → 罫線(48×1px, accent) → 名前 → 肩書き → Scrollキュー
  - **statement サイズ**: `clamp(38px, 7.5vw, 110px)` で mobile=38px → tablet≈57px → desktop=110px に流体変化
  - **余白**: mobile: padding `clamp(100px,14vw,160px)` top、tablet(768+)・desktop(1100+) で段階的に拡大
  - **背景**: `::before` に accent と paper-card の radial-gradient を重ね、
    blur(40px) で輪郭を溶かす。22s ease-in-out alternate で位置・回転・拡縮を
    ゆっくり動かす（heroDrift）。tablet+ では `inset: -20%` でスケール調整。`prefers-reduced-motion` で停止。Hero 内に
    限定し、他セクションへ持ち込まない
- Tools: 6グループを縦並び（mobile）/ 2col grid（tablet 768+）/ 3col grid（desktop 1100+）。
  **最初のグループ `AI / Agent (main)` を主軸として配置**
  （Claude Code / Claude API / Prompt Engineering / AI Agent Design / MCP / Subagents・Workflows）。
  以下 Languages / Frameworks / Styling / Backend / Tooling。
  各 group は上罫線1px・eyebrow ラベル・serif 18px の `/` 区切りで項目を並べる。
  tablet+ では `.group` に `min-height: 132px` を付与し、row 内で最大グループと高さを揃えて縦罫線が一直線に見えるようにする（`.grid` は `align-items: stretch` を明示）。
- Work: 1col list（mobile）/ 2col grid（tablet 768+）/ 3col grid（desktop 1100+）。各 item のセル間は罫線で区切る。
  各項目の組版「番号 / 名前+説明」は grid 化後も崩さない。`<button>` でモーダルを開く。`/work/[slug]` は直接URL用に残置。
  hover/active/focus-visible = 背景 `--paper-card`・左padding 14px・名前 accent
- **Workモーダル**: ネイティブ `<dialog>` を `showModal()` で開く。中央寄せ（`place-items: center`）の全面オーバーレイ。
  - 背景: `::backdrop` を `rgba(14,18,23,.4)`（blur なし）
  - パネル: 幅100% / `max-width: 460px`（mobile）/ `max-width: 560px`（tablet 768+）/ `max-width: 640px`（desktop 1100+）/ `max-height: 92dvh` / 背景 `--paper` / mobile: 上罫線1px / tablet+: 四辺1px罫線 / padding 18px 20px 24px。内容が長い場合のみ `overflow-y: auto`
  - 構成（上から）: eyebrow（`{No.} — Selected Work`, 10px accent）と `×` 閉じ → serif タイトル 26px → meta `Year · Stack`（sans 11px, muted）+ 下罫線 → 概要（sans 13px）→ ラベル「実装」+ 箇条書き（12.5px）→ ラベル「学び」+ テキスト（12.5px）→ 下罫線 + **Demo / Source CTA**
  - CTA（`Live demo ↗` / `Source ↗`）: モバイル前提のため hover に依存しない設計。静止時から **accent 矢印が右上 (+2/-2px) に既に出ている**＋テキストは ink + 下に薄罫線。**モーダル展開時に一度だけ** 下の罫線が左→右へ accent 色で wipe（0.7s cubic-bezier、delay 0.18s、メニュー stagger と同種の一回限り）。`:active`/`:focus-visible` で矢印がさらに +5/-5px に進み（0.22s）、テキストも accent に。`prefers-reduced-motion` で線は即座に scaleX(1)、transition なし
  - 設計意図: スクロールせずに一目で把握できるよう、タイポと余白をケーススタディページ（`/work/[slug]`）よりひと回りコンパクトに固定
  - 閉じ操作: `×` ボタン / Esc（`<dialog>` 既定）/ パネル外余白タップ（`e.target === dialog` で判定）
  - a11y: `aria-labelledby` で serif タイトルを参照、`×` は `aria-label="閉じる"`、`focus-visible` で accent 化
- About: desktop (1100+) でタイトル左列 / 本文右列の 2col grid（DOM 変更なし・CSSのみ）。Section に `className` を渡して section 全体を `display: grid / grid-template-columns: 1fr 1fr` に。
- Footer（Contact 統合）: 上罫線1px。padding は Section と同じ方針で 768/1100 で段階的に拡大。左右: mobile `clamp(28px,7vw,80px)` / tablet `clamp(48px,8vw,100px)` / desktop `clamp(80px,9vw,140px)` /
  「Contact」eyebrow → serif メールリンク（word-break: break-all）→
  X・Instagram の SVG アイコン（currentColor、**44×44** のヒット領域、ホバーで accent。`socials` リストに `margin: 0 -10px` を当てて見た目の位置を維持）
  / 下段に © と Back to top
- 出現: `[data-reveal]` は translateY(20px)+不透明0 → `in-view`。閾値0.15で一度だけ
- モーション: smooth scroll / 出現フェード(data-reveal) / Hero 背景アニメ /
  Nav の scrolled トランジション / `prefers-reduced-motion` で全アニメ無効

## 5. Don'ts
### 色
- アクセント（スカイブルー）を面（背景・ボタンの塗り）に使わない。線・文字・1pxアクセントのみ。
- パレット外の色を足さない。純黒 `#000` は使わず濃色 `#0e1217` を使う。高彩度色を広い面に使わない。
- 1画面にアクセントを多用しない（アクセントは数点まで）。

### 文字
- 本文を serif にしない／見出しを sans にしない。
- 本文を大文字化・広い字間にしない（大文字＋字間は短いラベルだけ）。
- フォントを追加しない（Spectral ＋ システムフォントのみ）。
- フォントサイズに `clamp(...)` を持ち込まない（モバイル固定値で統一）。

### レイアウト・装飾
- 角丸を付けない（`border-radius` は 0。カード・ボタンも直角）。
- drop shadow・box-shadow・グラデーションを **§4 で認可された箇所以外** で足さない
  （認可: Hero 背景アニメ、scrolled Nav のフロストガラス、メニューパネルのフロストガラス）。それ以外はフラットを保つ。
- セクションを「囲み枠・ベタ塗りボックス」で区切らない。区切りは上罫線のみ。
  例外: Work モーダル tablet+ の四辺 1px 罫線（§4 で認可済み）。
- アイコンを増やさない。許可済み: フッターの SNS（X / Instagram、currentColor）、ハンバーガーの細罫線3本。絵文字は使わない。
- **ブレークポイントは tablet `768px` / desktop `1100px` の2点のみ使用可**。それ以外の `@media (min-width:*)` は追加しない。`clamp(...)` は余白・Hero statement・メニューの大リンクに限り使用可（単一スタイルで滑らかに変化させる目的に限定）。

### モーション
- 演出を **無闇に** 増やさない。動きは以下に限定する:
  - 出現フェード（data-reveal）
  - 下線・色・微小 transform のホバー
  - Hero 背景の slow drift（22s）
  - Nav scrolled のトランジション（0.35s）
  - ハンバーガー3本線 → X 字変形（0.42s cubic-bezier）
  - メニューパネルのフェード＋小 translateY、リンクの stagger 立ち上がり
  - Workモーダル CTA の下線 wipe（モーダル展開時の一回限り）＋ 矢印スライド（:active/focus-visible のタクタイル）
  - smooth scroll
- パララックス・派手なスクロールアニメ・過剰なホバーは引き続き禁止。
- `prefers-reduced-motion` を無視するアニメを書かない（Hero 背景もこの設定で停止）。
- autoplay・点滅は禁止。「常時ゆっくり動く」のは Hero 背景のみで、他に持ち込まない。

### トーン
- 採用文脈の信頼感を損なう、砕けすぎた表現・過剰なキャッチコピーを足さない。

## 技術メモ
- Next.js 16 (App Router) + TypeScript + React 19。
- スタイルは `globals.css`（トークン・base・共通ユーティリティ）＋ コンポーネントごとの CSS Modules。Tailwind 不使用。
- フォントは next/font で Spectral を自己ホスト（`--font-spectral`）。新しい依存・UIライブラリを足さない。
- インタラクティブ部分（出現アニメ `Reveal` / ナビ現在地・スクロール検知 `Nav`）のみ `'use client'`。
- viewport は `app/layout.tsx` で `export const viewport` により `width: device-width / initialScale: 1 / viewportFit: cover` を明示。

## Changelog
- 2026-06-12: serif フォントを Cormorant Garamond → Spectral へ差し替え（数字可読性改善）。`--font-cormorant` → `--font-spectral`、`--serif` トークンのフォールバックも更新。§3 Typography の lining figures ルールを Spectral 標準 lining 前提に緩め、`tabular-nums` のみ引き続き明示。§5 Don'ts のフォント名も更新。Work.module.css / Footer.module.css の `font-variant-numeric` 宣言は維持（tabular-nums のメリット保持）。
- 2026-06-12: モバイル専用 → responsive (768 / 1100) に拡張。Hero statement を `clamp(38px, 7.5vw, 110px)` で流体化。About desktop に 2col grid（タイトル左 / 本文右）。Tools を tablet 2col / desktop 3col grid 化。Work 一覧を tablet 2col / desktop 3col grid 化（罫線・組版維持）。Work モーダルを tablet+ で中央カード化（四辺罫線 / 560px / 640px）。Section・Hero・Footer の余白を 768/1100 で段階的に拡大。全アニメーションに `prefers-reduced-motion` 尊重を維持。design.md §1・§3・§4・§5 を同期更新。
- 2026-06-12: Tools tablet 2col / desktop 3col に縦罫線（border-left + padding-left 24px）を追加し隣接カラムを視覚分離。About desktop grid 比率を `1fr 1fr` → `5fr 7fr` に調整（本文寄り）。Work `.no` / `.modalTitle` に `lining-nums tabular-nums` を適用しオールドスタイル数字を解消。design.md §3 Typography に lining figures ルール、§5 Don'ts に Work モーダル四辺罫線の例外を追記。
- 2026-06-12: Tools `.group` に `min-height: 132px` + `.grid` に `align-items: stretch` を追加し row 間の縦罫線段違いを解消。Section desktop 上下余白を `clamp(120px,14vw,180px)` → `clamp(100px,11vw,140px)` に縮小。Footer `.mail` に `lining-nums tabular-nums` を適用し数字の可読性向上。design.md §3・§4 を同期更新。
- 2026-06-12: Hero の statement を「It takes / more than one.」、肩書きを **AI Orchestrator** に。About のタイトルを「AI を束ねる。人は 1 人。」、本文を HTML/CSS/JavaScript からの導入＋バックエンド・DB の並行学習に書き直し。
- 2026-06-12: Work 一覧の各項目をネイティブ `<dialog>` のモーダル開閉に変更（`<button>` 化）。スクロールせず一目で把握できるコンパクト構成（460px / 92dvh / 上罫線1px、`::backdrop` は blur なしの半透明）。`/work/[slug]` は直接URL用に残置。
- 2026-06-02: タップターゲット / セーフエリア / ハンバーガー位置の3点を修正。Footer の SNS ヒット領域を 36→44 化（gap を 14→8 + リストに `-10px` 負マージンで見た目位置を維持）、Nav ハンバーガーの `margin-right:-10px` を撤去して Nav padding 内に収め、Nav・Panel・Hero・Section・Footer の padding に `env(safe-area-inset-*)` を加算（iOS ノッチ/Dynamic Island/横向きセーフエリアで切れないように）。
- 2026-06-02: ヘッダーの brand を「Shogo Kamino」テキストから **"SK" モノグラム SVG ロゴ**（36×36）へ刷新。1px の正方形フレーム + 中央 0.5px の薄罫 + serif の "S"/"K"。`components/Logo.tsx` に切り出し、`currentColor` で色継承して hover で `--accent`。ハンバーガーの細罫線3本とロゴの罫線フレームが視覚的に対称になるよう設計。
- 2026-06-02: セクション名「Skills」を「Tools」へ改称（title「使っている道具。」と一直線に揃える目的）。コンポーネントファイル名 Skills.tsx/Skills.module.css → Tools.tsx/Tools.module.css、id="skills"→"tools"、Nav リンク・メニューパネルの番号 02 も Tools に更新。
- 2026-06-02: ヘッダーをハンバーガー型に刷新。1px細罫線3本→X字交差（0.42s）。タップでフロストガラスの全画面オーバーレイ（blur 22px + saturate 180% + 上から radial の白光）が降りて、4リンク（About / Tools / Work / Contact）が大きな serif で番号付き縦並びに stagger で立ち上がる。Esc / 外側タップ / リンクタップで閉じる、`body { overflow:hidden }` で背景スクロール停止、`aria-expanded`/`aria-controls`/`aria-hidden` 対応。
- 2026-06-02: 余白を fluid clamp 化（Section: `clamp(80,12vw,140)` × `clamp(24,7vw,80)`、Hero / Footer / Nav も同様）。全画面サイズで「どこでも余白を保つ」方針。`@media (min-width:*)` のブレークポイント分岐は引き続き不使用、`clamp` は余白とメニュー大リンクに限定して使用可へ緩和。
- 2026-06-02: モバイル専用レイアウト方針を「画面幅に追従するモバイルファースト」に訂正。一時導入した `body { max-width:480px; margin:0 auto }` と `--mobile-max` 変数は撤去（実機で固定幅ストリップになり中央寄せが崩れていた）。`html`/`body` に `overflow-x:hidden` と `-webkit-text-size-adjust:100%` を追加。viewport を `app/layout.tsx` で明示。Nav は `inset: 0 0 auto 0` で画面幅100%に。
- 2026-06-02: Hero に動く radial-gradient 背景（heroDrift, 22s）を追加。scrolled Nav をフロストガラス（blur 18px + saturate 180% + 内側光 radial）に。Contact セクションを Footer に統合し、X / Instagram の SVG アイコンを追加。Skills セクションを新設し、ページ構成を Hero → About → Skills → Work → Footer に変更。design.md の Don'ts を「無闇に増やさない」方針に緩和し、認可された動き・グラデーションを §4 に明記。
- 2026-05-29: ベストプラクティスに沿って全面再構成（Product & Principles / 使用ルール付きトークン / Don'ts / 運用ヘッダー）。
- 2026-05-29: Next.js + TS へ移行。署名アニメを廃止し Hero をステートメント型へ。スタイルを CSS Modules ハイブリッドに。
- 2026-05-29: 作品ごとに `/work/[slug]` のケーススタディページを追加。Work一覧をリンク化（Coming soon を廃止）。
- 2026-05-29: 配色を Ink on Paper（暖色）から Crisp Editorial（涼しい白×スカイブルー）へ刷新。アクセントトークン `--bordeaux` を `--accent` に改称、ナビ背景を `--paper` 追従（color-mix）に変更。
- 2026-05-29: 背景 `--paper` を純白 `#ffffff` に変更。
