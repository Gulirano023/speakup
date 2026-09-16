import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Bot, User } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

const interviewQuestions = [
  "Tell me about your hometown.",
  "What do you like about your hometown?",
  "Has your hometown changed much over the years?",
  "Do you think it's important to preserve traditional architecture?",
  "How do you think cities will change in the future?",
];

export function InterviewPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: interviewQuestions[0],
      timestamp: new Date(),
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < interviewQuestions.length) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: interviewQuestions[nextQuestion],
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
        setCurrentQuestion(nextQuestion);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'ai',
          content: "Thank you for the interview! You did great. Let's review your performance.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      handleSendMessage("In my hometown, there are many beautiful parks and historical buildings. I especially enjoy walking along the river and visiting the old market area.");
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-surface/80 backdrop-blur-xl border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">AI Interview</h1>
              <p className="text-sm text-text-muted">IELTS Speaking Practice</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-text-muted">Live</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    message.role === 'ai' 
                      ? 'bg-gradient-to-br from-accent to-primary' 
                      : 'bg-surface-light'
                  }`}>
                    {message.role === 'ai' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-text-secondary" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.role === 'ai' 
                      ? 'bg-surface border border-border' 
                      : 'bg-primary text-white'
                  }`}>
                    <p className={message.role === 'ai' ? 'text-text-secondary' : ''}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${message.role === 'ai' ? 'text-text-muted' : 'text-white/60'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-surface border border-border rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <AudioWave isActive={true} className="h-4" />
                  <span className="text-sm text-text-muted">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-surface/80 backdrop-blur-xl border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={handleMicClick}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-error shadow-lg shadow-error/30'
                  : 'bg-primary hover:bg-primary-light shadow-glow'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </motion.button>

            {isRecording && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <AudioWave isActive={true} className="h-6" />
                <span className="text-sm text-text-muted">Listening...</span>
              </motion.div>
            )}

            {!isRecording && messages.length === 1 && (
              <p className="text-sm text-text-muted">
                Click the microphone to start speaking
              </p>
            )}
          </div>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1 bg-surface-light rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / interviewQuestions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-text-muted">
              {currentQuestion + 1} / {interviewQuestions.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
