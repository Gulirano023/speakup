import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface GrammarExercise {
  id: number;
  sentence: string;
  blank: number;
  options: string[];
  correct: number;
  explanation: string;
  level: string;
}

const exercises: GrammarExercise[] = [
  { id: 1, sentence: "She ___ to school every day.", blank: 0, options: ["go", "goes", "going", "gone"], correct: 1, explanation: "Third person singular (she) takes 'goes' in present simple.", level: "A1" },
  { id: 2, sentence: "I ___ already finished my homework.", blank: 0, options: ["have", "has", "had", "having"], correct: 0, explanation: "Use 'have' with I/you/we/they in present perfect.", level: "A2" },
  { id: 3, sentence: "If I ___ rich, I would travel the world.", blank: 0, options: ["am", "was", "were", "be"], correct: 2, explanation: "Second conditional uses 'were' for all subjects.", level: "B1" },
  { id: 4, sentence: "The book ___ by the author last year.", blank: 0, options: ["wrote", "was written", "is written", "writing"], correct: 1, explanation: "Passive voice in past simple: was/were + past participle.", level: "B1" },
  { id: 5, sentence: "I wish I ___ more time to study.", blank: 0, options: ["have", "has", "had", "having"], correct: 2, explanation: "'Wish' + past simple expresses a present desire for something different.", level: "B2" },
  { id: 6, sentence: "She denied ___ the answer.", blank: 0, options: ["know", "knowing", "to know", "known"], correct: 1, explanation: "'Deny' is followed by a gerund (-ing form).", level: "B2" },
  { id: 7, sentence: "Had I known, I ___ helped you.", blank: 0, options: ["would have", "will have", "had", "have"], correct: 0, explanation: "Third conditional inversion: Had I + past participle, would have + past participle.", level: "C1" },
  { id: 8, sentence: "Not only ___ the exam, but she also got the highest score.", blank: 0, options: ["she passed", "did she pass", "she did pass", "passed she"], correct: 1, explanation: "After 'not only' at the start, use inversion (did + subject + verb).", level: "C1" },
];

export function GrammarPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { addXP } = useAuth();

  const exercise = exercises[currentQ];
  const progress = ((currentQ + 1) / exercises.length) * 100;

  const handleSelect = (index: number) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
    if (index === exercise.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < exercises.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      addXP(score * 15);
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / exercises.length) * 100);
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <Award className="w-20 h-20 text-primary mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Grammar Complete!</h1>
            <p className="text-text-secondary mb-6">You scored {score} out of {exercises.length}</p>
            
            <div className="flex justify-center mb-8">
              <div className={`text-6xl font-bold ${percentage >= 80 ? 'text-success' : percentage >= 60 ? 'text-warning' : 'text-error'}`}>
                {percentage}%
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={handleRestart} className="btn-secondary flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const sentenceParts = exercise.sentence.split('___');

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Grammar Practice</h1>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">Question {currentQ + 1} of {exercises.length}</span>
            <span className="text-sm text-primary font-medium">Score: {score}</span>
          </div>
          <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" animate={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Exercise Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                exercise.level === 'A1' ? 'bg-blue-500/10 text-blue-400' :
                exercise.level === 'A2' ? 'bg-green-500/10 text-green-400' :
                exercise.level === 'B1' ? 'bg-yellow-500/10 text-yellow-400' :
                exercise.level === 'B2' ? 'bg-orange-500/10 text-orange-400' :
                'bg-purple-500/10 text-purple-400'
              }`}>{exercise.level}</span>
            </div>

            {/* Sentence */}
            <div className="text-xl mb-8 leading-relaxed">
              {sentenceParts[0]}
              <span className="inline-block min-w-[120px] border-b-2 border-primary mx-2 text-center text-primary font-semibold">
                {showAnswer ? exercise.options[exercise.correct] : '?'}
              </span>
              {sentenceParts[1]}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {exercise.options.map((option, index) => {
                let classes = 'border-border bg-surface-light hover:border-primary/50';
                if (showAnswer && index === exercise.correct) classes = 'border-success bg-success/10 text-success';
                if (showAnswer && index === selected && index !== exercise.correct) classes = 'border-error bg-error/10 text-error';

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={showAnswer}
                    className={`p-4 rounded-xl border transition-all text-left font-medium ${classes}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                      {showAnswer && index === exercise.correct && <Check className="w-5 h-5 ml-auto text-success" />}
                      {showAnswer && index === selected && index !== exercise.correct && <X className="w-5 h-5 ml-auto text-error" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-4 ${selected === exercise.correct ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'}`}
              >
                <p className="text-sm">{exercise.explanation}</p>
              </motion.div>
            )}

            {/* Next Button */}
            {showAnswer && (
              <button onClick={handleNext} className="btn-primary w-full flex items-center justify-center gap-2">
                {currentQ === exercises.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
