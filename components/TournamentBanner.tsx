'use client';

import { Trophy, Clock } from 'lucide-react';

export function TournamentBanner() {
  return (
    <div className="glass-card p-6 mb-8 border-2 border-accent/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-glow">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-fg">Weekly Tournament LIVE!</h2>
            <p className="text-muted">Vote in 8 debates to win prizes</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30">
          <Clock className="w-5 h-5 text-red-400 live-indicator" />
          <span className="text-red-400 font-semibold">2:45:30</span>
        </div>
      </div>
    </div>
  );
}
