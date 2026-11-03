import { motion } from 'framer-motion';
import { profile, education } from '../data';
import Terminal from './Terminal';

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 } };

export default function About() {
  return (
    <section id="about" className="section container">
      <motion.h2 className="section-title" {...reveal}>About <span className="grad">Me</span></motion.h2>
      <div className="about-grid">
        <motion.aside className="glass identity" {...reveal}>
          <div className="avatar" aria-hidden="true">RK</div>
          <h3>{profile.name}</h3>
          <p className="muted">{profile.title}</p>
          <p className="muted small">{education.degree}</p>
          <div className="chips">
            {profile.interests.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        </motion.aside>
        <motion.div {...reveal}>
          <p>{profile.about}</p>
          <p><strong className="text">Career objective.</strong> {profile.objective}</p>
        </motion.div>
      </div>
      <Terminal />
    </section>
  );
}
