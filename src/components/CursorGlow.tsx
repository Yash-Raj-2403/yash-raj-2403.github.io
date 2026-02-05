import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-96 h-96 rounded-full pointer-events-none mix-blend-screen z-50"
      style={{
        background: 'radial-gradient(circle, rgba(0,246,255,0.08) 0%, transparent 70%)',
        left: mousePos.x,
        top: mousePos.y,
        transform: 'translate(-50%, -50%)',
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    />
  );
};

export default CursorGlow;
