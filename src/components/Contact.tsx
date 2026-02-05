import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Initialize particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      url: 'https://github.com/Yash-Raj-2403',
      color: 'hover:text-neon-cyan',
      text: 'Follow on GitHub'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: 'https://www.linkedin.com/in/yash-2403-raj/',
      color: 'hover:text-neon-purple',
      text: 'Connect on LinkedIn'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      url: 'mailto:yashraj24007@gmail.com',
      color: 'hover:text-neon-green',
      text: 'yashraj24007@gmail.com'
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 md:px-8 lg:px-16 min-h-screen flex items-center justify-center overflow-hidden bg-dark-800/30"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 50 - distance) / 50;

          return (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-30"
              animate={{
                left: `${particle.x + dx * force * 0.5}%`,
                top: `${particle.y + dy * force * 0.5}%`,
              }}
              transition={{ type: 'spring', damping: 20 }}
            />
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-neon-pink glow-text">{'<'}</span>
            <span className="text-white">Let's Connect</span>
            <span className="text-neon-pink glow-text">{' />'}</span>
          </h2>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Open to opportunities and collaboration!
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {socialLinks.map((link, index) => (
             <motion.a
               key={link.name}
               href={link.url}
               target="_blank"
               rel="noopener noreferrer"
               initial={{ opacity: 0, y: 30 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.3 + index * 0.1 }}
               whileHover={{ y: -10 }}
               className="group relative"
             >
                <div className="glass-effect p-8 rounded-xl h-full flex flex-col items-center justify-center gap-4 border border-white/5 hover:border-white/20 transition-all duration-300 bg-dark-900/40">
                   <div className={`p-4 rounded-full bg-dark-800 group-hover:bg-dark-700 transition-colors ${link.color}`}>
                      {link.icon}
                   </div>
                   <h3 className="text-xl font-bold text-white">{link.name}</h3>
                   <p className="text-sm text-gray-400 group-hover:text-neon-cyan transition-colors">{link.text}</p>
                   
                   {/* Hover Glow */}
                   <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 rounded-xl blur-xl bg-gradient-to-b from-transparent via-transparent to-${link.color.split(':')[1]?.replace('text-', '')}/20`} />
                   </div>
                </div>
             </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
