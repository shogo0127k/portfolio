import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.inner}>
        <p className={styles.kicker}>Portfolio — 2026</p>
        <h1 className={styles.statement}>
          Learning by building,
          <br />
          one page at a time.
        </h1>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.name}>Shogo Kamino</p>
        <p className={styles.role}>Front-End Developer</p>
      </div>

      <a className={styles.cue} href="#about" aria-label="下へスクロール">
        <span>Scroll</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </section>
  );
}
