import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, ArrowRight, Play, CheckCircle2, MessageSquare, TrendingUp, RotateCcw } from 'lucide-react';
import { AudioWave } from '../components/AudioWave';

const steps = [
  { icon: MessageSquare, title: 'Choose a topic', description: 'Select from 12+ categories' },
  { icon: Mic, title: 'Speak', description: 'Record your answer' },
  { icon: TrendingUp, title: 'Get feedback', description: 'AI analyzes your speech' },
  { icon: CheckCircle2, title: 'Improve', description: 'Learn from mistakes' },
  { icon: RotateCcw, title: 'Try again', description: 'Track your progress' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SpeakUp</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">
              Sign In
            </Link>
            <Link to="/dashboard" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Speak English.{' '}
                <span className="gradient-text">Improve Faster.</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary max-w-lg">
                Practice speaking every day, get instant feedback, and build your confidence with AI-powered analysis.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/topics" className="btn-primary flex items-center gap-2">
                  Start Speaking
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/practice" className="btn-secondary flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Try Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                
                {/* Main card */}
                <div className="relative bg-surface/80 backdrop-blur-xl border border-border rounded-3xl p-8 h-full flex flex-col items-center justify-center">
                  <div className="mb-8">
                    <AudioWave isActive={true} className="h-16" />
                  </div>
                  
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                  
                  <p className="text-text-secondary text-center">
                    "What do you usually do in your free time?"
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm text-text-muted">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Listening...
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              Simple steps to improve your English speaking skills
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="card-hover text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-sm text-primary font-semibold mb-2">Step {index + 1}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need</h2>
            <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
              Powerful features to accelerate your English learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Feedback',
                description: 'Get instant analysis of your grammar, vocabulary, fluency, and pronunciation.',
                icon: '🤖',
              },
              {
                title: 'IELTS Practice',
                description: 'Specialized questions for IELTS Speaking Parts 1, 2, and 3.',
                icon: '📝',
              },
              {
                title: 'Progress Tracking',
                description: 'Monitor your improvement with detailed charts and statistics.',
                icon: '📊',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-hover"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border p-12 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to speak with confidence?
              </h2>
              <p className="text-text-secondary mb-8 max-w-xl mx-auto">
                Join thousands of learners improving their English speaking skills every day.
              </p>
              <Link to="/topics" className="btn-primary inline-flex items-center gap-2">
                Start Now - It's Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold gradient-text">SpeakUp</span>
          </div>
          <p className="text-sm text-text-muted">
            © 2026 SpeakUp. AI-powered English speaking practice.
          </p>
        </div>
      </footer>
    </div>
  );
}
