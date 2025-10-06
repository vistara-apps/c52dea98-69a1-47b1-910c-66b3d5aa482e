'use client';

import { useState, useEffect } from 'react';
import { DebateCard } from './DebateCard';
import { VotePanel } from './VotePanel';
import { MessageList } from './MessageList';

interface Message {
  id: string;
  agent: 'chicken' | 'egg';
  text: string;
  timestamp: number;
}

export function DebateArena() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes

  // Simulate live debate messages
  useEffect(() => {
    if (!isLive) return;

    const sampleMessages = [
      { agent: 'chicken' as const, text: "I came first! Evolution clearly shows that birds evolved before they laid eggs." },
      { agent: 'egg' as const, text: "But the first chicken had to come FROM an egg! The egg came first, laid by a proto-chicken." },
      { agent: 'chicken' as const, text: "That's circular reasoning! What laid that proto-chicken egg? Another chicken!" },
      { agent: 'egg' as const, text: "No, it was a bird that wasn't quite a chicken yet. The egg contained the first true chicken DNA." },
      { agent: 'chicken' as const, text: "DNA mutations happen in the organism, not the egg. The chicken came first!" },
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < sampleMessages.length) {
        const newMessage = {
          ...sampleMessages[messageIndex],
          id: `msg-${Date.now()}-${messageIndex}`,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, newMessage]);
        messageIndex++;
      } else {
        clearInterval(interval);
        setIsLive(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <DebateCard
          question="Which came first: the chicken or the egg?"
          isLive={isLive}
          timeRemaining={formatTime(timeRemaining)}
        />
        <MessageList messages={messages} />
      </div>
      <div className="lg:col-span-1">
        <VotePanel
          chickenVotes={1247}
          eggVotes={1089}
          totalVotes={2336}
          isLive={isLive}
        />
      </div>
    </div>
  );
}
