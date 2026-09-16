import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { topics } from '../data/mockData';

export function TopicsPage() {
  const dailyTopics = topics.filter(t => t.category === 'daily');
  const ieltsTopics = topics.filter(t => t.category === 'ielts');

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
          <h1 className="text-3xl sm:text-4xl font-bold">Choose a Topic</h1>
          <p className="mt-2 text-text-secondary">Select a category to start practicing</p>
        </motion.div>

        {/* Daily Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🌟</span> Daily Life Topics
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyTopics.map((topic, index) => (
              <Link
                key={topic.id}
                to={`/practice?topic=${topic.id}`}
                className="card-hover group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-surface-light flex items-center justify-center text-3xl mb-4">
                      {topic.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm text-text-muted">{topic.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg">
                      {topic.questions.length} questions
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* IELTS Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📝</span> IELTS Practice
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ieltsTopics.map((topic, index) => (
              <Link
                key={topic.id}
                to={`/practice?topic=${topic.id}`}
                className="card-hover group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl mb-4">
                      {topic.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm text-text-muted">{topic.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-lg">
                      {topic.questions.length} questions
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
