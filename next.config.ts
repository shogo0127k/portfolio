import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 末尾スラッシュを保持する。public/demos の静的デモはサブページから
  // 相対パス(../styles.css 等)で資産を参照するため、スラッシュが消えると
  // 解決先がずれて CSS/JS が 404 になる。これを防ぐ。
  trailingSlash: true,
};

export default nextConfig;
