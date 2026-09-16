import { useState, useCallback } from 'react';

export function useTimer(initialTime: number = 60) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    setTime(newTime || initialTime);
    setIsRunning(false);
  }, [initialTime]);

  const tick = useCallback(() => {
    if (isRunning && time > 0) {
      setTime(prev => prev - 1);
    } else if (time === 0) {
      setIsRunning(false);
    }
  }, [isRunning, time]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return { time, isRunning, start, pause, reset, tick, formatTime };
}
