import type { Topic } from './types';

export const topics: Topic[] = [
  {
    id: 'daily-life',
    title: 'Daily Life',
    description: 'Talk about your everyday routines and habits',
    icon: '🌅',
    category: 'daily',
    questions: [
      { id: 'dl-1', text: 'What do you usually do in your free time?', timeLimit: 60 },
      { id: 'dl-2', text: 'Describe your typical morning routine.', timeLimit: 60 },
      { id: 'dl-3', text: 'What did you do last weekend?', timeLimit: 60 },
    ],
  },
  {
    id: 'school',
    title: 'School',
    description: 'Discuss your school experiences and education',
    icon: '📚',
    category: 'daily',
    questions: [
      { id: 'sc-1', text: 'What is your favorite subject and why?', timeLimit: 60 },
      { id: 'sc-2', text: 'Describe your school in detail.', timeLimit: 60 },
      { id: 'sc-3', text: 'How has school changed you as a person?', timeLimit: 60 },
    ],
  },
  {
    id: 'friends',
    title: 'Friends',
    description: 'Share about your friendships and social life',
    icon: '👥',
    category: 'daily',
    questions: [
      { id: 'fr-1', text: 'Describe your best friend.', timeLimit: 60 },
      { id: 'fr-2', text: 'How do you usually spend time with friends?', timeLimit: 60 },
      { id: 'fr-3', text: 'What qualities do you value in a friend?', timeLimit: 60 },
    ],
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Talk about your family members and relationships',
    icon: '👨‍👩‍👧‍👦',
    category: 'daily',
    questions: [
      { id: 'fm-1', text: 'Tell me about your family.', timeLimit: 60 },
      { id: 'fm-2', text: 'Who are you closest to in your family?', timeLimit: 60 },
      { id: 'fm-3', text: 'Describe a memorable family event.', timeLimit: 60 },
    ],
  },
  {
    id: 'travel',
    title: 'Travel',
    description: 'Discuss your travel experiences and dream destinations',
    icon: '✈️',
    category: 'daily',
    questions: [
      { id: 'tr-1', text: 'What is the best place you have ever visited?', timeLimit: 60 },
      { id: 'tr-2', text: 'Where would you like to travel next?', timeLimit: 60 },
      { id: 'tr-3', text: 'Describe your dream vacation.', timeLimit: 60 },
    ],
  },
  {
    id: 'food',
    title: 'Food',
    description: 'Share your food preferences and cooking experiences',
    icon: '🍕',
    category: 'daily',
    questions: [
      { id: 'fd-1', text: 'What is your favorite food?', timeLimit: 60 },
      { id: 'fd-2', text: 'Do you enjoy cooking? Why or why not?', timeLimit: 60 },
      { id: 'fd-3', text: 'Describe a memorable meal you had.', timeLimit: 60 },
    ],
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'Discuss your views on technology and gadgets',
    icon: '💻',
    category: 'daily',
    questions: [
      { id: 'tc-1', text: 'How do you use technology in your daily life?', timeLimit: 60 },
      { id: 'tc-2', text: 'What is your favorite app and why?', timeLimit: 60 },
      { id: 'tc-3', text: 'How has technology changed the way we communicate?', timeLimit: 60 },
    ],
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    description: 'Talk about your interests and leisure activities',
    icon: '🎨',
    category: 'daily',
    questions: [
      { id: 'hb-1', text: 'What are your hobbies?', timeLimit: 60 },
      { id: 'hb-2', text: 'How did you start your favorite hobby?', timeLimit: 60 },
      { id: 'hb-3', text: 'Why are hobbies important for mental health?', timeLimit: 60 },
    ],
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Discuss environmental issues and sustainability',
    icon: '🌍',
    category: 'daily',
    questions: [
      { id: 'ev-1', text: 'What can we do to protect the environment?', timeLimit: 60 },
      { id: 'ev-2', text: 'How does climate change affect your country?', timeLimit: 60 },
      { id: 'ev-3', text: 'Describe an environmental problem in your area.', timeLimit: 60 },
    ],
  },
  {
    id: 'ielts-part1',
    title: 'IELTS Part 1',
    description: 'Practice IELTS Speaking Part 1 questions',
    icon: '📝',
    category: 'ielts',
    questions: [
      { id: 'ip1-1', text: 'Do you work or study?', timeLimit: 45 },
      { id: 'ip1-2', text: 'What do you like about your hometown?', timeLimit: 45 },
      { id: 'ip1-3', text: 'Do you prefer to travel by car or public transport?', timeLimit: 45 },
    ],
  },
  {
    id: 'ielts-part2',
    title: 'IELTS Part 2',
    description: 'Practice IELTS Speaking Part 2 cue cards',
    icon: '📋',
    category: 'ielts',
    questions: [
      { id: 'ip2-1', text: 'Describe a place you visited recently. You should say: where it was, when you went there, what you did there, and explain why you enjoyed it.', timeLimit: 120 },
      { id: 'ip2-2', text: 'Describe a person who has influenced you. You should say: who this person is, how you know them, what they are like, and explain how they influenced you.', timeLimit: 120 },
    ],
  },
  {
    id: 'ielts-part3',
    title: 'IELTS Part 3',
    description: 'Practice IELTS Speaking Part 3 discussion',
    icon: '💬',
    category: 'ielts',
    questions: [
      { id: 'ip3-1', text: 'How has tourism changed in your country over the past decade?', timeLimit: 60 },
      { id: 'ip3-2', text: 'Do you think technology will replace teachers in the future?', timeLimit: 60 },
      { id: 'ip3-3', text: 'What are the advantages and disadvantages of living in a big city?', timeLimit: 60 },
    ],
  },
];

export const demoTranscript = "In my free time, I usually read books and practice English because I want to improve my speaking skills. I also enjoy watching movies and spending time with my friends. Sometimes I go for a walk in the park or play sports. I think having hobbies is important for relaxation and personal development.";

export const demoFeedback = {
  grammar: {
    score: 78,
    mistakes: [
      {
        original: "I usually reading books.",
        correction: "I usually read books.",
        explanation: 'After "usually", use the base form of the verb.',
      },
      {
        original: "I enjoy to watch movies.",
        correction: "I enjoy watching movies.",
        explanation: '"Enjoy" is followed by a gerund (-ing form), not an infinitive.',
      },
    ],
  },
  vocabulary: {
    score: 72,
    goodWords: ["improve", "practice", "relaxation", "development"],
    suggestedWords: ["enhance", "regularly", "leisure", "personal growth"],
  },
  fluency: {
    score: 68,
    speakingTime: 45,
    pauses: 5,
    repetitions: 2,
    fillerWords: 3,
    tip: "Try to connect your ideas with linking words like 'Furthermore', 'In addition', or 'However'.",
  },
  pronunciation: {
    score: 75,
    wordsToPractice: ["comfortable", "environment", "opportunity", "development"],
  },
};
