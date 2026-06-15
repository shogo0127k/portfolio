"use client";

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import styles from "./Work.module.css";
import { works, type Work as WorkType } from "@/app/work/works";

export default function Work() {
  const [active, setActive] = useState<WorkType | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <Section id="work" index="03 — Selected Work">
      <ul className={styles.list}>
        {works.map((w) => (
          <li key={w.slug} className={styles.item}>
            <button
              type="button"
              className={styles.link}
              onClick={() => setActive(w)}
            >
              <span className={styles.no}>{w.no}</span>
              <span className={styles.name}>{w.name}</span>
              <span className={styles.desc}>{w.desc}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setActive(null);
        }}
        aria-labelledby={active ? "work-modal-title" : undefined}
      >
        {active && (
          <div className={styles.modal}>
            <header className={styles.modalHead}>
              <span className={styles.modalEyebrow}>
                {active.no} — Selected Work
              </span>
              <button
                type="button"
                className={styles.close}
                onClick={() => setActive(null)}
                aria-label="閉じる"
              >
                ×
              </button>
            </header>

            <h2 id="work-modal-title" className={styles.modalTitle}>
              {active.name}
            </h2>
            <p className={styles.modalMeta}>
              <span>{active.year}</span>
              <span aria-hidden="true">·</span>
              <span>{active.tech.join(" · ")}</span>
            </p>

            <p className={styles.modalLead}>{active.overview}</p>

            <div className={styles.modalBlock}>
              <p className={styles.modalLabel}>実装</p>
              <ul className={styles.modalList}>
                {active.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className={styles.modalBlock}>
              <p className={styles.modalLabel}>学び</p>
              <p className={styles.modalText}>{active.learned}</p>
            </div>

            {(active.demo || active.source) && (
              <div className={styles.modalLinks}>
                {active.demo && (
                  <a
                    className={styles.cta}
                    href={active.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.ctaLabel}>Live demo</span>
                    <span className={styles.ctaArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
                {active.source && (
                  <a
                    className={styles.cta}
                    href={active.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.ctaLabel}>Source</span>
                    <span className={styles.ctaArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </dialog>
    </Section>
  );
}
