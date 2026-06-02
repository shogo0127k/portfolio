import Link from "next/link";
import Section from "./Section";
import styles from "./Work.module.css";
import { works } from "@/app/work/works";

export default function Work() {
  return (
    <Section id="work" index="03 — Selected Work">
      <ul className={styles.list}>
        {works.map((w) => (
          <li key={w.slug} className={styles.item}>
            <Link className={styles.link} href={`/work/${w.slug}`}>
              <span className={styles.no}>{w.no}</span>
              <span className={styles.name}>{w.name}</span>
              <span className={styles.desc}>{w.desc}</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
