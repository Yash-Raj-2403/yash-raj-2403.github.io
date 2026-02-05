import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface Platform {
  name: string;
  logo: string;
  url: string;
  color: string;
  stats: string;
  desc: string;
  loading?: boolean;
}

interface PlatformStats {
  leetcode: { solved: number; loading: boolean };
  codechef: { rating: number; stars: number; loading: boolean };
  codeforces: { rating: number; rank: string; loading: boolean };
  hackerrank: { badges: string; loading: boolean };
}

const Platforms = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [stats, setStats] = useState<PlatformStats>({
    leetcode: { solved: 0, loading: true },
    codechef: { rating: 0, stars: 0, loading: true },
    codeforces: { rating: 0, rank: '', loading: true },
    hackerrank: { badges: '', loading: true },
  });

  // Fetch LeetCode stats
  const fetchLeetCodeStats = async () => {
    try {
      const response = await fetch('https://leetcode-stats-api.herokuapp.com/yashraj_2403');
      const data = await response.json();
      if (data.status === 'success') {
        setStats(prev => ({
          ...prev,
          leetcode: { solved: data.totalSolved, loading: false }
        }));
      }
    } catch (error) {
      console.error('LeetCode fetch error:', error);
      setStats(prev => ({ ...prev, leetcode: { solved: 500, loading: false } }));
    }
  };

  // Fetch CodeChef stats by parsing the profile page
  const fetchCodeChefStats = async () => {
    try {
      // Use a CORS proxy to fetch CodeChef profile
      const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.codechef.com/users/yashraj_2403'));
      const html = await response.text();
      
      // Extract rating from the page's JSON data
      const ratingMatch = html.match(/"rating":"(\d+)"/g);
      if (ratingMatch && ratingMatch.length > 0) {
        // Get the last (most recent) rating
        const lastRating = ratingMatch[ratingMatch.length - 1];
        const rating = parseInt(lastRating.match(/\d+/)?.[0] || '0');
        
        // Calculate stars based on rating
        const stars = rating >= 2000 ? 5 :
                     rating >= 1800 ? 4 :
                     rating >= 1600 ? 3 :
                     rating >= 1400 ? 2 : 1;
        
        setStats(prev => ({
          ...prev,
          codechef: { rating, stars, loading: false }
        }));
        return;
      }
      throw new Error('Could not parse rating');
    } catch (error) {
      console.error('CodeChef fetch error:', error);
      // Fallback to actual known values
      setStats(prev => ({ ...prev, codechef: { rating: 1278, stars: 1, loading: false } }));
    }
  };

  // Fetch Codeforces stats
  const fetchCodeforcesStats = async () => {
    try {
      const response = await fetch('https://codeforces.com/api/user.info?handles=yashraj_2403');
      const data = await response.json();
      if (data.status === 'OK' && data.result?.[0]) {
        const user = data.result[0];
        setStats(prev => ({
          ...prev,
          codeforces: { 
            rating: user.rating || 0, 
            rank: user.rank || 'Unrated',
            loading: false 
          }
        }));
      }
    } catch (error) {
      console.error('Codeforces fetch error:', error);
      setStats(prev => ({ ...prev, codeforces: { rating: 1400, rank: 'Specialist', loading: false } }));
    }
  };

  useEffect(() => {
    fetchLeetCodeStats();
    fetchCodeChefStats();
    fetchCodeforcesStats();
    // HackerRank doesn't have a public API, keeping static
    setStats(prev => ({ ...prev, hackerrank: { badges: '5★ Problem Solving', loading: false } }));
  }, []);

  const getStarString = (stars: number) => '★'.repeat(stars);
  
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const platforms: Platform[] = [
    {
      name: 'LeetCode',
      logo: '💡',
      url: 'https://leetcode.com/u/yashraj_2403',
      color: 'from-yellow-500 to-orange-500',
      stats: stats.leetcode.loading ? 'Loading...' : `${stats.leetcode.solved}+ Problems Solved`,
      desc: 'Consistent problem solver, focusing on DSA and competitive programming.',
      loading: stats.leetcode.loading,
    },
    {
      name: 'CodeChef',
      logo: '👨‍🍳',
      url: 'https://www.codechef.com/users/yashraj_2403',
      color: 'from-orange-600 to-red-600',
      stats: stats.codechef.loading ? 'Loading...' : `${getStarString(stats.codechef.stars)} (${stats.codechef.rating}+ Rating)`,
      desc: 'Regular participant in contests, solving complex algorithmic challenges.',
      loading: stats.codechef.loading,
    },
    {
      name: 'Codeforces',
      logo: '🏆',
      url: 'https://codeforces.com/profile/yashraj_2403',
      color: 'from-blue-500 to-purple-600',
      stats: stats.codeforces.loading ? 'Loading...' : `${capitalizeFirst(stats.codeforces.rank)} (${stats.codeforces.rating})`,
      desc: 'Competing in global rounds to sharpen rapid problem-solving skills.',
      loading: stats.codeforces.loading,
    },
    {
      name: 'HackerRank',
      logo: '⚡',
      url: 'https://hackerrank.com/profile/yashraj24007',
      color: 'from-green-500 to-green-700',
      stats: stats.hackerrank.badges,
      desc: 'Mastering core CS concepts and language proficiencies.',
      loading: stats.hackerrank.loading,
    },
  ];

  return (
    <section id="platforms" className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan glow-text">{'<'}</span>
            <span className="text-white">Coding Profiles</span>
            <span className="text-neon-cyan glow-text">{' />'}</span>
          </h2>
          <p className="text-gray-400 text-lg">Where I practice & compete</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="glass-effect p-8 rounded-xl flex items-center gap-6 transition-all hover:border-neon-cyan border border-white/5 bg-dark-800/40">
                {/* Logo Area */}
                <div className="relative">
                   <div className={`absolute inset-0 blur-xl bg-gradient-to-br ${platform.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                   <div className="relative z-10 text-5xl bg-dark-900 rounded-full p-4 border border-white/10 group-hover:border-white/20 transition-colors">
                     {platform.logo}
                   </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow">
                   <h3 className={`text-2xl font-bold mb-1 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                    {platform.name}
                  </h3>
                  <div className="text-white font-bold text-lg mb-2 group-hover:text-neon-cyan transition-colors">
                     {platform.loading ? (
                       <span className="inline-flex items-center gap-2">
                         <span className="animate-pulse">Loading</span>
                         <span className="flex gap-1">
                           <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                           <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                           <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                         </span>
                       </span>
                     ) : (
                       platform.stats
                     )}
                  </div>
                  <p className="text-gray-400 text-sm">
                     {platform.desc}
                  </p>
                </div>

                {/* Link Arrow */}
                <motion.div
                  className="text-gray-500 group-hover:text-neon-cyan transition-colors"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Terminal Output */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 code-block max-w-2xl mx-auto p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-sm"
        >
          <div className="flex gap-2 mb-2">
             <div className="w-3 h-3 rounded-full bg-red-500" />
             <div className="w-3 h-3 rounded-full bg-yellow-500" />
             <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <p className="text-neon-green">
            <span className="text-neon-cyan user-select-none">$ </span>
            echo "Consistent practice leads to mastery..."
          </p>
          <motion.p
            className="text-gray-400 mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            "The only way to do great work is to love what you do."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Platforms;
