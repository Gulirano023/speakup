import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target } from 'lucide-react';
import { ProgressBar } from '../components/ScoreDisplay';

const skills = [
  { name: 'Grammar', value: 72, color: 'bg-primary' },
  { name: 'Vocabulary', value: 82, color: 'bg-accent' },
  { name: 'Fluency', value: 65, color: 'bg-warning' },
  { name: 'Pronunciation', value: 78, color: 'bg-success' },
];

const recentSessions = [
  { topic: 'Daily Life', date: 'Today', score: 76 },
  { topic: 'Travel', date: 'Yesterday', score: 72 },
  { topic: 'IELTS Part 1', date: '2 days ago', score: 68 },
  { topic: 'Technology', date: '3 days ago', score: 74 },
];

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl sm:text-4xl font-bold">Speaking Profile</h1>
          <p className="mt-2 text-text-secondary">Your overall speaking skills analysis</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-3xl font-bold">S</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Speaker</h2>
              <p className="text-text-secondary">Level: Intermediate</p>
              <p className="text-sm text-text-muted">Total XP: 1,240</p>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h3 className="font-semibold text-lg mb-6">Your Speaking Skills</h3>
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">{skill.name}</span>
                  <span className="font-medium">{skill.value}%</span>
                </div>
                <ProgressBar value={skill.value} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-warning/10 to-primary/10 border-warning/20 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Your Focus</h3>
              <p className="text-text-secondary mb-2">This week, focus on <span className="text-warning font-semibold">Fluency</span>.</p>
              <p className="text-sm text-text-muted">Practice 5 minutes every day to see improvement.</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="font-semibold text-lg mb-4">Recent Practice Sessions</h3>
          <div className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between bg-surface-light rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">📝</span>
                  </div>
                  <div>
                    <p className="font-medium">{session.topic}</p>
                    <p className="text-sm text-text-muted">{session.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{session.score}</p>
                  <p className="text-xs text-text-muted">Score</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
