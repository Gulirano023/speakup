import { UserLevel } from '../contexts/AuthContext';

export interface PlacementQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  level: UserLevel;
  category: 'grammar' | 'vocabulary' | 'reading';
}

export const placementTest: PlacementQuestion[] = [
  // A1
  { id: 1, question: "She ___ a student.", options: ["am", "is", "are", "be"], correct: 1, level: "A1", category: "grammar" },
  { id: 2, question: "I ___ two cats.", options: ["has", "have", "having", "haves"], correct: 1, level: "A1", category: "grammar" },
  { id: 3, question: "What is the opposite of 'big'?", options: ["tall", "small", "fast", "hot"], correct: 1, level: "A1", category: "vocabulary" },
  { id: 4, question: "They ___ to school every day.", options: ["goes", "go", "going", "gone"], correct: 1, level: "A1", category: "grammar" },
  // A2
  { id: 5, question: "She ___ already finished her homework.", options: ["have", "has", "had", "having"], correct: 1, level: "A2", category: "grammar" },
  { id: 6, question: "I have been living here ___ 2020.", options: ["from", "since", "for", "during"], correct: 1, level: "A2", category: "grammar" },
  { id: 7, question: "What does 'enormous' mean?", options: ["tiny", "huge", "normal", "quick"], correct: 1, level: "A2", category: "vocabulary" },
  { id: 8, question: "If it rains, I ___ stay at home.", options: ["will", "would", "am going", "do"], correct: 0, level: "A2", category: "grammar" },
  // B1
  { id: 9, question: "The book ___ by J.K. Rowling was amazing.", options: ["writing", "written", "wrote", "write"], correct: 1, level: "B1", category: "grammar" },
  { id: 10, question: "I wish I ___ more time to travel.", options: ["have", "has", "had", "having"], correct: 2, level: "B1", category: "grammar" },
  { id: 11, question: "What does 'ubiquitous' mean?", options: ["rare", "everywhere", "unique", "ancient"], correct: 1, level: "B1", category: "vocabulary" },
  { id: 12, question: "He denied ___ the money.", options: ["steal", "stealing", "to steal", "stolen"], correct: 1, level: "B1", category: "grammar" },
  // B2
  { id: 13, question: "Had I known about the meeting, I ___ attended.", options: ["would have", "will have", "had", "have"], correct: 0, level: "B2", category: "grammar" },
  { id: 14, question: "The report needs to ___ by tomorrow.", options: ["complete", "be completed", "completing", "completed"], correct: 1, level: "B2", category: "grammar" },
  { id: 15, question: "What does 'ambiguous' mean?", options: ["clear", "uncertain", "obvious", "simple"], correct: 1, level: "B2", category: "vocabulary" },
  { id: 16, question: "She suggested that he ___ a doctor.", options: ["sees", "see", "seeing", "saw"], correct: 1, level: "B2", category: "grammar" },
  // C1
  { id: 17, question: "Not only ___ the project, but she also mentored the team.", options: ["she completed", "did she complete", "she did complete", "completed she"], correct: 1, level: "C1", category: "grammar" },
  { id: 18, question: "What does 'ephemeral' mean?", options: ["permanent", "short-lived", "eternal", "massive"], correct: 1, level: "C1", category: "vocabulary" },
  { id: 19, question: "The article was ___ verbose that few could finish it.", options: ["such", "so", "very", "too"], correct: 1, level: "C1", category: "grammar" },
  // C2
  { id: 20, question: "What does 'antithetical' mean?", options: ["similar", "opposite", "related", "parallel"], correct: 1, level: "C2", category: "vocabulary" },
];

export function calculateLevel(answers: number[]): UserLevel {
  let score = 0;
  answers.forEach((answer, index) => {
    if (answer === placementTest[index].correct) score++;
  });

  const percentage = (score / placementTest.length) * 100;

  if (percentage >= 90) return 'C2';
  if (percentage >= 80) return 'C1';
  if (percentage >= 65) return 'B2';
  if (percentage >= 50) return 'B1';
  if (percentage >= 35) return 'A2';
  return 'A1';
}
