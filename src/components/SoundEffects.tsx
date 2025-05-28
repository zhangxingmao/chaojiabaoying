'use client';

import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  onButtonClick?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  onHover?: () => void;
}

export default function SoundEffects({ onButtonClick, onSuccess, onError, onHover }: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, []);

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const playButtonClick = () => {
    playTone(800, 0.1, 'square', 0.05);
    setTimeout(() => playTone(1000, 0.1, 'square', 0.03), 50);
  };

  const playSuccess = () => {
    playTone(523, 0.2, 'sine', 0.1); // C5
    setTimeout(() => playTone(659, 0.2, 'sine', 0.1), 100); // E5
    setTimeout(() => playTone(784, 0.3, 'sine', 0.1), 200); // G5
  };

  const playError = () => {
    playTone(300, 0.3, 'sawtooth', 0.1);
    setTimeout(() => playTone(250, 0.3, 'sawtooth', 0.1), 150);
  };

  const playHover = () => {
    playTone(600, 0.05, 'sine', 0.02);
  };

  useEffect(() => {
    if (onButtonClick) {
      playButtonClick();
    }
  }, [onButtonClick]);

  useEffect(() => {
    if (onSuccess) {
      playSuccess();
    }
  }, [onSuccess]);

  useEffect(() => {
    if (onError) {
      playError();
    }
  }, [onError]);

  useEffect(() => {
    if (onHover) {
      playHover();
    }
  }, [onHover]);

  return null;
} 