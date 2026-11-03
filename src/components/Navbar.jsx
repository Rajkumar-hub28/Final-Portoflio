import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const items = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['projects', 'Projects'], ['education', 'Education'], ['contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <nav className="nav-inner" aria-label="Main">
        <a href="#home" className="logo">RKS<span>.dev</span></a>
        <ul id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
          {items.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'active' : ''}
                aria-current={active === id ? 'true' : undefined} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav-links"
          aria-label="Toggle navigation menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}
