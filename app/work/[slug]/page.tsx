import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { works } from "../works";
import styles from "./work.module.css";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return {
    title: `${work.name} — Shogo Kamino`,
    description: work.desc,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <>
      <Nav />
      <main className={styles.page}>
        <article>
          <p className={styles.eyebrow}>{work.no} — Selected Work</p>
          <h1 className={styles.title}>{work.name}</h1>
          <p className={styles.lead}>{work.overview}</p>

          <dl className={styles.meta}>
            <div>
              <dt>Year</dt>
              <dd>{work.year}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{work.tech.join(" · ")}</dd>
            </div>
          </dl>

          <section className={styles.block}>
            <h2 className={styles.h2}>実装のポイント</h2>
            <ul className={styles.list}>
              {work.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </section>

          <section className={styles.block}>
            <h2 className={styles.h2}>学び</h2>
            <p className="prose">{work.learned}</p>
          </section>

          {(work.demo || work.source) && (
            <div className={styles.links}>
              {work.demo && (
                <a href={work.demo} target="_blank" rel="noopener noreferrer">
                  Live demo ↗
                </a>
              )}
              {work.source && (
                <a href={work.source} target="_blank" rel="noopener noreferrer">
                  Source ↗
                </a>
              )}
            </div>
          )}

          <Link className={styles.back} href="/#work">
            ← Back to work
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
