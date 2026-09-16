import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weeklyMinutes = [
  { day: 'Mon', minutes: 15 },
  { day: 'Tue', minutes: 20 },
  { day: 'Wed', minutes: 12 },
  { day: 'Thu', minutes: 25 },
  { day: 'Fri', minutes: 18 },
  { day: 'Sat', minutes: 30 },
  { day: 'Sun', minutes: 18 },
];

const monthlySessions = [
  { week: 'Week 1', sessions: 12 },
  { week: 'Week 2', sessions: 18 },
  { week: 'Week 3', sessions: 15 },
  { week: 'Week 4', sessions: 24 },
];

const vocabularyGrowth = [
  { month: 'Jan', words: 45 },
  { month: 'Feb', words: 62 },
  { month: 'Mar', words: 78 },
  { month: 'Apr', words: 95 },
  { month: 'May', words: 110 },
  { month: 'Jun', words: 128 },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  active: i < 7 || (i > 10 && i < 15) || (i > 20 && i < 25),
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border rounded-lg p-3 shadow-card">
        <p className="text-sm text-text-muted">{label}</p>
        <p className="font-semibold">{payload[0].value} {payload[0].dataKey === 'minutes' ? 'min' : payload[0].dataKey === 'words' ? 'words' : 'sessions'}</p>
      </div>
    );
  }
  return null;
};

export function ProgressPage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Progress</h1>
          <p className="mt-2 text-text-secondary">Track your speaking improvement over time</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Minutes', value: '138', icon: Clock, color: 'text-primary' },
            { label: 'Total Sessions', value: '89', icon: BookOpen, color: 'text-accent' },
            { label: 'Current Streak', value: '7 days', icon: Flame, color: 'text-orange-500' },
            { label: 'Avg Score', value: '74', icon: TrendingUp, color: 'text-success' },
          ].map((stat, index) => (
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
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Minutes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="font-semibold mb-4">Speaking Minutes</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyMinutes}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="minutes" stroke="#7c3aed" fillOpacity={1} fill="url(#colorMinutes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="font-semibold mb-4">Weekly Sessions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySessions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                  <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Vocabulary Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-8"
        >
          <h3 className="font-semibold mb-4">Vocabulary Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vocabularyGrowth}>
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="words" stroke="#22c55e" fillOpacity={1} fill="url(#colorWords)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Streak Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-6 h-6 text-orange-500" />
            <h3 className="font-semibold text-lg">7 Day Speaking Streak 🔥</h3>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day) => (
              <div
                key={day.day}
                className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                  day.active
                    ? 'bg-primary text-white'
                    : 'bg-surface-light text-text-muted'
                }`}
              >
                {day.day}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
