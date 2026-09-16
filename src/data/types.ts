export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'daily' | 'ielts';
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  timeLimit: number;
}

export interface SpeakingSession {
  id: string;
  topicId: string;
  questionId: string;
  transcript: string;
  audioUrl?: string;
  duration: number;
  scores: SessionScores;
  feedback: Feedback;
  createdAt: string;
}

export interface SessionScores {
  grammar: number;
  vocabulary: number;
  fluency: number;
  pronunciation: number;
}

export interface Feedback {
  grammar: GrammarFeedback;
  vocabulary: VocabularyFeedback;
  fluency: FluencyFeedback;
  pronunciation: PronunciationFeedback;
}

export interface GrammarFeedback {
  mistakes: GrammarMistake[];
  score: number;
}

export interface GrammarMistake {
  original: string;
  correction: string;
  explanation: string;
}

export interface VocabularyFeedback {
  goodWords: string[];
  suggestedWords: string[];
  score: number;
}

export interface FluencyFeedback {
  speakingTime: number;
  pauses: number;
  repetitions: number;
  fillerWords: number;
  score: number;
  tip: string;
}

export interface PronunciationFeedback {
  wordsToPractice: string[];
  score: number;
}

export interface UserProgress {
  speakingMinutes: number;
  sessionsCompleted: number;
  streak: number;
  xp: number;
  weeklyData: WeeklyData[];
  skills: SkillProgress;
}

export interface WeeklyData {
  day: string;
  minutes: number;
  sessions: number;
}

export interface SkillProgress {
  grammar: number;
  vocabulary: number;
  fluency: number;
  pronunciation: number;
}

export type SpeakingState = 'ready' | 'listening' | 'speaking' | 'processing' | 'finished';

export interface InterviewMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
}
