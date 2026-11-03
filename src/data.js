// Edit this file to update your content. Empty link values are hidden automatically.

export const profile = {
  name: 'Rajkumar K S',
  title: 'Aspiring Software Developer | Full Stack Developer',
  status: 'Learning and building in public',
  intro: 'I am a Computer Science Engineering student and aspiring software developer who enjoys turning ideas into practical, well-built applications.',
  about:
    'I am pursuing a B.E. in Computer Science and Engineering. I enjoy building practical applications, solving problems, and exploring modern technologies. My learning journey is hands-on: I build projects, study the tools I do not know yet, and keep improving. My goal is to become a skilled software engineer and contribute to impactful software products.',
  objective:
    'I aim to become a skilled software engineer and contribute to impactful software products.',
  interests: ['Software Developer', 'Full Stack Developer', 'Problem Solver', 'AI & Cybersecurity Enthusiast'],
  // Replace these placeholders with your real details.
  links: { email: 'rajkumarsaravanannn@gmail.com', github: 'https://github.com/Rajkumar-hub28', linkedin: 'https://www.linkedin.com/in/rajkumar-saravanan/' },
  // Optional form backend endpoint (e.g. a Formspree URL). Empty means the form reports it is not connected.
  contactEndpoint: '8903602562',
};

export const education = {
  degree: 'B.E. Computer Science and Engineering',
  college: 'C. Abdul Hakeem College of Engineering and Technology',
  university: 'Anna University',
  period: '2024 – Present',
};

// status: 'using' = currently use, 'learning' = currently learning
export const skills = [
  { category: 'Frontend', items: [['HTML', 'using'], ['CSS', 'using'], ['JavaScript', 'using'], ['React.js', 'learning'], ['Redux', 'learning']] },
  { category: 'Backend', items: [['Python', 'using'], ['Node.js', 'learning'], ['Express.js', 'learning']] },
  { category: 'Database', items: [['SQL', 'using'], ['MongoDB', 'learning']] },
  { category: 'Tools', items: [['Git', 'using'], ['GitHub', 'using']] },
  { category: 'Programming & Problem Solving', items: [['C++', 'using']] },
];

export const projects = [
  {
    id: 'cybershield',
    name: 'CyberShield AI',
    theme: 'cyber',
    tagline: 'AI-powered threat detection for login activity',
    description: 'An AI-powered cyberthreat detection system that identifies suspicious login activity and unusual behavior.',
    problem: 'Suspicious login attempts and unusual account behavior are hard to spot by manually reviewing raw event logs.',
    solution: 'A Flask application that monitors login events, uses an Isolation Forest model to flag anomalous activity, and presents it on a security dashboard.',
    features: ['Login event monitoring', 'Anomaly detection with Isolation Forest', 'IP-based monitoring', 'Threat alerts', 'Interactive security dashboard'],
    tech: ['Python', 'Flask', 'Scikit-learn', 'Isolation Forest', 'HTML', 'CSS', 'JavaScript'],
    github: '',
    demo: '',
  },
  {
    id: 'lms',
    name: 'Learning Management System',
    theme: 'lms',
    tagline: 'A centralized college learning platform',
    description: 'A College Learning Management System designed to organize academic activities and provide a centralized digital learning platform.',
    problem: 'Academic activities and learning resources are often spread across different channels.',
    solution: 'A web platform built with React and Node.js that brings academic activities together in one place.',
    features: ['Centralized academic activities', 'Digital learning access in one place', 'Modern, responsive interface'],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: '',
    demo: '',
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    theme: 'portfolio',
    tagline: 'This site: a futuristic developer portfolio',
    description: 'A responsive developer portfolio showcasing my skills, projects, education, and development journey.',
    problem: 'A student developer needs a clear, honest way to present skills, projects, and learning progress.',
    solution: 'A React application with a 3D-inspired interactive orb, a working developer terminal, and a cinematic project showcase.',
    features: ['Interactive developer orb', 'Working developer terminal', 'Animated project showcase', 'Responsive and keyboard-friendly'],
    tech: ['React', 'JavaScript', 'CSS', 'Framer Motion'],
    github: '',
    demo: '',
  },
];

// Add only verified achievements or certifications here: { title, issuer, year }
export const achievements = [];
