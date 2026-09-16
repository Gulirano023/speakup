import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Mic, PenLine, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getTopicsForLevel } from '../data/mockData';
import type { Topic } from '../data/types';

const typeFilters = [
  { value: 'all', label: 'All', icon: null },
  { value: 'speaking', label: 'Speaking', icon: Mic },
  { value: 'writing', label: 'Writing', icon: PenLine },
  { value: 'grammar', label: 'Grammar', icon: BookOpen },
];

function TopicCard({ topic }: { topic: Topic }) {
  const getPath = () => {
    if (topic.type === 'grammar') return '/grammar';
    if (topic.type === 'writing') return `/writing?topic=${topic.id}`;
    return `/practice?topic=${topic.id}`;
  };

  const getTypeColor = () => {
    if (topic.type === 'speaking') return 'bg-primary/10 text-primary';
    if (topic.type === 'writing') return 'bg-accent/10 text-accent';
    return 'bg-success/10 text-success';
  };

  return (
    <Link to={getPath()} className="card-hover group">
      <div className="flex items-start justify-between">
        <div className="w-14 h-14 rounded-2xl bg-surface-light flex items-center justify-center text-3xl mb-4">
          {topic.icon}
        </div>
        <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
      <p className="text-sm text-text-muted mb-3">{topic.description}</p>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-lg ${getTypeColor()}`}>
          {topic.type === 'speaking' ? '🎤 Speaking' : topic.type === 'writing' ? '✏️ Writing' : '📖 Grammar'}
        </span>
        <span className="text-xs text-text-muted">
          {topic.questions.length} {topic.questions.length === 1 ? 'exercise' : 'exercises'}
        </span>
      </div>
    </Link>
  );
}

export function TopicsPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || 'all';

  const topics = getTopicsForLevel(user?.level || null, activeType === 'all' ? undefined : activeType);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Choose a Topic</h1>
          <p className="mt-2 text-text-secondary">
            {user?.level ? `Showing topics for Level ${user.level}` : 'Select a category to start practicing'}
          </p>
        </motion.div>

        {/* Type Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-8">
          {typeFilters.map((filter) => {
            const isActive = activeType === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => {
                  if (filter.value === 'all') {
                    setSearchParams({});
                  } else {
                    setSearchParams({ type: filter.value });
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-glow'
                    : 'bg-surface-light text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {filter.icon && <filter.icon className="w-4 h-4" />}
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <TopicCard topic={topic} />
            </motion.div>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">No topics available for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
