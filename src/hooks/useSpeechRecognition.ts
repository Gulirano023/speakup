import { useState, useEffect, useCallback, useRef } from 'react';
import type { SpeakingState } from '../data/types';

export function useSpeechRecognition() {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [state, setState] = useState<SpeakingState>('ready');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
      };

      recognitionRef.current.onerror = () => {
        setState('ready');
      };

      recognitionRef.current.onend = () => {
        if (state === 'speaking') {
          setState('processing');
        }
      };
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript('');
      setState('listening');
      recognitionRef.current.start();
      setTimeout(() => setState('speaking'), 1000);
    } else {
      // Demo mode
      setState('speaking');
      setTimeout(() => {
        setTranscript("In my free time, I usually read books and practice English because I want to improve my speaking skills. I also enjoy watching movies and spending time with my friends.");
        setState('processing');
      }, 3000);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && state !== 'ready') {
      recognitionRef.current.stop();
    }
    setState('processing');
  }, [state]);

  const reset = useCallback(() => {
    setTranscript('');
    setState('ready');
  }, []);

  return { isSupported, transcript, state, startListening, stopListening, reset, setState };
}
