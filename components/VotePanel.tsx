'use client';

import { useState } from 'react';
import { useVoting } from '@/hooks/useVoting';
import { TokenBadge } from './TokenBadge';
import { Share2, TrendingUp } from 'lucide-react';

interface VotePanelProps {
  debateId: string;
  isLive: boolean;
}

export function VotePanel({ debateId, isLive }: VotePanelProps) {
  const {
    voteCounts,
    userVote,
    hasVoted,
    isLoading,
    canVote,
    castVote,
    chickenPercentage,
    eggPercentage
  } = useVoting(debateId);

  const [showConfetti, setShowConfetti] = useState(false);

  const handleVote = async (choice: 'chicken' | 'egg') => {
    const success = await castVote(choice);
    if (success) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 400);
    }
  };

  return (
    <div className="glass-card p-6 sticky top-24">
      <h3 className="text-xl font-bold text-fg mb-4">Cast Your Vote</h3>
      
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleVote('chicken')}
          disabled={!isLive || hasVoted || !canVote || isLoading}
          className={`w-full btn-chicken relative overflow-hidden ${
            userVote === 'chicken' ? 'ring-2 ring-orange-400' : ''
          } ${!isLive || hasVoted || !canVote ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            🐔 Vote Chicken
            {isLoading ? '...' : userVote === 'chicken' && <span className="text-xs">✓</span>}
          </span>
          {showConfetti && userVote === 'chicken' && (
            <div className="absolute inset-0 confetti-burst bg-gradient-to-r from-orange-400 to-orange-600"></div>
          )}
        </button>

        <button
          onClick={() => handleVote('egg')}
          disabled={!isLive || hasVoted || !canVote || isLoading}
          className={`w-full btn-egg relative overflow-hidden ${
            userVote === 'egg' ? 'ring-2 ring-yellow-400' : ''
          } ${!isLive || hasVoted || !canVote ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            🥚 Vote Egg
            {isLoading ? '...' : userVote === 'egg' && <span className="text-xs">✓</span>}
          </span>
          {showConfetti && userVote === 'egg' && (
            <div className="absolute inset-0 confetti-burst bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          )}
        </button>
      </div>

      {hasVoted && (
        <div className="mb-6 p-3 bg-success/20 border border-success/30 rounded-lg">
          <p className="text-success text-sm font-medium">
            ✓ Vote recorded! You earned 2 tokens for participating
          </p>
        </div>
      )}

      {!canVote && !hasVoted && (
        <div className="mb-6 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg">
          <p className="text-orange-400 text-sm font-medium">
            💰 Not enough tokens! Get more tokens to vote.
          </p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Cost per vote</span>
          <TokenBadge balance={1} variant="cost" />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-fg">🐔 Chicken</span>
            <span className="text-sm font-bold text-orange-400">{chickenPercentage}%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
              style={{ width: `${chickenPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted mt-1">{voteCounts.chicken.toLocaleString()} votes</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-fg">🥚 Egg</span>
            <span className="text-sm font-bold text-yellow-400">{eggPercentage}%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300"
              style={{ width: `${eggPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted mt-1">{voteCounts.egg.toLocaleString()} votes</p>
        </div>
      </div>

      <div className="pt-4 border-t border-border space-y-2">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-200">
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share Debate</span>
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-200">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">View Leaderboard</span>
        </button>
      </div>
    </div>
  );
}
