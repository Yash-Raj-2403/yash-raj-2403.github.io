import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const AnimatedCounter = ({ value }: { value: number }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const GitHubStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Data - ideally this would come from an API, but for now we set realistic manual values
  // or use the static values as "snapshots"
  const stats = {
    repos: 42,
    commits: 1240,
    stars: 156,
    contributions: 487,
  };

  const languages = [
    { name: 'Python', percentage: 35, color: '#3776ab' },
    { name: 'JavaScript', percentage: 25, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 20, color: '#3178c6' },
    { name: 'Java', percentage: 12, color: '#f89820' },
    { name: 'C++', percentage: 8, color: '#00599c' },
  ];

  return (
    <section id="github-stats" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-800/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-green glow-text">{'<'}</span>
            <span className="text-white">GitHub Stats</span>
            <span className="text-neon-green glow-text">{' />'}</span>
          </h2>
          <p className="text-gray-400 text-lg">Contributions & Activity</p>
        </motion.div>

        <div ref={ref} className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Repositories', value: stats.repos, icon: '📦', color: 'text-neon-cyan' },
              { label: 'Total Commits', value: stats.commits, icon: '💻', color: 'text-neon-purple' },
              { label: 'Stars Earned', value: stats.stars, icon: '⭐', color: 'text-neon-green' },
              { label: 'Contributions', value: stats.contributions, icon: '🔥', color: 'text-neon-pink' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-lg text-center group hover:border-neon-cyan transition-all"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Contribution Graph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-effect p-6 rounded-lg overflow-hidden text-center"
          >
            <h3 className="text-xl font-bold text-neon-cyan mb-6 text-left">
              <span className="text-neon-green">// </span>
              Contribution Activity
            </h3>
            
            <a href="https://github.com/Yash-Raj-2403" target="_blank" rel="noopener noreferrer" className="block w-full overflow-x-auto">
               <img 
                 src="https://ghchart.rshah.org/00f6ff/Yash-Raj-2403" 
                 alt="Yash Raj's Github Chart" 
                 className="min-w-[600px] w-full"
               />
            </a>
            
            <p className="mt-4 text-gray-500 text-sm">
              * Live data from GitHub
            </p>
          </motion.div>

          {/* Language Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="glass-effect p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-neon-purple mb-6">
              <span className="text-neon-green">// </span>
              Most Used Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300 flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </span>
                    <span className="text-neon-cyan">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
