"use client";

import { useEffect } from "react";

// [data-reveal] を監視し、画面に入ったら in-view を付与（globals.css 側でフェードイン）
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
