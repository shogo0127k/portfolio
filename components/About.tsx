import Section from "./Section";
import styles from "./About.module.css";

export default function About() {
  return (
    <Section id="about" index="01 — About" title="AI とペアで、手を動かす。">
      <div className={styles.body}>
        <p className="prose">
          JavaScript と CSS から始めて、いまは AI と人がペアで開発するスタイルを軸にしています。
          Claude Code と Claude API を日々使い倒し、書きながら学び、学びながら書く。
        </p>
        <p className="prose">
          このポートフォリオ、本の SNS『Bookrip』、AI エージェントの世界観を扱う『The Guild』など、
          興味のあるテーマを小さなプロダクトに落とし込みながら、
          フロントエンドの引き出しを増やしています。
        </p>
        <p className="prose">
          「なぜこの技術にしたか」「AI をどう使い分けるか」など、
          各プロジェクトの裏側は Work セクションから覗いてみてください。
        </p>
      </div>
    </Section>
  );
}
