import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  github: string;
  liveDemo?: string; // Optional
  category: string;
  visualType: 'map' | 'rag' | 'ecg' | 'chat' | 'health';
  award?: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'ROOTSnROUTES',
      description: 'AI-powered travel planning & route optimization platform',
      longDescription: 'A smart travel companion that revolutionizes trip planning using Dijkstra\'s algorithm for efficient route optimization. Features real-time traffic updates, weather integration, and personalized travel recommendations to create the perfect itinerary.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'Dijkstra Algorithm', 'Express'],
      github: 'https://github.com/Yash-Raj-2403/ROOTSnROUTES',
      liveDemo: 'https://rootsnroutes-sigma.vercel.app/',
      category: 'Full-Stack',
      visualType: 'map',
    },
    {
      id: 2,
      title: 'Fixora',
      description: 'RAG-powered automated email response system',
      longDescription: 'An intelligent email assistant leveraging Retrieval-Augmented Generation (RAG) to draft context-aware replies. It reduces manual effort by analyzing incoming emails and generating accurate responses based on your custom document knowledge base.',
      techStack: ['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'OpenAI API', 'React'],
      github: 'https://github.com/Yash-Raj-2403/Fixora.git',
      liveDemo: 'https://fixor-theta.vercel.app/',
      category: 'AI/ML',
      visualType: 'rag',
    },
    {
      id: 3,
      title: 'RhythmIQ',
      description: 'Medical AI for real-time arrhythmia detection',
      longDescription: 'Advanced medical AI system that classifies 6 types of heart arrhythmias from ECG images with 94% accuracy. Built with a microservices architecture using Spring Boot for the web app and a Flask-based CNN model for real-time inference.',
      techStack: ['Spring Boot', 'Python', 'TensorFlow', 'OpenCV', 'Deep Learning', 'Flask'],
      github: 'https://github.com/Yash-Raj-2403/RhythmIQ',
      category: 'AI/ML',
      visualType: 'ecg',
    },
    {
      id: 4,
      title: 'Kidera',
      description: 'Gamified holistic child development platform',
      longDescription: 'An interactive platform fostering holistic growth in children through gamified learning modules. Features comprehensive progress tracking for parents and educators, aiming to make early childhood development engaging and measurable.',
      techStack: ['React', 'Node.js', 'Redux', 'MongoDB', 'Tailwind CSS'],
      github: 'https://github.com/Yash-Raj-2403/Kidera.git',
      liveDemo: 'https://kidera.in',
      category: 'Full-Stack',
      visualType: 'health',
    },
    {
      id: 5,
      title: 'Why Not',
      description: 'AI-powered career intelligence & rejection analysis',
      longDescription: 'A next-gen career platform helping students navigate placements. Features AI-powered rejection analysis to provide actionable feedback, resume intelligence scoring, and "Application Snapshots" to freeze profiles at the time of application.',
      techStack: ['React', 'Firebase', 'Google Gemini AI', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/Yash-Raj-2403/Why-Not.git',
      liveDemo: 'https://why-not-teal.vercel.app/',
      category: 'Web App',
      visualType: 'chat',
    },
    {
      id: 6,
      title: 'MentiSphere',
      description: 'Professional mentorship connecting talent & experts',
      longDescription: 'A dedicated platform streamlining the mentorship process. Connects mentees with industry experts via smart matching, featuring integrated video scheduling, goal tracking, and resource sharing to accelerate professional growth.',
      techStack: ['React', 'Firebase', 'WebRTC', 'Node.js', 'Express'],
      github: 'https://github.com/Yash-Raj-2403/MentiSphere.git',
      liveDemo: 'https://menti-sphere.vercel.app/',
      category: 'EdTech',
      visualType: 'rag', // Reusing rag visualization for connectivity/network feel
    },
    {
      id: 7,
      title: 'MediConnect',
      description: 'AI-driven healthcare ecosystem for patients & doctors',
      longDescription: 'A comprehensive healthcare platform integrating the "Aura" AI health assistant. Features smart doctor discovery, symptom analysis, secure telemedicine consultations, and automated medication reminders in a modern, secure environment.',
      techStack: ['React', 'Supabase', 'Groq AI', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/Yash-Raj-2403/MediConnect.git',
      liveDemo: 'https://mediconnect-drab.vercel.app/',
      category: 'HealthTech',
      visualType: 'health',
    },
    {
      id: 8,
      title: 'Codica',
      description: 'Chrome extension to sync CodeChef submissions to GitHub',
      longDescription: 'A powerful browser extension that streamlines your competitive programming workflow. It automatically pushes successful CodeChef submissions to your GitHub repository, organizes code by problem, and visualizes your coding activity and statistics in a unified dashboard.',
      techStack: ['JavaScript', 'HTML5/CSS3', 'Chrome API', 'GitHub REST API', 'Chart.js'],
      github: 'https://github.com/Yash-Raj-2403/Codica-CodeChef_Extension.git',
      category: 'DevTool',
      visualType: 'rag',
    }
  ];

  const renderVisual = (type: string) => {
     switch (type) {
      case 'map':
        return (
          <svg className="w-full h-48 bg-dark-800" viewBox="0 0 200 100">
            <motion.path
              d="M20,80 Q60,20 100,50 T180,30"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f6ff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            {[20, 100, 180].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={i === 1 ? 50 : i === 0 ? 80 : 30}
                r="4"
                fill="#00ff88"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </svg>
        );
      case 'rag':
        return (
          <svg className="w-full h-48 bg-dark-800" viewBox="0 0 200 100">
            {[30, 60, 90, 120, 150].map((x, i) => (
              <motion.rect
                key={i}
                x={x}
                y={30 + i * 5}
                width="20"
                height="40"
                fill={`rgba(0, 246, 255, ${0.3 + i * 0.15})`}
                animate={{ height: [40, 50, 40], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
             <motion.path
              d="M30,80 L170,80"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="5,5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        );
      case 'ecg':
        return (
          <svg className="w-full h-48 bg-dark-800" viewBox="0 0 200 100">
             <motion.path
              d="M0,50 L20,50 L30,20 L40,80 L50,50 L70,50 L80,20 L90,80 L100,50 L120,50"
              fill="none"
              stroke="#ff0055"
              strokeWidth="2"
              initial={{ pathLength: 0, x: -100 }}
              animate={{ pathLength: 1, x: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
             <line x1="0" y1="50" x2="200" y2="50" stroke="#333" strokeWidth="1" />
             <line x1="0" y1="20" x2="200" y2="20" stroke="#333" strokeWidth="0.5" strokeDasharray="2" />
             <line x1="0" y1="80" x2="200" y2="80" stroke="#333" strokeWidth="0.5" strokeDasharray="2" />
          </svg>
        );
      case 'health':
        return (
          <svg className="w-full h-48 bg-dark-800" viewBox="0 0 200 100">
             <motion.path
               d="M100 30 C 80 10, 50 30, 50 60 C 50 80, 100 90, 100 90 C 100 90, 150 80, 150 60 C 150 30, 120 10, 100 30"
               fill="none"
               stroke="#ff0055"
               strokeWidth="3"
               initial={{ pathLength: 0, scale: 0.8 }}
               animate={{ pathLength: 1, scale: [1, 1.1, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.rect
               x="90" y="45" width="20" height="6" fill="#fff"
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
             <motion.rect
               x="97" y="38" width="6" height="20" fill="#fff"
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
          </svg>
        );
      case 'chat':
        return (
          <svg className="w-full h-48 bg-dark-800" viewBox="0 0 200 100">
             <motion.rect
               x="40" y="30" width="80" height="40" rx="10"
               fill="#333" stroke="#00f6ff" strokeWidth="1"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
             />
             <motion.rect
               x="80" y="50" width="80" height="40" rx="10"
               fill="#00f6ff" opacity="0.2"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 0.2, y: 0 }}
               transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
             />
             <circle cx="60" cy="50" r="3" fill="#fff" />
             <circle cx="70" cy="50" r="3" fill="#fff" />
             <circle cx="80" cy="50" r="3" fill="#fff" />
          </svg>
        );
      default:
        return <div className="w-full h-48 bg-dark-800" />;
    }
  };


  return (
    <section id="projects" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-purple glow-text">{'<'}</span>
            <span className="text-white">Featured Projects</span>
            <span className="text-neon-purple glow-text">{' />'}</span>
          </h2>
          <p className="text-gray-400 text-lg">Building innovative solutions</p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full"
            >
              <motion.div
                className="glass-effect rounded-xl overflow-hidden cursor-pointer h-full flex flex-col border border-white/5 hover:border-neon-cyan/50 transition-all duration-300"
                whileHover={{ y: -10 }}
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                {/* Visual Preview Header */}
                <div className="bg-dark-900/50 border-b border-white/5 relative overflow-hidden group-hover:border-neon-cyan/20 transition-colors">
                  {renderVisual(project.visualType)}
                   <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs text-neon-cyan">
                      {project.category}
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {project.award && (
                    <div className="flex items-center gap-2 text-yellow-400 text-xs mb-3 font-bold uppercase tracking-wide">
                      <span>🏆</span> {project.award}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-dark-700 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                     <a 
                       href={project.github} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
                       onClick={(e) => e.stopPropagation()}
                     >
                       <span>GitHub</span>
                     </a>
                     {project.liveDemo ? (
                        <a 
                          href={project.liveDemo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                           className="flex items-center justify-center gap-2 py-2 rounded-lg bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan text-sm font-medium transition-colors border border-neon-cyan/20"
                           onClick={(e) => e.stopPropagation()}
                        >
                          <span>Live Demo</span>
                        </a>
                     ) : (
                        <button disabled className="cursor-not-allowed opacity-50 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-sm font-medium">
                           <span>Demo N/A</span>
                        </button>
                     )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Expanded View Modal (Optional Enhancement) */}
        <AnimatePresence>
          {expandedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
              onClick={() => setExpandedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-800 border border-neon-cyan/30 rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                   className="absolute top-4 right-4 text-gray-400 hover:text-white"
                   onClick={() => setExpandedProject(null)}
                >
                  ✕
                </button>
                
                {(() => {
                  const project = projects.find(p => p.id === expandedProject);
                  if (!project) return null;
                  return (
                    <div>
                      <h3 className="text-3xl font-bold text-neon-cyan mb-4">{project.title}</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {project.longDescription}
                      </p>
                      <h4 className="text-neon-purple font-bold mb-2">Key Technologies:</h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                         {project.techStack.map(tech => (
                           <span key={tech} className="px-3 py-1 bg-dark-900 rounded-full text-sm text-neon-green border border-neon-green/20">
                             {tech}
                           </span>
                         ))}
                      </div>
                      <div className="flex gap-4">
                         <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2 rounded-lg bg-neon-cyan text-dark-900 font-bold hover:bg-white transition-colors">
                           View Code
                         </a>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
