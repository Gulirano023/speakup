import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MessageSquare, Volume2, Lightbulb } from 'lucide-react';
import { ScoreRing } from '../components/ScoreDisplay';
import { demoFeedback } from '../data/mockData';

export function FeedbackPage() {
  const { grammar, vocabulary, fluency, pronunciation } = demoFeedback;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/practice" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Practice
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">AI Feedback</h1>
          <p className="mt-2 text-text-secondary">Detailed analysis of your speaking</p>
        </motion.div>

        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8 text-center"
        >
          <h2 className="text-lg font-semibold mb-6">Overall Score</h2>
          <div className="flex justify-center">
            <ScoreRing score={Math.round((grammar.score + vocabulary.score + fluency.score + pronunciation.score) / 4)} size={160} strokeWidth={12} />
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <ScoreRing score={grammar.score} size={80} strokeWidth={6} label="Grammar" />
            </div>
            <div>
              <ScoreRing score={vocabulary.score} size={80} strokeWidth={6} label="Vocab" />
            </div>
            <div>
              <ScoreRing score={fluency.score} size={80} strokeWidth={6} label="Fluency" />
            </div>
            <div>
              <ScoreRing score={pronunciation.score} size={80} strokeWidth={6} label="Pronun." />
            </div>
          </div>
        </motion.div>

        {/* Grammar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Grammar</h3>
              <p className="text-sm text-text-muted">{grammar.mistakes.length} mistakes found</p>
            </div>
          </div>

          <div className="space-y-4">
            {grammar.mistakes.map((mistake, index) => (
              <div key={index} className="bg-surface-light rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-error text-xl">✗</span>
                  <div className="flex-1">
                    <p className="text-error line-through">{mistake.original}</p>
                    <p className="text-success mt-1">{mistake.correction}</p>
                    <p className="text-sm text-text-muted mt-2">{mistake.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vocabulary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <span className="text-xl">📚</span>
            </div>
            <div>
              <h3 className="font-semibold">Vocabulary</h3>
              <p className="text-sm text-text-muted">Good vocabulary usage</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-light rounded-xl p-4">
              <h4 className="text-sm font-semibold text-success mb-3">Good vocabulary</h4>
              <div className="flex flex-wrap gap-2">
                {vocabulary.goodWords.map(word => (
                  <span key={word} className="text-sm bg-success/10 text-success px-3 py-1 rounded-lg">
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface-light rounded-xl p-4">
              <h4 className="text-sm font-semibold text-primary mb-3">Try these words</h4>
              <div className="flex flex-wrap gap-2">
                {vocabulary.suggestedWords.map(word => (
                  <span key={word} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-lg">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fluency Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold">Fluency</h3>
              <p className="text-sm text-text-muted">Speaking flow analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="bg-surface-light rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{fluency.speakingTime}s</p>
              <p className="text-sm text-text-muted">Speaking Time</p>
            </div>
            <div className="bg-surface-light rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{fluency.pauses}</p>
              <p className="text-sm text-text-muted">Pauses</p>
            </div>
            <div className="bg-surface-light rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{fluency.repetitions}</p>
              <p className="text-sm text-text-muted">Repetitions</p>
            </div>
            <div className="bg-surface-light rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{fluency.fillerWords}</p>
              <p className="text-sm text-text-muted">Filler Words</p>
            </div>
          </div>

          <div className="bg-surface-light rounded-xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-warning mt-0.5" />
            <p className="text-sm text-text-secondary">{fluency.tip}</p>
          </div>
        </motion.div>

        {/* Pronunciation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold">Pronunciation</h3>
              <p className="text-sm text-text-muted">Words to practice</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {pronunciation.wordsToPractice.map(word => (
              <div key={word} className="bg-surface-light rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium">{word}</span>
                <button className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Volume2 className="w-4 h-4 text-primary" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/improve" className="btn-primary">
            Improve Answer
          </Link>
          <Link to="/retry" className="btn-secondary">
            Try Again
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
