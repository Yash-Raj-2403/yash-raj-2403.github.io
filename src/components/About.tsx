import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-bold mb-4">
               <span className="text-neon-purple glow-text">{'<'}</span>
               <span className="text-white">About Me</span>
               <span className="text-neon-purple glow-text">{' />'}</span>
             </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Code-style Bio */}
            <motion.div 
              variants={itemVariants} 
              className="code-block h-full bg-dark-800/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-neon-cyan/50 transition-all duration-300 shadow-lg shadow-black/50"
              whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 255, 242, 0.1)" }}
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
                </div>
                <div className="text-xs text-gray-500 font-mono">developer_profile.ts</div>
                <div className="w-12" /> {/* Spacer for centering */}
              </div>

              <div className="p-6 font-mono text-sm leading-relaxed relative grid grid-cols-[auto_1fr] gap-4">
                {/* Line Numbers */}
                <div className="text-right text-gray-600 select-none border-r border-white/10 pr-4 space-y-1 font-mono text-xs md:text-sm">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Code Content */}
                <div className="space-y-1 text-gray-300">
                  <p>
                    <span className="text-neon-cyan font-bold">const</span>{' '}
                    <span className="text-neon-green">yashRaj</span> ={' '}
                    <span className="text-yellow-400">{'{'}</span>
                  </p>
                  
                  <div className="pl-4 space-y-1">
                    <p>
                      <span className="text-neon-purple">role:</span>{' '}
                      <span className="text-green-400">"Still Thinking..."</span>,
                    </p>
                    <p>
                      <span className="text-neon-purple">location:</span>{' '}
                      <span className="text-green-400">"India"</span>,
                    </p>
                     <p>
                      <span className="text-neon-purple">education:</span>{' '}
                      <span className="text-yellow-400">{'{'}</span>
                    </p>
                    <div className="pl-4 space-y-1">
                       <p>
                        <span className="text-neon-purple">degree:</span>{' '}
                        <span className="text-green-400">"B.Tech in CS"</span>,
                      </p>
                      <p>
                        <span className="text-neon-purple">university:</span>{' '}
                        <span className="text-green-400">"KLU Hyderabad"</span>,
                      </p>
                      <p>
                        <span className="text-neon-purple">year:</span>{' '}
                        <span className="text-orange-400">2028</span>
                      </p>
                    </div>
                     <p className="text-yellow-400">{'}'},</p>
                     
                    <p>
                      <span className="text-neon-purple">interests:</span>{' '}
                      <span className="text-yellow-400">[</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-green-400">"GenAI"</span>,{' '}
                      <span className="text-green-400">"System Design"</span>,{' '}
                      <span className="text-green-400">"Open Source"</span>
                    </p>
                    <p className="text-yellow-400">],</p>

                    <p>
                      <span className="text-neon-purple">status:</span>{' '}
                      <span className="text-green-400">"Available"</span>
                    </p>
                  </div>
                  <p>
                    <span className="text-yellow-400">{'}'};</span>
                    <motion.span 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2.5 h-4 bg-neon-cyan align-middle ml-2"
                    />
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Narrative Bio */}
            <motion.div variants={itemVariants} className="space-y-6 text-gray-300">
               <h3 className="text-2xl font-bold text-white mb-4">
                  Transforming Ideas into <span className="text-neon-cyan">Digital Reality</span>
               </h3>
               <p className="leading-relaxed">
                  I am a passionate software developer with a strong foundation in both frontend and backend technologies. My journey began with a curiosity about how things work on the web, which quickly evolved into a love for building robust applications.
               </p>
               <p className="leading-relaxed">
                  Currently, I'm diving deep into the world of <span className="text-neon-green">Artificial Intelligence and Machine Learning</span>, exploring how these technologies can be integrated into modern web applications to solve complex problems.
               </p>
               <p className="leading-relaxed">
                 My approach to development is centered around writing clean, maintainable code and designing intuitive user experiences. When I'm not coding, you can find me solving problems on LeetCode, exploring new tech stacks, or contributing to open-source projects.
               </p>
               
               {/* Soft Skills tags */}
               <div className="pt-4">
                 <h4 className="text-sm font-bold text-neon-purple mb-3 uppercase tracking-wider">Soft Skills</h4>
                 <div className="flex flex-wrap gap-2">
                   {["Problem Solving", "Team Leadership", "Communication", "Adaptability", "Time Management"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-dark-800 border border-neon-cyan/30 rounded-full text-xs text-neon-cyan">
                        {skill}
                      </span>
                   ))}
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Philosophy / Quote */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 glass-effect text-center rounded-xl"
          >
            <p className="text-xl md:text-2xl italic font-light text-white">
              <span className="text-neon-purple">"</span>
              Software is a great combination between artistry and engineering.
              <span className="text-neon-purple">"</span>
            </p>
            <p className="text-neon-cyan mt-2 text-sm font-mono">- Bill Gates</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
