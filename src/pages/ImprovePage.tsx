import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, ArrowRight } from 'lucide-react';

const improvements = [
  {
    number: 1,
    title: 'Main Idea',
    description: 'Start with a clear statement about your topic.',
    example: '"In my free time, I enjoy a variety of activities that help me relax and stay productive."',
  },
  {
    number: 2,
    title: 'Reason',
    description: 'Explain why you enjoy these activities.',
    example: '"I find reading particularly enjoyable because it allows me to explore new ideas and improve my vocabulary."',
  },
  {
    number: 3,
    title: 'Example',
    description: 'Give a specific example to support your point.',
    example: '"For instance, last week I finished a fascinating novel about technology that really changed my perspective."',
  },
  {
    number: 4,
    title: 'Result',
    description: 'Conclude with the impact or outcome.',
    example: '"As a result, I feel more creative and inspired in my daily life."',
  },
];

export function ImprovePage() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/feedback" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Feedback
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">Improve Your Answer</h1>
          <p className="mt-2 text-text-secondary">Make your response stronger with these tips</p>
        </motion.div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Your answer is good, but you can make it stronger by adding:</h3>
              <p className="text-text-secondary">Follow the structure below to create more comprehensive and impressive responses.</p>
            </div>
          </div>
        </motion.div>

        {/* Improvement Steps */}
        <div className="space-y-4 mb-8">
          {improvements.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <span className="font-bold">{item.number}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-text-secondary mb-3">{item.description}</p>
                  <div className="bg-surface-light rounded-xl p-4">
                    <p className="text-sm text-text-muted italic">{item.example}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Improved Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card mb-8"
        >
          <h3 className="font-semibold text-lg mb-4">Improved Version</h3>
          <div className="bg-surface-light rounded-xl p-6">
            <p className="text-text-secondary leading-relaxed">
              "In my free time, I enjoy a variety of activities that help me relax and stay productive. 
              I find reading particularly enjoyable because it allows me to explore new ideas and improve my vocabulary. 
              For instance, last week I finished a fascinating novel about technology that really changed my perspective. 
              As a result, I feel more creative and inspired in my daily life."
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/retry" className="btn-primary flex items-center gap-2">
            Try Again
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/topics" className="btn-secondary">
            Choose New Topic
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
