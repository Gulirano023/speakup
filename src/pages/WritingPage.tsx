import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import { ScoreRing } from '../components/ScoreDisplay';
import { useAuth } from '../contexts/AuthContext';
import { topics } from '../data/mockData';

interface FeedbackResult {
  score: number;
  corrections: { original: string; corrected: string; explanation: string }[];
  suggestions: string[];
  improvedVersion: string;
}

export function WritingPage() {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic') || 'daily-life';
  const topic = topics.find(t => t.id === topicId) || topics[0];
  const question = topic.questions[0];

  const [text, setText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const { user } = useAuth();

  const handleSubmit = () => {
    if (!text.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setFeedback({
        score: Math.floor(Math.random() * 25) + 70,
        corrections: [
          { original: "I usually reading books.", corrected: "I usually read books.", explanation: "After 'usually', use the base form of the verb." },
          { original: "I enjoy to watch movies.", corrected: "I enjoy watching movies.", explanation: "'Enjoy' is followed by a gerund (-ing form)." },
        ],
        suggestions: [
          "Try using more linking words (however, furthermore, moreover)",
          "Add specific examples to support your ideas",
          "Use a wider range of vocabulary",
        ],
        improvedVersion: "In my free time, I enjoy a variety of activities that help me relax and stay productive. I particularly enjoy reading books because they allow me to explore new ideas and expand my vocabulary. Furthermore, I find that watching English movies helps me improve my listening skills while being entertaining.",
      });
      setIsEvaluating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/topics" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </Link>
          <div className="flex items-center gap-2 text-sm text-accent mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Writing Practice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Write Your Answer</h1>
        </motion.div>

        {/* Question */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card mb-6">
          <p className="text-lg text-text-secondary italic">"{question.text}"</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-text-muted">
            <span>Minimum 50 words recommended</span>
            <span>•</span>
            <span>{user?.level || 'B1'} level</span>
          </div>
        </motion.div>

        {/* Writing Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 bg-surface-light border border-border rounded-xl p-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none"
            placeholder="Type your answer here..."
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-text-muted">{text.split(/\s+/).filter(Boolean).length} words</span>
            <button onClick={handleSubmit} disabled={!text.trim() || isEvaluating} className="btn-primary flex items-center gap-2 disabled:opacity-50">
              {isEvaluating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Evaluating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Feedback */}
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score */}
            <div className="card text-center">
              <h3 className="text-lg font-semibold mb-4">Writing Score</h3>
              <div className="flex justify-center">
                <ScoreRing score={feedback.score} size={140} strokeWidth={10} />
              </div>
            </div>

            {/* Corrections */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Corrections</h3>
              </div>
              <div className="space-y-3">
                {feedback.corrections.map((c, i) => (
                  <div key={i} className="bg-surface-light rounded-xl p-4">
                    <p className="text-error line-through text-sm">{c.original}</p>
                    <p className="text-success text-sm mt-1">{c.corrected}</p>
                    <p className="text-xs text-text-muted mt-2">{c.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-warning" />
                <h3 className="font-semibold">Suggestions</h3>
              </div>
              <ul className="space-y-2">
                {feedback.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary">
                    <span className="text-primary mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improved Version */}
            <div className="card">
              <h3 className="font-semibold mb-4">Improved Version</h3>
              <div className="bg-surface-light rounded-xl p-4">
                <p className="text-text-secondary leading-relaxed">{feedback.improvedVersion}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={() => { setText(''); setFeedback(null); }} className="btn-secondary">Try Again</button>
              <Link to="/topics" className="btn-primary">Choose New Topic</Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
