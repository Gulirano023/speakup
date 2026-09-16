import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ChevronRight, ChevronLeft, Check, Clock } from 'lucide-react';
import { useAuth, UserLevel } from '../contexts/AuthContext';
import { placementTest, calculateLevel } from '../data/placementTest';

export function PlacementTestPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<UserLevel | null>(null);
  const { setLevel, user } = useAuth();
  const navigate = useNavigate();

  if (user?.hasTakenTest) {
    navigate('/dashboard');
    return null;
  }

  const question = placementTest[currentQ];
  const progress = ((currentQ + 1) / placementTest.length) * 100;

  const handleAnswer = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQ < placementTest.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
    } else {
      const level = calculateLevel(newAnswers);
      setResult(level);
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelectedOption(answers[currentQ - 1] ?? null);
    }
  };

  const handleFinish = () => {
    if (result) {
      setLevel(result);
      navigate('/dashboard');
    }
  };

  const getLevelColor = (level: UserLevel) => {
    const colors: Record<UserLevel, string> = {
      A1: 'text-blue-400', A2: 'text-green-400',
      B1: 'text-yellow-400', B2: 'text-orange-400',
      C1: 'text-purple-400', C2: 'text-red-400',
    };
    return colors[level];
  };

  const getLevelDescription = (level: UserLevel) => {
    const desc: Record<UserLevel, string> = {
      A1: "Beginner — You're just starting to learn English.",
      A2: "Elementary — You can understand basic sentences and expressions.",
      B1: "Intermediate — You can deal with most everyday situations.",
      B2: "Upper-Intermediate — You can interact with fluency and spontaneity.",
      C1: "Advanced — You can use English flexibly for social and professional purposes.",
      C2: "Proficient — You have near-native mastery of English.",
    };
    return desc[level];
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </span>
            Placement Test
          </div>
          <h1 className="text-3xl font-bold mb-2">Find Your Level</h1>
          <p className="text-text-secondary">Answer {placementTest.length} questions to determine your English level</p>
        </div>

        {/* Result Screen */}
        <AnimatePresence mode="wait">
          {showResult && result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 text-center"
            >
              <div className="mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className={`text-8xl font-bold mb-4 ${getLevelColor(result)}`}
                >
                  {result}
                </motion.div>
                <p className="text-lg text-text-secondary">{getLevelDescription(result)}</p>
              </div>

              <div className="bg-surface-light rounded-xl p-4 mb-6">
                <p className="text-sm text-text-muted">
                  You answered {answers.filter((a, i) => a === placementTest[i].correct).length} out of {placementTest.length} correctly
                </p>
              </div>

              <button onClick={handleFinish} className="btn-primary w-full flex items-center justify-center gap-2">
                Start Learning
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card p-8"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">
                  Question {currentQ + 1} of {placementTest.length}
                </span>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Clock className="w-4 h-4" />
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    question.level === 'A1' ? 'bg-blue-500/10 text-blue-400' :
                    question.level === 'A2' ? 'bg-green-500/10 text-green-400' :
                    question.level === 'B1' ? 'bg-yellow-500/10 text-yellow-400' :
                    question.level === 'B2' ? 'bg-orange-500/10 text-orange-400' :
                    question.level === 'C1' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>{question.level}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-light rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question */}
              <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedOption === index
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-surface-light hover:border-primary/50 text-text-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                        selectedOption === index
                          ? 'bg-primary text-white'
                          : 'bg-surface text-text-muted'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentQ === 0}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={handleAnswer}
                  disabled={selectedOption === null}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {currentQ === placementTest.length - 1 ? (
                    <>
                      Finish
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
