import { DebateArena } from '@/components/DebateArena';
import { Header } from '@/components/Header';
import { TournamentBanner } from '@/components/TournamentBanner';
import { TournamentBracket } from '@/components/TournamentBracket';
import { Leaderboard } from '@/components/Leaderboard';
import { CreateDebateForm } from '@/components/CreateDebateForm';
import { useState } from 'react';
import { Plus, Trophy, TrendingUp } from 'lucide-react';

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'live' | 'tournament' | 'leaderboard'>('live');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <TournamentBanner />

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex bg-surface/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'live'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-fg'
              }`}
            >
              Live Debates
            </button>
            <button
              onClick={() => setActiveTab('tournament')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'tournament'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Tournament
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'leaderboard'
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-fg'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Leaderboard
            </button>
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Debate
          </button>
        </div>

        {/* Content */}
        {activeTab === 'live' && <DebateArena />}
        {activeTab === 'tournament' && <TournamentBracket />}
        {activeTab === 'leaderboard' && <Leaderboard />}
      </div>

      <CreateDebateForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </main>
  );
}
