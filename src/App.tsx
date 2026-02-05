import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Contact from './components/Contact';
import CursorGlow from './components/CursorGlow';
import Header from './components/Header';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <Header />

      {/* Cursor Glow Effect */}
      <CursorGlow />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-dark-900 -z-10" />
      <div className="fixed inset-0 bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent -z-10" />
      
      {/* Main Content */}
      <main className="relative pt-20">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-neon-cyan/20 py-8 text-center">
        <p className="text-gray-400">
          <span className="text-neon-cyan">{'<'}</span>
          Built with React, TypeScript, Tailwind & Framer Motion
          <span className="text-neon-cyan">{' />'}</span>
        </p>
        <p className="text-gray-500 text-sm mt-2">
          © 2026 Yash Raj. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

