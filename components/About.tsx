import Section from "./Section";
import styles from "./About.module.css";

export default function About() {
  return (
    <Section id="about" index="01 — About" title="AI を束ねる。人は 1 人。" className={styles.aboutSection}>
      <div className={styles.body}>
        <p className="prose">
          HTML、CSS、JavaScript から始めて、いまは AI と人がペアで開発するスタイルを軸にしています。
          Claude Code と Claude API を日々使い倒し、書きながら学び、学びながら書く。
        </p>
        <p className="prose">
          このポートフォリオ、本の SNS『Bookrip』、AI エージェントの世界観を扱う『The Guild』など、
          興味のあるテーマを小さなプロダクトに落とし込みながら、
          フロントエンドの引き出しを増やしつつ、バックエンドやデータベースの勉強も同時進行で行っています。
        </p>
        <p className="prose">
          「なぜこの技術にしたか」「AI をどう使い分けるか」など、
          各プロジェクトの裏側は Work セクションから覗いてみてください。
        </p>
      </div>
    </Section>
  );
}
