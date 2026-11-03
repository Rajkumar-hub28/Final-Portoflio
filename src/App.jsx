import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education, { Achievements } from './components/Education';
import Contact from './components/Contact';
import { profile } from './data';

const commands = [
  ['Home', '#home'], ['About', '#about'], ['Skills', '#skills'],
  ['Projects', '#projects'], ['Education', '#education'], ['Contact', '#contact'],
];

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(v => !v); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  const filtered = commands.filter(([label]) => label.toLowerCase().includes(query.toLowerCase()));
  return <>
    <button className="palette-trigger" onClick={() => setOpen(true)} aria-label="Open command palette"><Command size={15}/> <span>Quick jump</span><kbd>⌘ K</kbd></button>
    <AnimatePresence>
      {open && <motion.div className="palette-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e)=>{if(e.target===e.currentTarget)setOpen(false);}}>
        <motion.div className="palette glass" role="dialog" aria-modal="true" aria-label="Quick navigation" initial={{opacity:0,y:18,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12}}>
          <input autoFocus placeholder="Where do you want to go?" value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&filtered[0]){document.querySelector(filtered[0][1])?.scrollIntoView({behavior:'smooth'});setOpen(false);setQuery('');}}}/>
          {filtered.map(([label,href])=><button key={href} onClick={()=>{document.querySelector(href)?.scrollIntoView({behavior:'smooth'});setOpen(false);setQuery('');}}>{label}<ArrowUpRight size={15}/></button>)}
          <p>Navigate with a section name · Esc to close</p>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setLoaded(true)); return () => cancelAnimationFrame(t); }, []);
  return <>
    <AnimatePresence>{!loaded && <motion.div className="loader" exit={{opacity:0}}><span>RKS<span className="grad">.dev</span></span><i/></motion.div>}</AnimatePresence>
    <a className="skip" href="#home">Skip to content</a>
    <Navbar />
    <CommandPalette />
    <main>
      <Hero /><About /><Skills /><Projects /><Education /><Achievements /><Contact />
    </main>
    <footer className="footer container">
      <div><a className="logo" href="#home">RAJKUMAR K S<span></span></a><p>Curiosity into code. Ideas into products.</p></div>
      <div className="footer-links">
        {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>}
        {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>}
        {profile.links.email && <a href={`mailto:${profile.links.email}`} aria-label="Email"><Mail/></a>}
      </div>
      <span>© {new Date().getFullYear()} {profile.name}</span>
    </footer>
  </>;
}
