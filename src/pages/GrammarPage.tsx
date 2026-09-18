import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, ChevronRight, Award, Shuffle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface GrammarExercise {
  id: number;
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  level: string;
}

const allExercises: GrammarExercise[] = [
  { id: 1, sentence: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 1, explanation: "Third person singular (she) takes 'goes' in present simple.", level: "A1" },
  { id: 2, sentence: "I ___ already finished my homework.", options: ["have", "has", "had", "having"], correct: 0, explanation: "Use 'have' with I/you/we/they in present perfect.", level: "A2" },
  { id: 3, sentence: "If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], correct: 2, explanation: "Second conditional uses 'were' for all subjects.", level: "B1" },
  { id: 4, sentence: "The book ___ by the author last year.", options: ["wrote", "was written", "is written", "writing"], correct: 1, explanation: "Passive voice in past simple: was/were + past participle.", level: "B1" },
  { id: 5, sentence: "I wish I ___ more time to study.", options: ["have", "has", "had", "having"], correct: 2, explanation: "'Wish' + past simple expresses a present desire for something different.", level: "B2" },
  { id: 6, sentence: "She denied ___ the answer.", options: ["know", "knowing", "to know", "known"], correct: 1, explanation: "'Deny' is followed by a gerund (-ing form).", level: "B2" },
  { id: 7, sentence: "Had I known, I ___ helped you.", options: ["would have", "will have", "had", "have"], correct: 0, explanation: "Third conditional inversion: Had I + past participle, would have + past participle.", level: "C1" },
  { id: 8, sentence: "Not only ___ the exam, but she also got the highest score.", options: ["she passed", "did she pass", "she did pass", "passed she"], correct: 1, explanation: "After 'not only' at the start, use inversion (did + subject + verb).", level: "C1" },
  { id: 9, sentence: "They ___ in this house since 2015.", options: ["live", "lived", "have lived", "are living"], correct: 2, explanation: "Present perfect for actions that started in the past and continue now.", level: "A2" },
  { id: 10, sentence: "My brother ___ play football yesterday.", options: ["plays", "played", "playing", "play"], correct: 1, explanation: "Past simple for completed actions in the past.", level: "A1" },
  { id: 11, sentence: "She was tired because she ___ all night.", options: ["worked", "has worked", "was working", "works"], correct: 2, explanation: "Past continuous for an ongoing action that caused another action.", level: "B1" },
  { id: 12, sentence: "By the time I arrived, they ___ already left.", options: ["have", "had", "has", "having"], correct: 1, explanation: "Past perfect for an action completed before another past action.", level: "B2" },
  { id: 13, sentence: "The project needs to ___ by Friday.", options: ["complete", "be completed", "completing", "completed"], correct: 1, explanation: "Passive infinitive: needs to be + past participle.", level: "B2" },
  { id: 14, sentence: "I would rather ___ at home tonight.", options: ["stay", "to stay", "staying", "stayed"], correct: 0, explanation: "'Would rather' is followed by the base form of the verb.", level: "B1" },
  { id: 15, sentence: "She suggested that he ___ a doctor.", options: ["sees", "see", "seeing", "saw"], correct: 1, explanation: "After 'suggested that', use the base form (subjunctive).", level: "B2" },
  { id: 16, sentence: "It is essential that everyone ___ on time.", options: ["arrives", "arrive", "arriving", "arrived"], correct: 1, explanation: "After 'essential that', use the base form (subjunctive).", level: "C1" },
  { id: 17, sentence: "She has been ___ English for three years.", options: ["study", "studied", "studying", "studies"], correct: 2, explanation: "Present perfect continuous: has/have been + gerund.", level: "A2" },
  { id: 18, sentence: "If I ___ you, I would accept the offer.", options: ["am", "was", "were", "be"], correct: 2, explanation: "Second conditional: if + subject + were (for all persons).", level: "B1" },
  { id: 19, sentence: "The money was ___ for charity.", options: ["raise", "raised", "raising", "raises"], correct: 1, explanation: "Past participle in passive voice: was raised.", level: "B1" },
  { id: 20, sentence: "He ___ be at home — I just saw him at the store.", options: ["must", "can't", "should", "might"], correct: 1, explanation: "'Can't' expresses strong negative deduction.", level: "B2" },
  { id: 21, sentence: "I'd like ___ the manager, please.", options: ["speaking to", "to speak to", "speak to", "to speaking to"], correct: 1, explanation: "'Would like' is followed by infinitive: would like to + verb.", level: "A2" },
  { id: 22, sentence: "Despite ___ hard, she failed the exam.", options: ["study", "studied", "studying", "to study"], correct: 2, explanation: "'Despite' is followed by a gerund (-ing form).", level: "B2" },
  { id: 23, sentence: "Neither the teacher nor the students ___ present.", options: ["was", "were", "is", "has been"], correct: 1, explanation: "With 'neither...nor', the verb agrees with the nearest subject.", level: "B1" },
  { id: 24, sentence: "Scarcely ___ arrived when the phone rang.", options: ["I had", "had I", "I have", "have I"], correct: 1, explanation: "After 'scarcely', use inversion: scarcely had + subject + past participle.", level: "C1" },
  { id: 25, sentence: "The committee ___ to postpone the meeting.", options: ["decide", "decides", "decided", "has decided"], correct: 2, explanation: "Collective nouns can take singular or plural verbs. Here past simple is used.", level: "B1" },
  { id: 26, sentence: "She made him ___ the truth.", options: ["tell", "told", "telling", "to tell"], correct: 0, explanation: "After 'make' (causative), use the base form: made him tell.", level: "B1" },
  { id: 27, sentence: "The concert was worth ___.", options: ["to attend", "attending", "attend", "attended"], correct: 1, explanation: "'Worth' is followed by a gerund: worth attending.", level: "B2" },
  { id: 28, sentence: "He runs faster ___ anyone in his class.", options: ["than", "as", "like", "from"], correct: 0, explanation: "Comparative + than for comparing two things.", level: "A1" },
  { id: 29, sentence: "The house ___ when we bought it.", options: ["painted", "was painting", "was painted", "has painted"], correct: 2, explanation: "Past simple passive: was painted (the house received the action).", level: "B1" },
  { id: 30, sentence: "No sooner ___ the door than the phone rang.", options: ["I opened", "did I open", "I did open", "had I opened"], correct: 3, explanation: "After 'no sooner', use past perfect + inversion: had I opened.", level: "C1" },
  { id: 31, sentence: "Each of the students ___ a textbook.", options: ["have", "has", "having", "had"], correct: 1, explanation: "'Each' is singular and takes a singular verb.", level: "A2" },
  { id: 32, sentence: "I'm used to ___ early in the morning.", options: ["wake", "waking", "waked", "woken"], correct: 1, explanation: "'Used to' is followed by a gerund: used to waking.", level: "B1" },
  { id: 33, sentence: "The film was ___ interesting that I watched it twice.", options: ["very", "too", "so", "such"], correct: 2, explanation: "'So...that' structure: so + adjective + that.", level: "B1" },
  { id: 34, sentence: "She would rather ___ tea than coffee.", options: ["drink", "to drink", "drinking", "drank"], correct: 0, explanation: "'Would rather' + base form: would rather drink.", level: "B1" },
  { id: 35, sentence: "I don't mind ___ the dishes.", options: ["do", "to do", "doing", "done"], correct: 2, explanation: "'Mind' is followed by a gerund: mind doing.", level: "A2" },
  { id: 36, sentence: "It's no use ___ about it now.", options: ["worry", "to worry", "worrying", "worried"], correct: 2, explanation: "'It's no use' is followed by a gerund.", level: "B2" },
  { id: 37, sentence: "Hardly ___ I sat down when the doorbell rang.", options: ["had", "have", "did", "was"], correct: 0, explanation: "After 'hardly', use past perfect with inversion: hardly had.", level: "C1" },
  { id: 38, sentence: "She spoke ___ she were the boss.", options: ["like", "as if", "as", "than"], correct: 1, explanation: "'As if' + past subjunctive for hypothetical comparison.", level: "B2" },
  { id: 39, sentence: "The letter ___ be hers — she's been away for a week.", options: ["must", "can't", "might", "could"], correct: 1, explanation: "'Can't' for negative deduction based on evidence.", level: "B2" },
  { id: 40, sentence: "He asked me where I ___.", options: ["live", "lived", "was living", "am living"], correct: 1, explanation: "Reported speech: backshift from present to past tense.", level: "B1" },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTIONS_PER_ROUND = 8;

export function GrammarPage() {
  const [roundKey, setRoundKey] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { addXP } = useAuth();

  const exercises = useMemo(() => {
    return shuffleArray(allExercises).slice(0, QUESTIONS_PER_ROUND);
  }, [roundKey]);

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
    setRoundKey(prev => prev + 1);
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

            <div className="bg-surface-light rounded-xl p-4 mb-8">
              <p className="text-sm text-text-muted">
                {percentage >= 80 ? "Excellent work! New questions are waiting for you." : "Keep practicing! New questions each time."}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={handleRestart} className="btn-primary flex items-center gap-2">
                <Shuffle className="w-4 h-4" />
                New Questions
              </button>
              <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Grammar Practice</h1>
          <p className="text-text-secondary mt-1">New questions every time!</p>
        </motion.div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">Question {currentQ + 1} of {exercises.length}</span>
            <span className="text-sm text-primary font-medium">Score: {score}</span>
          </div>
          <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" animate={{ width: `${progress}%` }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${roundKey}-${currentQ}`}
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

            <div className="text-xl mb-8 leading-relaxed">
              {sentenceParts[0]}
              <span className="inline-block min-w-[120px] border-b-2 border-primary mx-2 text-center text-primary font-semibold">
                {showAnswer ? exercise.options[exercise.correct] : '?'}
              </span>
              {sentenceParts[1]}
            </div>

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

            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-4 ${selected === exercise.correct ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'}`}
              >
                <p className="text-sm">{exercise.explanation}</p>
              </motion.div>
            )}

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
