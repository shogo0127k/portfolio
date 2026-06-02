import Section from "./Section";
import styles from "./Tools.module.css";

const GROUPS: { label: string; items: string[] }[] = [
  {
    label: "AI / Agent (main)",
    items: [
      "Claude Code",
      "Claude API",
      "Prompt Engineering",
      "AI Agent Design",
      "MCP",
      "Subagents / Workflows",
    ],
  },
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Vite", "Astro"],
  },
  {
    label: "Styling",
    items: ["CSS Modules", "Tailwind CSS", "PostCSS"],
  },
  {
    label: "Backend / Data",
    items: ["Supabase", "Postgres", "REST API"],
  },
  {
    label: "Tooling",
    items: ["Git / GitHub", "npm", "ESLint", "Figma"],
  },
];

export default function Tools() {
  return (
    <Section id="tools" index="02 — Tools" title="使っている道具。">
      <p className="prose">
        AI と一緒に作る開発スタイルがメイン。
        Claude Code・Claude API を中心に、Web フロントエンドと小さな個人プロダクトを作っています。
      </p>
      <dl className={styles.grid}>
        {GROUPS.map((g) => (
          <div key={g.label} className={styles.group}>
            <dt className={styles.label}>{g.label}</dt>
            <dd className={styles.items}>
              {g.items.map((item) => (
                <span key={item} className={styles.item}>
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
