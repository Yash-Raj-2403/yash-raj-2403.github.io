import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TechItem {
  name: string;
  category: string;
  color: string;
}

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const technologies: TechItem[] = [
    // Languages
    { name: 'C', category: 'Languages', color: 'from-blue-500 to-blue-700' },
    { name: 'C++', category: 'Languages', color: 'from-blue-600 to-purple-600' },
    { name: 'Java', category: 'Languages', color: 'from-red-500 to-orange-500' },
    { name: 'Python', category: 'Languages', color: 'from-yellow-400 to-blue-500' },
    
    // Web
    { name: 'HTML', category: 'Web', color: 'from-orange-500 to-red-500' },
    { name: 'CSS', category: 'Web', color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', category: 'Web', color: 'from-yellow-300 to-yellow-500' },
    { name: 'TypeScript', category: 'Web', color: 'from-blue-500 to-blue-700' },
    { name: 'React', category: 'Web', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', category: 'Web', color: 'from-green-500 to-green-700' },

    // Databases
    { name: 'MySQL', category: 'Databases', color: 'from-blue-400 to-orange-400' },
    { name: 'MongoDB', category: 'Databases', color: 'from-green-500 to-green-700' },
    { name: 'PostgreSQL', category: 'Databases', color: 'from-blue-600 to-blue-800' },
    
    // ML/Data Science
    { name: 'Pandas', category: 'ML & Data', color: 'from-purple-400 to-blue-500' },
    { name: 'NumPy', category: 'ML & Data', color: 'from-blue-400 to-cyan-500' },
    { name: 'Matplotlib', category: 'ML & Data', color: 'from-orange-400 to-red-500' },
    { name: 'scikit-learn', category: 'ML & Data', color: 'from-orange-500 to-yellow-500' },
    
    // Tools
    { name: 'Git', category: 'Tools', color: 'from-orange-600 to-red-600' },
    { name: 'Linux', category: 'Tools', color: 'from-yellow-500 to-yellow-600' },
  ];

  const categories = ['Languages', 'Web', 'Databases', 'ML & Data', 'Tools'];

  return (
    <section id="tech-stack" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan glow-text">{'<'}</span>
            <span className="text-white">Tech Stack</span>
            <span className="text-neon-cyan glow-text">{' />'}</span>
          </h2>
          <p className="text-gray-400 text-lg">My Digital Toolkit</p>
        </motion.div>

        <div ref={ref} className="space-y-16">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 30 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                 <h3 className="text-2xl font-bold text-white">
                  {category}
                </h3>
                <div className="h-[1px] bg-dark-700 flex-grow"></div>
              </div>
             
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {technologies
                  .filter((tech) => tech.category === category)
                  .map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative"
                    >
                      <div className="glass-effect p-4 rounded-xl text-center cursor-default transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,246,255,0.1)] h-full flex flex-col justify-center items-center">
                        {/* Icon Placeholder (Simulated with text) */}
                        <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center bg-dark-900 border border-dark-700 group-hover:border-neon-cyan/50 transition-colors`}>
                             <span className={`text-lg font-bold bg-gradient-to-br ${tech.color} bg-clip-text text-transparent`}>
                                {tech.name.substring(0, 1)}
                             </span>
                        </div>
                        
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          {tech.name}
                        </p>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className={`absolute inset-0 rounded-xl blur-xl bg-gradient-to-br ${tech.color} opacity-10`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
