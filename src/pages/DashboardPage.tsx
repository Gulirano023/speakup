import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame, Trophy, Zap, ArrowRight, ChevronRight, Target, Mic, PenLine, BookOpen } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';
import { useAuth } from '../contexts/AuthContext';
import { getTopicsForLevel } from '../data/mockData';

const quickActions = [
  { icon: Mic, label: 'Speaking Practice', desc: 'Speak and get AI feedback', path: '/topics?type=speaking', color: 'from-primary to-purple-600' },
  { icon: PenLine, label: 'Writing Practice', desc: 'Write and get corrections', path: '/topics?type=writing', color: 'from-accent to-blue-600' },
  { icon: BookOpen, label: 'Grammar Exercises', desc: 'Master grammar rules', path: '/grammar', color: 'from-success to-green-600' },
];

export function DashboardPage() {
  const { user } = useAuth();
  const level = user?.level;
  const topics = getTopicsForLevel(level || null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            {getGreeting()}, {user?.name} 👋
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-text-secondary">Let's continue your learning journey</p>
            {level && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1">
                <Target className="w-3 h-3" /> Level {level}
              </span>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Speaking Time', value: `${user?.totalMinutes || 18} min`, icon: Clock, color: 'text-primary' },
            { label: 'Streak', value: `${user?.streak || 7} days`, icon: Flame, color: 'text-orange-500', extra: '🔥' },
            { label: 'Sessions', value: `${user?.totalSessions || 24}`, icon: Trophy, color: 'text-yellow-500' },
            { label: 'XP', value: `${(user?.xp || 1240).toLocaleString()}`, icon: Zap, color: 'text-accent' },
          ].map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}{stat.extra && <span className="ml-1">{stat.extra}</span>}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions - 3 bo'lim */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Practice Modes</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={action.label} to={action.path} className="group">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}>
                  <div className="relative overflow-hidden rounded-2xl border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                      <action.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{action.label}</h3>
                    <p className="text-sm text-text-muted">{action.desc}</p>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recommended Topics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended for Level {level}</h2>
            <Link to="/topics" className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.slice(0, 6).map((topic, index) => (
              <Link key={topic.id} to={topic.type === 'grammar' ? '/grammar' : topic.type === 'writing' ? `/writing?topic=${topic.id}` : `/practice?topic=${topic.id}`}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.05 }} className="card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-light flex items-center justify-center text-2xl shrink-0">
                      {topic.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{topic.title}</h3>
                      <p className="text-sm text-text-muted line-clamp-2">{topic.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-lg ${
                          topic.type === 'speaking' ? 'bg-primary/10 text-primary' :
                          topic.type === 'writing' ? 'bg-accent/10 text-accent' :
                          'bg-success/10 text-success'
                        }`}>
                          {topic.type === 'speaking' ? '🎤 Speaking' : topic.type === 'writing' ? '✏️ Writing' : '📖 Grammar'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Today's Practice */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
              <Zap className="w-4 h-4" />
              Today's Practice
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Topic: Free Time</h3>
                <p className="text-text-secondary italic">"What do you usually do in your free time?"</p>
              </div>
              <div className="flex items-center gap-4">
                <AudioWave isActive={false} className="h-8" />
                <Link to="/practice" className="btn-primary flex items-center gap-2">
                  Start Speaking
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
