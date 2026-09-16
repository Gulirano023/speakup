import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { demoTranscript } from '../data/mockData';

export function TranscriptPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(demoTranscript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightWords = ['usually', 'read books', 'practice English', 'improve', 'speaking skills', 'enjoy', 'friends'];

  const renderTranscript = () => {
    let result = demoTranscript;
    highlightWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, '|||$1|||');
    });
    
    const parts = result.split('|||');
    return parts.map((part, index) => {
      if (highlightWords.some(w => w.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={index} className="text-primary bg-primary/10 px-1 rounded">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
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
          <Link to="/practice" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Practice
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Transcript</h1>
          <p className="mt-2 text-text-secondary">Review what you said</p>
        </motion.div>

        {/* Transcript Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Your Response</h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-success" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          
          <div className="bg-surface-light rounded-xl p-6">
            <p className="text-lg leading-relaxed text-text-secondary">
              "{renderTranscript()}"
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-text-muted">
            <span className="w-3 h-3 rounded-full bg-primary/20" />
            <span>Highlighted words are key vocabulary</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link to="/feedback" className="btn-primary">
            Get AI Feedback
          </Link>
          <Link to="/practice" className="btn-secondary">
            Practice Again
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
