'use client'

import { useState, useEffect } from 'react'
import { getTournamentDebates, getActiveTournament } from '@/lib/database'
import { DebateCard } from './DebateCard'
import { Trophy, Clock, Users } from 'lucide-react'
import type { Debate, Tournament } from '@/types/database'

interface TournamentBracketProps {
  tournamentId?: string
}

export function TournamentBracket({ tournamentId }: TournamentBracketProps) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [debates, setDebates] = useState<Debate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTournament = async () => {
      try {
        let tournamentData: Tournament | null = null

        if (tournamentId) {
          // Load specific tournament
          // For now, we'll use a placeholder
          tournamentData = {
            id: tournamentId,
            name: 'Weekly Championship',
            theme: 'Philosophical Showdown',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            prizePool: 1000,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        } else {
          // Load active tournament
          tournamentData = await getActiveTournament()
        }

        setTournament(tournamentData)

        if (tournamentData) {
          const tournamentDebates = await getTournamentDebates(tournamentData.id)
          setDebates(tournamentDebates)
        }
      } catch (error) {
        console.error('Failed to load tournament:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTournament()
  }, [tournamentId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Loading tournament...</p>
        </div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-muted mx-auto mb-4" />
        <h3 className="text-xl font-bold text-fg mb-2">No Active Tournament</h3>
        <p className="text-muted">Check back later for the next tournament!</p>
      </div>
    )
  }

  const liveDebates = debates.filter(d => d.status === 'live')
  const upcomingDebates = debates.filter(d => d.status === 'scheduled')
  const completedDebates = debates.filter(d => d.status === 'completed')

  return (
    <div className="space-y-6">
      {/* Tournament Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-fg">{tournament.name}</h2>
            <p className="text-muted">{tournament.theme}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Trophy className="w-5 h-5" />
              ${tournament.prizePool} Prize Pool
            </div>
            <p className="text-sm text-muted">Weekly Championship</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Ends {new Date(tournament.endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {debates.length} Debates
          </div>
        </div>
      </div>

      {/* Live Debates */}
      {liveDebates.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-fg mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            Live Now
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveDebates.map((debate) => (
              <DebateCard
                key={debate.id}
                question={debate.question}
                isLive={true}
                timeRemaining="2:30"
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Debates */}
      {upcomingDebates.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-fg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted" />
            Coming Up
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingDebates.map((debate) => (
              <DebateCard
                key={debate.id}
                question={debate.question}
                isLive={false}
                timeRemaining="Scheduled"
                compact
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Debates */}
      {completedDebates.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-fg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-muted" />
            Completed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedDebates.map((debate) => (
              <DebateCard
                key={debate.id}
                question={debate.question}
                isLive={false}
                timeRemaining="Finished"
                compact
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

