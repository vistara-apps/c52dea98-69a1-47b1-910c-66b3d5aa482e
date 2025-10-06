'use client';

import { useState, useEffect } from 'react';
import { getActiveTournament } from '@/lib/database';
import { Trophy, Clock } from 'lucide-react';
import type { Tournament } from '@/types/database';

export function TournamentBanner() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const loadTournament = async () => {
      try {
        const activeTournament = await getActiveTournament();
        setTournament(activeTournament);
      } catch (error) {
        console.error('Failed to load tournament:', error);
      }
    };

    loadTournament();
  }, []);

  useEffect(() => {
    if (!tournament) return;

    const updateTimeLeft = () => {
      const now = new Date();
      const end = new Date(tournament.endDate);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        setTimeLeft(`${days}d left`);
      } else {
        setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')} left`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [tournament]);

  if (!tournament) {
    return (
      <div className="glass-card p-6 mb-8 border-2 border-accent/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-muted mx-auto mb-2" />
            <p className="text-muted">No active tournament</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 mb-8 border-2 border-accent/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-glow">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-fg">{tournament.name} LIVE!</h2>
            <p className="text-muted">{tournament.theme} - Vote to win ${tournament.prizePool}!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30">
          <Clock className="w-5 h-5 text-red-400 live-indicator" />
          <span className="text-red-400 font-semibold">{timeLeft}</span>
        </div>
      </div>
    </div>
  );
}
