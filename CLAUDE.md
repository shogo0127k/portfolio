@AGENTS.md

# Portfolio (Next.js) — Claude Code 指示

## デザイン
- スタイルの判断は `design.md` を唯一の基準とする（色・フォント・余白・装飾）。
- `design.md` の「Don'ts」に反する実装をしない。
- スタイルを変えたら、同じ変更で `design.md` も更新する（コードと常に一致させる）。

## スタイル方式
- globals.css（CSS変数・base・共通の罫線/セクション）＋ コンポーネントごとの CSS Modules（`*.module.css`）。
- Tailwind は使わない。新しいCSSフレームワーク/UIライブラリを足さない。

## 技術
- Next.js 16 (App Router) + TypeScript + React 19。
- ⚠ Next 16 は破壊的変更あり。Next固有のコードを書く前に `node_modules/next/dist/docs/` の該当ガイドを読む（@AGENTS.md 参照）。
- 依存は最小限に保つ。フォントは next/font 経由（Cormorant Garamond）。
