import { useEffect, useRef, useState } from 'react';
import { profile, education, skills, projects } from '../data';
const DESC={help:'show all commands',about:'introduce myself',skills:'list technical skills',projects:'list projects',education:'show education details',contact:'show contact information',clear:'clear the terminal output'};
const OUTPUT={
 help:()=>['Available commands:',...Object.entries(DESC).map(([c,d])=>`  ${c.padEnd(10)} ${d}`)],
 about:()=>[profile.about],
 skills:()=>skills.flatMap(s=>[`${s.category}:`,`  ${s.items.map(([n,st])=>`${n} (${st==='using'?'in use':'learning'})`).join(', ')}`]),
 projects:()=>projects.map(p=>`> ${p.name}: ${p.tagline}`),
 education:()=>[education.degree,education.college,education.university,education.period],
 contact:()=>[`Email: ${profile.links.email||'not configured'}`,`GitHub: ${profile.links.github||'not configured'}`,`LinkedIn: ${profile.links.linkedin||'not configured'}`]
};
export default function Terminal(){
 const [lines,setLines]=useState([{kind:'out',text:'Welcome to the RKS developer shell.'},{kind:'out',text:'Type "help" to explore available commands.'}]);
 const [value,setValue]=useState('');const [history,setHistory]=useState([]);const [hIndex,setHIndex]=useState(-1);const bodyRef=useRef(null);const inputRef=useRef(null);
 useEffect(()=>{if(bodyRef.current)bodyRef.current.scrollTop=bodyRef.current.scrollHeight;},[lines]);
 const execute=(raw)=>{const cmd=raw.trim().toLowerCase();if(!cmd)return;setHistory(h=>[raw,...h]);setHIndex(-1);if(cmd==='clear'){setLines([]);return;}const out=Object.hasOwn(OUTPUT,cmd)?OUTPUT[cmd]():[`command not found: ${cmd}. Type "help" to see commands.`];setLines(l=>[...l,{kind:'cmd',text:raw},...out.map(text=>({kind:'out',text}))]);};
 const submit=e=>{e.preventDefault();execute(value);setValue('');};
 const key=e=>{if(e.key==='ArrowUp'&&history.length){e.preventDefault();const n=Math.min(hIndex+1,history.length-1);setHIndex(n);setValue(history[n]);}else if(e.key==='ArrowDown'){e.preventDefault();const n=Math.max(hIndex-1,-1);setHIndex(n);setValue(n<0?'':history[n]);}};
 return <div className="terminal glass" role="region" aria-label="Interactive developer terminal">
  <div className="term-bar"><span className="tdot r"/><span className="tdot y"/><span className="tdot g"/><span className="term-title">rajkumar@rks.dev — zsh</span><span className="term-live">INTERACTIVE</span></div>
  <div className="term-body" ref={bodyRef} onClick={()=>inputRef.current?.focus()}>
   {lines.map((l,i)=><div key={i} className={`line ${l.kind}`}>{l.kind==='cmd'&&<span className="prompt">❯ </span>}{l.text}</div>)}
   <form onSubmit={submit} className="term-form"><label htmlFor="term-input" className="prompt">❯</label><input ref={inputRef} id="term-input" value={value} onChange={e=>setValue(e.target.value)} onKeyDown={key} autoComplete="off" spellCheck="false" aria-label="Terminal command"/><span className="terminal-cursor"/></form>
  </div>
  <div className="term-quick">{Object.keys(DESC).map(c=><button key={c} type="button" onClick={()=>{execute(c);inputRef.current?.focus();}}>{c}</button>)}</div>
 </div>;
}
