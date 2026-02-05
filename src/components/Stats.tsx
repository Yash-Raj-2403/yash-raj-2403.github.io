import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// --- Shared Components ---

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

// --- Interfaces ---

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

interface GitHubStatsData {
  repos: number;
  followers: number;
  stars: number;
  contributions: number;
}

// --- Main Component ---

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // State for GitHub Stats
  const [githubStats, setGithubStats] = useState<GitHubStatsData>({
    repos: 0,
    followers: 0,
    stars: 0,
    contributions: 0,
  });

  // State for Coding Platforms
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    leetcode: { solved: 0, loading: true },
    codechef: { rating: 0, stars: 0, loading: true },
    codeforces: { rating: 0, rank: '', loading: true },
    hackerrank: { badges: '', loading: true },
  });

  // Fetch GitHub Stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [userRes, reposRes, contribRes] = await Promise.all([
          fetch('https://api.github.com/users/Yash-Raj-2403'),
          fetch('https://api.github.com/users/Yash-Raj-2403/repos?per_page=100'),
          fetch('https://github-contributions-api.jogruber.de/v4/Yash-Raj-2403')
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const contribData = await contribRes.json();

        const starsCount = Array.isArray(reposData) 
          ? reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
          : 0;

        const totalContributions = contribData.total 
          ? Object.values(contribData.total).reduce((acc: number, val: any) => acc + val, 0)
          : 0;

        setGithubStats({
          repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          stars: starsCount,
          contributions: totalContributions,
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    fetchGitHubStats();
  }, []);

  // Fetch Platform Stats
  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/yashraj_2403');
        const data = await response.json();
        if (data.status === 'success') {
          setPlatformStats(prev => ({
            ...prev,
            leetcode: { solved: data.totalSolved, loading: false }
          }));
        }
      } catch (error) {
        console.error('LeetCode fetch error:', error);
        setPlatformStats(prev => ({ ...prev, leetcode: { solved: 500, loading: false } }));
      }
    };

    const fetchCodeChefStats = async () => {
      try {
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.codechef.com/users/yashraj_2403'));
        const html = await response.text();
        const ratingMatch = html.match(/"rating":"(\d+)"/g);
        if (ratingMatch && ratingMatch.length > 0) {
          const lastRating = ratingMatch[ratingMatch.length - 1];
          const rating = parseInt(lastRating.match(/\d+/)?.[0] || '0');
          const stars = rating >= 2000 ? 5 : rating >= 1800 ? 4 : rating >= 1600 ? 3 : rating >= 1400 ? 2 : 1;
          setPlatformStats(prev => ({ ...prev, codechef: { rating, stars, loading: false } }));
          return;
        }
        throw new Error('Could not parse rating');
      } catch (error) {
        console.error('CodeChef fetch error:', error);
        setPlatformStats(prev => ({ ...prev, codechef: { rating: 1278, stars: 1, loading: false } }));
      }
    };

    const fetchCodeforcesStats = async () => {
      try {
        const response = await fetch('https://codeforces.com/api/user.info?handles=yashraj_2403');
        const data = await response.json();
        if (data.status === 'OK' && data.result?.[0]) {
          const user = data.result[0];
          setPlatformStats(prev => ({
            ...prev,
            codeforces: { rating: user.rating || 0, rank: user.rank || 'Unrated', loading: false }
          }));
        }
      } catch (error) {
        console.error('Codeforces fetch error:', error);
        setPlatformStats(prev => ({ ...prev, codeforces: { rating: 1400, rank: 'Specialist', loading: false } }));
      }
    };

    fetchLeetCodeStats();
    fetchCodeChefStats();
    fetchCodeforcesStats();
    setPlatformStats(prev => ({ ...prev, hackerrank: { badges: '5★ Problem Solving', loading: false } }));
  }, []);

  const getStarString = (stars: number) => '★'.repeat(stars);
  const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const platforms: Platform[] = [
    {
      name: 'LeetCode',
      logo: '💡',
      url: 'https://leetcode.com/u/yashraj_2403',
      color: 'from-yellow-500 to-orange-500',
      stats: platformStats.leetcode.loading ? 'Loading...' : `${platformStats.leetcode.solved}+ Problems Solved`,
      desc: 'Consistent problem solver, focusing on DSA and competitive programming.',
      loading: platformStats.leetcode.loading,
    },
    {
      name: 'CodeChef',
      logo: '👨‍🍳',
      url: 'https://www.codechef.com/users/yashraj_2403',
      color: 'from-orange-600 to-red-600',
      stats: platformStats.codechef.loading ? 'Loading...' : `${getStarString(platformStats.codechef.stars)} (${platformStats.codechef.rating}+ Rating)`,
      desc: 'Regular participant in contests, solving complex algorithmic challenges.',
      loading: platformStats.codechef.loading,
    },
    {
      name: 'Codeforces',
      logo: '🏆',
      url: 'https://codeforces.com/profile/yashraj_2403',
      color: 'from-blue-500 to-purple-600',
      stats: platformStats.codeforces.loading ? 'Loading...' : `${capitalizeFirst(platformStats.codeforces.rank)} (${platformStats.codeforces.rating})`,
      desc: 'Competing in global rounds to sharpen rapid problem-solving skills.',
      loading: platformStats.codeforces.loading,
    },
    {
      name: 'HackerRank',
      logo: '⚡',
      url: 'https://hackerrank.com/profile/yashraj24007',
      color: 'from-green-500 to-green-700',
      stats: platformStats.hackerrank.badges,
      desc: 'Mastering core CS concepts and language proficiencies.',
      loading: platformStats.hackerrank.loading,
    },
  ];

  const languages = [
    { name: 'Python', percentage: 35, color: '#3776ab' },
    { name: 'JavaScript', percentage: 25, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 20, color: '#3178c6' },
    { name: 'Java', percentage: 12, color: '#f89820' },
    { name: 'C++', percentage: 8, color: '#00599c' },
  ];

  return (
    <section id="stats" className="py-20 px-4 md:px-8 lg:px-16 bg-dark-800/30">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neon-cyan glow-text">{'<'}</span>
            <span className="text-white">Achievements & Stats</span>
            <span className="text-neon-cyan glow-text">{' />'}</span>
          </h2>
          <p className="text-gray-400 text-lg">My competitive programming journey & open source contributions</p>
        </motion.div>

        {/* GitHub Stats Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-neon-cyan pl-4">GitHub Activity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Repositories', value: githubStats.repos, icon: '📦', color: 'text-neon-cyan' },
              { label: 'Followers', value: githubStats.followers, icon: '👥', color: 'text-neon-purple' },
              { label: 'Stars Earned', value: githubStats.stars, icon: '⭐', color: 'text-neon-green' },
              { label: 'Contributions', value: githubStats.contributions, icon: '🔥', color: 'text-neon-pink' },
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

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contribution Graph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="glass-effect p-6 rounded-lg overflow-hidden md:col-span-2"
            >
              <h3 className="text-xl font-bold text-neon-cyan mb-6">
                <span className="text-neon-green">// </span>
                Contribution Graph
              </h3>
              <a href="https://github.com/Yash-Raj-2403" target="_blank" rel="noopener noreferrer" className="block w-full overflow-x-auto">
                <img 
                  src="https://ghchart.rshah.org/00f6ff/Yash-Raj-2403" 
                  alt="Yash Raj's Github Chart" 
                  className="min-w-[600px] w-full"
                />
              </a>
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
                Top Languages
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

        {/* Coding Profiles Grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-neon-cyan pl-4">Coding Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="glass-effect p-8 rounded-xl flex items-center gap-6 transition-all hover:border-neon-cyan border border-white/5 bg-dark-800/40 h-full">
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 blur-xl bg-gradient-to-br ${platform.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                    <div className="relative z-10 text-4xl md:text-5xl bg-dark-900 rounded-full p-4 border border-white/10 group-hover:border-white/20 transition-colors">
                      {platform.logo}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className={`text-2xl font-bold mb-1 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.name}
                    </h3>
                    <div className="text-white font-bold text-lg mb-2 group-hover:text-neon-cyan transition-colors">
                      {platform.loading ? (
                        <span className="animate-pulse">Fetching...</span>
                      ) : (
                        platform.stats
                      )}
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {platform.desc}
                    </p>
                  </div>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <svg className="w-6 h-6 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
