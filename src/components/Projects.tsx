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
      longDescription: 'A comprehensive travel companion app that revolutionizes trip planning. It uses Dijkstra\'s algorithm to calculate the most efficient routes between multiple destinations, considering factors like distance and estimated time. The platform also offers real-time suggestions for local attractions and calculates estimated travel costs.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'Dijkstra Algorithm', 'Express'],
      github: 'https://github.com/Yash-Raj-2403/ROOTSnROUTES',
      category: 'Full-Stack',
      visualType: 'map',
    },
    {
      id: 2,
      title: 'Fixora',
      description: 'Intelligent RAG-based AI assistant',
      longDescription: 'Fixora is a sophisticated chatbot built using Retrieval-Augmented Generation (RAG). It leverages LangChain and vector databases to provide context-aware responses based on custom document knowledge bases. This allows for highly accurate information retrieval from uploaded manuals, docs, or textbooks.',
      techStack: ['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'OpenAI API', 'React'],
      github: 'https://github.com/Yash-Raj-2403/Fixora',
      category: 'AI/ML',
      visualType: 'rag',
    },
    {
      id: 3,
      title: 'RhythmIQ',
      description: 'ECG Analysis & Arrhythmia Detection',
      longDescription: 'A medical AI system designed to assist cardiologists. It uses deep convolution neural networks (CNNs) to analyze ECG images and classify heartbeats with 94% accuracy. The model was trained on the MIT-BIH Arrhythmia Database and supports real-time image upload and analysis.',
      techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Flask'],
      github: 'https://github.com/Yash-Raj-2403/RhythmIQ',
      category: 'AI/ML',
      visualType: 'ecg',
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
