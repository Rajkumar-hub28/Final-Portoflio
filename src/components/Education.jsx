import { motion } from 'framer-motion';
import { education, achievements } from '../data';

const reveal = { initial: { opacity: 0, x: -24 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true } };

export default function Education() {
  return (
    <section id="education" className="section container">
      <h2 className="section-title">My <span className="grad">Education</span></h2>
      <div className="timeline">
        <motion.div className="tl-item" {...reveal}>
          <span className="tl-dot" aria-hidden="true" />
          <p className="period">{education.period}</p>
          <h3>{education.degree}</h3>
          <p className="muted">{education.college}</p>
          <p className="muted">{education.university}</p>
        </motion.div>
      </div>
    </section>
  );
}

// Renders nothing until verified entries are added in src/data.js.
export function Achievements() {
  if (!achievements.length) return null;
  return (
    <section className="section container" aria-labelledby="achievements-title">
      <h2 id="achievements-title" className="section-title">Achievements <span className="grad">and Certifications</span></h2>
      <div className="ach-grid">
        {achievements.map((a) => (
          <article key={a.title} className="glass">
            <h3>{a.title}</h3>
            <p className="muted">{a.issuer} · {a.year}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
