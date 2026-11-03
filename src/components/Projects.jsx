import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Activity, Cpu, Network, LockKeyhole } from 'lucide-react';
import { projects } from '../data';

export default function Projects() {
  const [idx, setIdx] = useState(0);
  const p = projects[idx];
  const go = (d) => setIdx((i) => (i + d + projects.length) % projects.length);

  return (
    <section id="projects" className="section container">
      <h2 className="section-title">Project <span className="grad">Showcase</span></h2>
      <div className="showcase">
        <nav className="project-nav" aria-label="Project list">
          {projects.map((x, i) => (
            <button key={x.id} className={i === idx ? 'active' : ''} aria-pressed={i === idx} onClick={() => setIdx(i)}>
              <span className="num">0{i + 1}</span>{x.name}
            </button>
          ))}
        </nav>
        <div className={`stage theme-${p.theme}`}>
          <AnimatePresence mode="wait">
            <motion.article key={p.id} className="glass project-card"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }} aria-live="polite">
              <div className={`preview preview-${p.theme}`} aria-label={`${p.name} visual preview`}>
                <div className="grid-bg" />
                {p.id === 'cybershield' ? <div className="cyber-ui">
                  <div className="cyber-top"><span><ShieldCheck size={14}/> CYBERSHIELD / AI MONITOR</span><i>● SYSTEM ACTIVE</i></div>
                  <div className="cyber-main"><div className="cyber-orbit"><div className="cyber-core"><Cpu size={28}/><b>AI</b></div><span className="node n1"/><span className="node n2"/><span className="node n3"/><span className="node n4"/></div>
                  <div className="cyber-stats"><div><small>ENGINE</small><b>Isolation Forest</b></div><div><small>EVENT STREAM</small><b><Activity size={13}/> Monitoring</b></div><div><small>NETWORK</small><b><Network size={13}/> IP activity</b></div></div></div>
                  <div className="cyber-alert"><LockKeyhole size={13}/> ANOMALY CLASSIFICATION <strong>Threat signal</strong></div>
                </div> : <><div className="preview-mark">{p.id==='lms'?'LMS':'RKS'}<span>.SYS</span></div><span className="preview-label">{p.name}</span></>}
              </div>
              <h3>{p.name}</h3>
              <p className="tagline">{p.tagline}</p>
              <p>{p.description}</p>
              <h4>Problem</h4><p>{p.problem}</p>
              <h4>Solution</h4><p>{p.solution}</p>
              <h4>Key features</h4>
              <ul className="features">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              {p.id === 'cybershield' && <div className="architecture">
                <h4>Detection pipeline</h4><div className="arch-flow">{['Login events','Flask API','Isolation Forest','Anomaly result','Threat alert','Dashboard'].map((step,i)=><span key={step}>{step}{i<5&&<b>→</b>}</span>)}</div>
                <p className="muted small">Conceptual flow based on the current project implementation. Dashboard preview is illustrative, not live telemetry.</p>
              </div>}
              <div className="chips">{p.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              <div className="cta">
                {p.github && <a className="btn ghost" href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
                {p.demo && <a className="btn primary" href={p.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14} /></a>}
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="pager">
            <button onClick={() => go(-1)} aria-label="Previous project"><ChevronLeft size={18} /></button>
            <button onClick={() => go(1)} aria-label="Next project"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
