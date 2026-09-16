import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Award, Calendar, Zap } from 'lucide-react';
import { ProgressBar } from '../components/ScoreDisplay';
import { useAuth } from '../contexts/AuthContext';

const skills = [
  { name: 'Grammar', key: 'grammar' as const, color: 'bg-primary' },
  { name: 'Vocabulary', key: 'vocabulary' as const, color: 'bg-accent' },
  { name: 'Fluency', key: 'fluency' as const, color: 'bg-warning' },
  { name: 'Pronunciation', key: 'pronunciation' as const, color: 'bg-success' },
];

const levelDescriptions: Record<string, string> = {
  A1: "Beginner — You're just starting your English journey.",
  A2: "Elementary — You can handle basic everyday conversations.",
  B1: "Intermediate — You can deal with most situations while traveling.",
  B2: "Upper-Intermediate — You can interact with fluency and confidence.",
  C1: "Advanced — You can use English flexibly for work and study.",
  C2: "Proficient — You have near-native mastery of English.",
};

const levelProgress: Record<string, number> = {
  A1: 15, A2: 30, B1: 50, B2: 70, C1: 85, C2: 100,
};

export function ProfilePage() {
  const { user } = useAuth();
  const skillsData = user?.skills || { grammar: 0, vocabulary: 0, fluency: 0, pronunciation: 0 };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Speaking Profile</h1>
          <p className="mt-2 text-text-secondary">Your overall speaking skills analysis</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-text-secondary">{user?.email}</p>
              <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
                {user?.level && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    <Target className="w-3 h-3" /> Level {user.level}
                  </span>
                )}
                <span className="flex items-center gap-1 text-sm text-text-muted">
                  <Zap className="w-3 h-3 text-accent" /> {user?.xp || 0} XP
                </span>
                <span className="flex items-center gap-1 text-sm text-text-muted">
                  <Calendar className="w-3 h-3" /> Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Today'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Level Card */}
        {user?.level && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Your Level: <span className="text-primary">{user.level}</span></h3>
                <p className="text-text-secondary text-sm mb-3">{levelDescriptions[user.level]}</p>
                <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress[user.level]}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-xs text-text-muted mt-1">
                  {user.level === 'C2' ? 'Maximum level reached!' : `Progress to next level: ${levelProgress[user.level]}%`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card mb-8">
          <h3 className="font-semibold text-lg mb-6">Your Skills</h3>
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">{skill.name}</span>
                  <span className="font-medium">{skillsData[skill.key]}%</span>
                </div>
                <ProgressBar value={skillsData[skill.key]} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Focus Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card bg-gradient-to-br from-warning/10 to-primary/10 border-warning/20 mb-8">
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

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid sm:grid-cols-3 gap-4">
          <Link to="/placement-test" className="card-hover text-center">
            <p className="text-2xl mb-2">📝</p>
            <p className="font-medium">Retake Level Test</p>
            <p className="text-xs text-text-muted mt-1">Check your progress</p>
          </Link>
          <Link to="/progress" className="card-hover text-center">
            <p className="text-2xl mb-2">📊</p>
            <p className="font-medium">View Progress</p>
            <p className="text-xs text-text-muted mt-1">Detailed statistics</p>
          </Link>
          <Link to="/topics" className="card-hover text-center">
            <p className="text-2xl mb-2">🎯</p>
            <p className="font-medium">Practice Now</p>
            <p className="text-xs text-text-muted mt-1">Continue learning</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
