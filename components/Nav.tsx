"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import styles from "./Nav.module.css";

const LINKS = [
  { id: "about", label: "About", no: "01" },
  { id: "tools", label: "Tools", no: "02" },
  { id: "work", label: "Work", no: "03" },
  { id: "contact", label: "Contact", no: "04" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // 現在地ハイライト
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 開いている間は body のスクロールを止める＋Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ""}`.trim()}>
        <Link
          className={styles.brand}
          href="/#top"
          aria-label="Shogo Kamino — Home"
          onClick={() => setOpen(false)}
        >
          <Logo size={36} />
        </Link>
        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`.trim()}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>
      </header>

      <div
        id="primary-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`.trim()}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <nav
          className={styles.panelInner}
          aria-label="セクション"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className={styles.list}>
            {LINKS.map((l, i) => (
              <li
                key={l.id}
                className={styles.item}
                style={{ transitionDelay: open ? `${0.12 + i * 0.06}s` : "0s" }}
              >
                <a
                  href={`/#${l.id}`}
                  className={`${styles.link} ${active === l.id ? styles.active : ""}`.trim()}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.no}>{l.no}</span>
                  <span className={styles.name}>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
