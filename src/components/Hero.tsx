import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Hi, I'm Yash Raj";
  const subtitle = "Software Developer | AI Engineer Aspirant | Full-Stack Builder";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const codeSnippets = [
    { code: 'const developer = new YashRaj();', lang: 'typescript', x: '10%', y: '20%' },
    { code: 'print("Building the future")', lang: 'python', x: '80%', y: '15%' },
    { code: 'vector<int> skills = {ML, Backend};', lang: 'cpp', x: '15%', y: '70%' },
    { code: 'await innovate();', lang: 'javascript', x: '75%', y: '65%' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,246,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,246,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating Code Snippets */}
      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-xs md:text-sm opacity-20 font-mono text-neon-cyan"
          style={{ left: snippet.x, top: snippet.y }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="text-neon-purple">// {snippet.lang}</span>
          <br />
          {snippet.code}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Typing Animation Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {displayedText}
          <motion.span
            className="inline-block w-1 h-12 md:h-16 bg-neon-cyan ml-2"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {subtitle.split(' | ').map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="text-neon-purple mx-2">|</span>}
              <span className="hover:text-neon-cyan transition-colors">{part}</span>
            </span>
          ))}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <Link
            to="/projects"
            className="group relative px-8 py-3 bg-transparent border-2 border-neon-cyan text-neon-cyan rounded-lg overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-dark-900 font-bold">
              View Projects
            </span>
          </Link>

          <a
            href="https://github.com/Yash-Raj-2403"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-lg hover:scale-105 transition-transform glow-box"
          >
            GitHub Profile
          </a>

          <a
            href="#contact"
            className="px-8 py-3 bg-dark-800 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green hover:text-dark-900 transition-all"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-neon-cyan rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
