import { motion } from 'framer-motion';
import { Code2, Database, Globe2, Terminal, GitBranch, Braces } from 'lucide-react';
import { skills } from '../data';
const icons = [Globe2,Code2,Database,GitBranch,Terminal,Braces];
export default function Skills() {
  return <section id="skills" className="section container">
    <div className="section-head"><p className="eyebrow">THE TOOLKIT</p><h2 className="section-title">Skills <span className="grad">and stack</span></h2><p className="muted">Technologies I use in practice, and tools I am actively learning. No self-rated percentages.</p></div>
    <div className="skill-grid">
      {skills.map((group,gi)=>{const Icon=icons[gi%icons.length];return <motion.div key={group.category} className="glass skill-group"
        initial={{opacity:0,y:28,rotateX:8}} whileInView={{opacity:1,y:0,rotateX:0}} viewport={{once:true,amount:.2}} transition={{delay:gi*.07,duration:.55}}>
        <div className="skill-icon"><Icon size={21}/><span>0{gi+1}</span></div><h3>{group.category}</h3>
        <div className="tiles">{group.items.map(([name,status])=><div key={name} className="tile"><span>{name}</span><span className={`badge ${status}`}>{status==='using'?'In use':'Learning'}</span></div>)}</div>
      </motion.div>})}
    </div>
    <p className="skill-footnote"><span className="legend-dot in-use"/> In use <span className="legend-dot learning-dot"/> Currently learning</p>
  </section>;
}
