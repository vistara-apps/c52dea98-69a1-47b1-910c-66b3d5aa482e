'use client';

import { useState, useEffect } from 'react';
import { useDebate } from '@/hooks/useDebate';
import { DebateCard } from './DebateCard';
import { VotePanel } from './VotePanel';
import { MessageList } from './MessageList';

interface DebateArenaProps {
  debateId?: string;
  question?: string;
}

export function DebateArena({ debateId, question = "Which came first: the chicken or the egg?" }: DebateArenaProps) {
  const { debate, isLoading, isLive, transcript, createDebate } = useDebate(debateId);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes

  // Create debate if none exists
  useEffect(() => {
    if (!debateId && !isLoading) {
      createDebate(question);
    }
  }, [debateId, isLoading, createDebate, question]);

  // Countdown timer
  useEffect(() => {
    if (!isLive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isLive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Loading debate...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = debate?.question || question;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <DebateCard
          question={currentQuestion}
          isLive={isLive}
          timeRemaining={formatTime(timeRemaining)}
        />
        <MessageList messages={transcript} />
      </div>
      <div className="lg:col-span-1">
        <VotePanel
          debateId={debate?.id || 'default'}
          isLive={isLive}
        />
      </div>
    </div>
  );
}
