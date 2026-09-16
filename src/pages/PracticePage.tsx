import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Pause, Play, Square } from 'lucide-react';
import { MicrophoneButton, AudioWave } from '../components/AudioWave';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { topics } from '../data/mockData';
import type { SpeakingState } from '../data/types';

export function PracticePage() {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic') || 'daily-life';
  const topic = topics.find(t => t.id === topicId) || topics[0];
  const question = topic.questions[0];

  const { isSupported, transcript, state, startListening, stopListening, reset, setState } = useSpeechRecognition();
  const [time, setTime] = useState(question.timeLimit);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      setIsTimerRunning(false);
      if (state === 'speaking') {
        stopListening();
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, time, state, stopListening]);

  const handleMicrophoneClick = () => {
    if (state === 'ready') {
      startListening();
      setIsTimerRunning(true);
    } else if (state === 'speaking' || state === 'listening') {
      stopListening();
      setIsTimerRunning(false);
    }
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    if (state === 'speaking') {
      stopListening();
    }
  };

  const handleResume = () => {
    setIsTimerRunning(true);
    if (state === 'processing') {
      startListening();
    }
  };

  const handleFinish = () => {
    setIsTimerRunning(false);
    if (state === 'speaking' || state === 'listening') {
      stopListening();
    }
    setState('finished');
  };

  const handleReset = () => {
    reset();
    setTime(question.timeLimit);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStateLabel = (state: SpeakingState) => {
    switch (state) {
      case 'ready': return 'Ready to speak';
      case 'listening': return 'Listening...';
      case 'speaking': return 'Speaking...';
      case 'processing': return 'Analyzing your speech...';
      case 'finished': return 'Complete!';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/topics" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Topics
          </Link>
          <div className="flex items-center gap-2 text-sm text-primary mb-2">
            <span>{topic.icon}</span>
            <span>{topic.title}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center">
          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card w-full mb-8 text-center"
          >
            <p className="text-lg sm:text-xl text-text-secondary italic">
              "{question.text}"
            </p>
          </motion.div>

          {/* Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className={`text-6xl sm:text-7xl font-mono font-bold ${time <= 10 ? 'text-error' : 'text-text-primary'}`}>
              {formatTime(time)}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-text-muted">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time remaining</span>
            </div>
          </motion.div>

          {/* Microphone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <MicrophoneButton state={state} onClick={handleMicrophoneClick} />
          </motion.div>

          {/* State Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2">
              {state === 'speaking' && (
                <AudioWave isActive={true} className="h-6" />
              )}
              <span className="text-text-secondary">{getStateLabel(state)}</span>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            {(state === 'speaking' || state === 'listening') && (
              <>
                <button
                  onClick={handlePause}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
                <button
                  onClick={handleFinish}
                  className="bg-error/10 text-error hover:bg-error/20 font-semibold px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Finish
                </button>
              </>
            )}
            {state === 'processing' && (
              <button
                onClick={handleResume}
                className="btn-primary flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Resume
              </button>
            )}
            {state === 'finished' && (
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                Try Again
              </button>
            )}
          </motion.div>

          {/* Transcript */}
          <AnimatePresence>
            {(transcript || state === 'finished') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card w-full mb-8"
              >
                <h3 className="text-sm font-semibold text-text-muted mb-3">Your Response</h3>
                <p className="text-text-secondary leading-relaxed">
                  {transcript || "No speech detected. Try again!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          {state === 'finished' && transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/transcript" className="btn-primary">
                View Transcript
              </Link>
              <Link to="/feedback" className="btn-secondary">
                Get AI Feedback
              </Link>
            </motion.div>
          )}

          {/* Browser not supported warning */}
          {!isSupported && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card w-full bg-warning/10 border-warning/20"
            >
              <p className="text-warning text-sm">
                ⚠️ Speech recognition is not supported in your browser. Using demo mode.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
