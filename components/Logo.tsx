type Props = {
  size?: number;
  ariaLabel?: string;
};

export default function Logo({ size = 36, ariaLabel = "Shogo Kamino" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      role="img"
      aria-label={ariaLabel}
      fill="none"
      stroke="currentColor"
    >
      {/* 1px の正方形フレーム：ハンバーガーの細罫線3本と世界観を統一 */}
      <rect x="0.5" y="0.5" width="35" height="35" strokeWidth="1" />
      {/* 内側に薄い罫線で中心を区切る（雑誌キャプション的） */}
      <line x1="18" y1="6" x2="18" y2="30" strokeWidth="0.5" opacity="0.35" />
      {/* serif の "S" と "K"。Cormorant Garamond を継承。アクセントは右下の "K" 下の小さな罫 */}
      <text
        x="11"
        y="24"
        textAnchor="middle"
        fontFamily="var(--serif)"
        fontWeight="500"
        fontSize="18"
        fill="currentColor"
        stroke="none"
      >
        S
      </text>
      <text
        x="25"
        y="24"
        textAnchor="middle"
        fontFamily="var(--serif)"
        fontWeight="500"
        fontSize="18"
        fill="currentColor"
        stroke="none"
      >
        K
      </text>
    </svg>
  );
}
