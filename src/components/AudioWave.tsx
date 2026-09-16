import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface AudioWaveProps {
  isActive: boolean;
  className?: string;
}

export function AudioWave({ isActive, className }: AudioWaveProps) {
  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary rounded-full"
          animate={
            isActive
              ? {
                  height: [8, 24, 16, 32, 8],
                }
              : { height: 8 }
          }
          transition={
            isActive
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

interface MicrophoneButtonProps {
  state: 'ready' | 'listening' | 'speaking' | 'processing' | 'finished';
  onClick: () => void;
}

export function MicrophoneButton({ state, onClick }: MicrophoneButtonProps) {
  const isActive = state === 'speaking' || state === 'listening';
  const isProcessing = state === 'processing';

  return (
    <motion.button
      onClick={onClick}
      disabled={isProcessing}
      className={cn(
        'relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300',
        isActive
          ? 'bg-primary shadow-glow-lg'
          : isProcessing
          ? 'bg-surface-light'
          : 'bg-gradient-to-br from-primary to-accent hover:shadow-glow'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
      
      {isProcessing ? (
        <motion.div
          className="w-8 h-8 border-3 border-text-muted border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <svg
          className="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      )}
    </motion.button>
  );
}
