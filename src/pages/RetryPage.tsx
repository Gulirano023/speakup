import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Check, Minus } from 'lucide-react';
import { ScoreRing } from '../components/ScoreDisplay';

const attempts = [
  {
    label: 'Attempt 1',
    date: 'Today, 2:30 PM',
    scores: { grammar: 72, vocabulary: 65, fluency: 68, pronunciation: 70 },
  },
  {
    label: 'Attempt 2',
    date: 'Today, 2:45 PM',
    scores: { grammar: 84, vocabulary: 74, fluency: 79, pronunciation: 78 },
  },
];

const improvements = [
  { text: 'Fewer pauses', improved: true },
  { text: 'Better vocabulary', improved: true },
  { text: 'Fewer grammar mistakes', improved: true },
  { text: 'Smoother pronunciation', improved: true },
  { text: 'More natural flow', improved: false },
];

export function RetryPage() {
  const calcOverall = (scores: typeof attempts[0]['scores']) => 
    Math.round((scores.grammar + scores.vocabulary + scores.fluency + scores.pronunciation) / 4);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/feedback" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Feedback
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Progress Comparison</h1>
          <p className="mt-2 text-text-secondary">See how you've improved between attempts</p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {attempts.map((attempt, index) => (
            <motion.div
              key={attempt.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">{attempt.label}</h3>
                <span className="text-sm text-text-muted">{attempt.date}</span>
              </div>
              
              <div className="flex justify-center mb-6">
                <ScoreRing score={calcOverall(attempt.scores)} size={120} strokeWidth={8} label="Overall" />
              </div>

              <div className="space-y-3">
                {Object.entries(attempt.scores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary capitalize">{key}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Score Difference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold">Score Improvement</h3>
              <p className="text-sm text-text-muted">From Attempt 1 to Attempt 2</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(attempts[1].scores).map(([key, value]) => {
              const diff = value - attempts[0].scores[key as keyof typeof attempts[0]['scores']];
              return (
                <div key={key} className="bg-surface-light rounded-xl p-4 text-center">
                  <p className="text-sm text-text-muted capitalize mb-1">{key}</p>
                  <p className="text-2xl font-bold text-success">+{diff}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* What Improved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h3 className="font-semibold text-lg mb-4">What improved?</h3>
          <div className="space-y-3">
            {improvements.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {item.improved ? (
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center">
                    <Minus className="w-4 h-4 text-text-muted" />
                  </div>
                )}
                <span className={item.improved ? 'text-text-primary' : 'text-text-muted'}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/practice" className="btn-primary">
            Practice Again
          </Link>
          <Link to="/topics" className="btn-secondary">
            Choose New Topic
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
