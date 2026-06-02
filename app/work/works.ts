export type Work = {
  slug: string;
  no: string;
  name: string;
  desc: string; // 一覧用の一行
  year: string;
  tech: string[];
  overview: string;
  highlights: string[];
  learned: string;
  demo?: string;
  source?: string;
};

export const works: Work[] = [
  {
    slug: "coverflow-slider",
    no: "01",
    name: "Coverflow Slider",
    desc: "ローディング表示付きの画像スライダー / Swiper.js",
    year: "2026",
    tech: ["HTML", "CSS", "JavaScript", "Swiper.js"],
    overview:
      "カテゴリを切り替えて画像を扇状（coverflow）に流すスライダー。APIキーもビルドも不要で動く、素のJSの練習作。",
    highlights: [
      "Swiper.js の coverflow エフェクトで画像を立体配置。カテゴリタブで動的に差し替え",
      "画像は LoremFlickr から取得し、読み込み失敗時はローカル画像へフォールバック",
      "クリックでモーダル表示（Esc / 背景で閉じ、表示中は autoplay 停止、aria 配慮）",
    ],
    learned:
      "外部ライブラリの設定を読み解きつつ、動的DOM・モーダル・フォールバックを一つにまとめる練習になった。",
    demo: "/demos/coverflow-slider/index.html",
  },
  {
    slug: "live-clock",
    no: "02",
    name: "Live Clock",
    desc: "Date API で動く時計 / 描画ループの練習",
    year: "2026",
    tech: ["HTML", "CSS", "JavaScript"],
    overview:
      "Date API で現在時刻を取得し、0.5秒ごとに更新するデジタル時計。日付処理・文字列整形・タイマーの基礎練習。",
    highlights: [
      "Date API で時・分・秒を取得し、padStart で2桁ゼロ埋め",
      "曜日は配列インデックスで英語表記に変換",
      "setInterval で0.5秒ごとに再描画",
    ],
    learned:
      "JS の基礎（日付・文字列・タイマー）を一通り触れた。",
    demo: "/demos/live-clock/index.html",
  },
  {
    slug: "color-switcher",
    no: "03",
    name: "Color Switcher",
    desc: "クリックで色が切り替わるプロダクト UI",
    year: "2026",
    tech: ["HTML", "CSS", "JavaScript"],
    overview:
      "カラーピッカーとプリセットで商品（Tシャツ）の色を切り替え、HEX / RGB / カラー名をライブ表示する UI。",
    highlights: [
      "color入力とプリセットで選択し、SVG の fill をリアルタイム変更",
      "HEX → RGB を自前で変換して表示",
      "カラー名辞書で命名（未登録色は Custom Hue）、選択中プリセットをハイライト",
    ],
    learned:
      "入力イベントと状態のUI反映、色の変換まわりを練習できた。",
    demo: "/demos/color-switcher/index2.html",
  },
  {
    slug: "the-snippets",
    no: "04",
    name: "The Snippets",
    desc: "UI & UX パターン集 / よく使う実装のまとめ",
    year: "2026",
    tech: ["HTML", "CSS", "JavaScript"],
    overview:
      "よく使う UI / UX パターンを、動作デモ＋コピー可能なコード付きでまとめた資料集。",
    highlights: [
      "テーマ切替（localStorage永続化）・レベル別タブ・HTML/CSS/JS のコード切替＋ワンクリックコピー",
      "UIデモ: モーダル / タブ / アコーディオン / トースト / ツールチップ / フォーム検証 / debounce ほか",
      "UXデモ: スケルトン / 楽観的UI / 取り消せる削除 / 自動保存 / 入力タイポ提案 など実務志向のパターン",
    ],
    learned:
      "実装パターンを言語化して整理することで、再利用しやすい形に落とし込めた。",
    demo: "/demos/the-snippets/index.html",
  },
  {
    slug: "bookrip",
    no: "05",
    name: "Bookrip",
    desc: "本のSNS / 投稿の反応量で本が浮かび上がる",
    year: "2026",
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "楽天ブックス API"],
    overview:
      "本を中心にしたSNS（略称: Rip）。投稿への反応量で本がランキングのように浮かび上がり、X の急上昇のような体験を狙う個人開発プロダクト。",
    highlights: [
      "Next.js 16 App Router + Supabase（Postgres / Auth / RLS）で構築",
      "楽天ブックス API で書籍を検索し、ローカルにキャッシュ",
      "Tailwind CSS v4 の CSS-first `@theme` + OKLCH カラーで設計",
    ],
    learned:
      "Supabase の RLS を含むデータ設計と、Next.js 16 / Tailwind v4 の新しい書き方を実プロダクトで通す経験になった。",
    demo: "https://bookrip.vercel.app",
  },
  {
    slug: "the-guild",
    no: "06",
    name: "The Guild",
    desc: "AI 群で仮想会社を運用するプロジェクト / Versora",
    year: "2026",
    tech: ["Astro", "React", "TypeScript"],
    overview:
      "AI エージェント群で仮想会社を運用する構想『The Guild』のブランドサイト（ギルド名 Versora）。Astro + React で構築。",
    highlights: [
      "Astro + React アイランドで構築した多ページ構成（About / Characters / Locations / Gallery）",
      "AI 群で仮想会社を運用する世界観『The Guild / Versora』をビジュアルで表現",
    ],
    learned:
      "Astro と React アイランドを組み合わせ、世界観を軸にしたビジュアル中心のサイトを形にした。",
    demo: "https://versora-kappa.vercel.app",
  },
];
