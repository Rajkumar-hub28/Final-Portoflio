import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { profile } from '../data';

const roles = profile.interests;
const symbols = ['</>', '{ }', 'const', '01', 'function()', '=>'];
const particles = Array.from({ length: 22 }, (_, i) => ({ id:i, x:(i*47)%100, y:(i*61)%100, s:(i%3)+1, delay:(i%7)*.4 }));

function Orb() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, {stiffness:85,damping:18}), sy = useSpring(my, {stiffness:85,damping:18});
  const rotateY = useTransform(sx,[-.5,.5],[-13,13]);
  const rotateX = useTransform(sy,[-.5,.5],[10,-10]);
  useEffect(()=>{
    if(reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const move=e=>{mx.set(e.clientX/window.innerWidth-.5);my.set(e.clientY/window.innerHeight-.5);};
    window.addEventListener('pointermove',move,{passive:true});
    return ()=>window.removeEventListener('pointermove',move);
  },[reduce,mx,my]);
  return <div className="orb-stage" aria-label="Decorative interactive-style 3D holographic orb">
    <motion.div className="orb-wrap" style={{rotateX:reduce?0:rotateX,rotateY:reduce?0:rotateY}} animate={reduce?{}:{y:[0,-10,0]}} transition={{duration:8,repeat:Infinity,ease:'easeInOut'}}>
      <div className="orb-aura"/><div className="orb-core"><div className="orb-shine"/></div>
      <div className="orb-ring ring-a"/><div className="orb-ring ring-b"/><div className="orb-ring ring-c"/>
      <div className="orb-inner-grid"/>
      {particles.map(pt=><i key={pt.id} className="orb-particle" style={{left:`${pt.x}%`,top:`${pt.y}%`,width:pt.s*2,height:pt.s*2,animationDelay:`${pt.delay}s`}}/>)}
      {symbols.map((s,i)=><motion.span key={s} className={`float-symbol symbol-${i}`} animate={reduce?{}:{y:[0,-12,0],rotateZ:[-3,3,-3]}} transition={{duration:4+i*.5,repeat:Infinity,ease:'easeInOut'}}>{s}</motion.span>)}
      <div className="orb-center-mark">R<span>K</span>S</div>
    </motion.div>
    <div className="orb-caption"><span className="pulse-dot"/> DIGITAL CRAFT / 001</div>
  </div>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [i,setI] = useState(0);
  useEffect(()=>{if(reduce)return;const t=setInterval(()=>setI(v=>(v+1)%roles.length),2600);return()=>clearInterval(t);},[reduce]);
  const fade=(delay=0)=>({initial:{opacity:0,y:22},animate:{opacity:1,y:0},transition:{duration:.7,delay,ease:[.22,1,.36,1]}});
  return <section id="home" className="hero container">
    <div className="hero-copy">
      <motion.span className="status" {...fade()}><i className="dot"/> {profile.status}</motion.span>
      <motion.p className="eyebrow" {...fade(.08)}>COMPUTER SCIENCE · DEVELOPER IN PROGRESS</motion.p>
      <motion.h1 {...fade(.16)}>Building Digital<br/><span className="grad">Experiences</span><br/>Through Code<span className="cyan-dot">.</span></motion.h1>
      <motion.p className="intro" {...fade(.24)}>{profile.intro}</motion.p>
      <motion.div className="role-line" {...fade(.32)}><span className="focus-label">CURRENT FOCUS</span><AnimatePresence mode="wait"><motion.strong key={roles[i]} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.25}}>{roles[i]}</motion.strong></AnimatePresence></motion.div>
      <motion.div className="cta" {...fade(.4)}>
        <a className="btn primary" href="#projects">Explore my work <ArrowUpRight size={17}/></a>
        <a className="btn ghost" href="#contact">Let's connect</a>
      </motion.div>
      <motion.div className="hero-bottom" {...fade(.48)}>
        <div className="hero-socials">
          {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>}
          {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a>}
        </div>
        <a href="#about" className="scroll-cue">SCROLL TO EXPLORE <ArrowDown size={14}/></a>
      </motion.div>
    </div>
    <Orb/>
    <div className="hero-index">01 <span/> 06</div>
  </section>;
}
