'use client';

import { Clock, Radio } from 'lucide-react';

interface DebateCardProps {
  question: string;
  isLive: boolean;
  timeRemaining: string;
}

export function DebateCard({ question, isLive, timeRemaining }: DebateCardProps) {
  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-fg mb-2">{question}</h2>
          <p className="text-muted">Watch AI agents debate in real-time</p>
        </div>
        {isLive && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 rounded-full border border-red-500/30">
            <Radio className="w-4 h-4 text-red-400 live-indicator" />
            <span className="text-red-400 font-semibold text-sm">LIVE</span>
          </div>
        )}
      </div>
      
      {isLive && (
        <div className="flex items-center gap-2 text-muted">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Time remaining: {timeRemaining}</span>
        </div>
      )}
    </div>
  );
}
