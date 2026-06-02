import styles from "./Section.module.css";

type Props = {
  id: string;
  index: string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Section({ id, index, title, className, children }: Props) {
  return (
    <section
      className={`${styles.section} ${className ?? ""}`.trim()}
      id={id}
      data-reveal
    >
      <p className={styles.index}>{index}</p>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {children}
    </section>
  );
}
