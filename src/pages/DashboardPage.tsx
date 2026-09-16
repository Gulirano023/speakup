import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame, Trophy, Zap, ArrowRight, ChevronRight } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';

const stats = [
  { label: 'Speaking Time', value: '18 min', icon: Clock, color: 'text-primary' },
  { label: 'Streak', value: '7 days', icon: Flame, color: 'text-orange-500', extra: '🔥' },
  { label: 'Sessions', value: '24', icon: Trophy, color: 'text-yellow-500' },
  { label: 'XP', value: '1,240', icon: Zap, color: 'text-accent' },
];

const weeklyData = [
  { day: 'Mon', minutes: 15, sessions: 2 },
  { day: 'Tue', minutes: 20, sessions: 3 },
  { day: 'Wed', minutes: 12, sessions: 2 },
  { day: 'Thu', minutes: 25, sessions: 4 },
  { day: 'Fri', minutes: 18, sessions: 3 },
  { day: 'Sat', minutes: 30, sessions: 5 },
  { day: 'Sun', minutes: 18, sessions: 3 },
];

export function DashboardPage() {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            {getGreeting()} 👋
          </h1>
          <p className="mt-2 text-text-secondary">Let's continue your learning journey</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
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

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Weekly Progress</h2>
            <Link to="/progress" className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((data, index) => {
              const height = (data.minutes / 30) * 100;
              return (
                <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  />
                  <span className="text-xs text-text-muted">{data.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Practice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border p-6 sm:p-8"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
              <Zap className="w-4 h-4" />
              Today's Practice
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Topic: Free Time</h3>
                <p className="text-text-secondary italic">
                  "What do you usually do in your free time?"
                </p>
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid sm:grid-cols-2 gap-4"
        >
          <Link to="/interview" className="card-hover flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h3 className="font-semibold">AI Interview Mode</h3>
              <p className="text-sm text-text-muted">Practice with an AI examiner</p>
            </div>
          </Link>
          
          <Link to="/topics" className="card-hover flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h3 className="font-semibold">Browse Topics</h3>
              <p className="text-sm text-text-muted">Explore 12+ practice categories</p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
