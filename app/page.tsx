import { DebateArena } from '@/components/DebateArena';
import { Header } from '@/components/Header';
import { TournamentBanner } from '@/components/TournamentBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <TournamentBanner />
        <DebateArena />
      </div>
    </main>
  );
}
