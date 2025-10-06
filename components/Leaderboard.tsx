'use client'

import { useState, useEffect } from 'react'
import { getLeaderboard } from '@/lib/database'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import type { User } from '@/types/database'

interface LeaderboardProps {
  limit?: number
}

export function Leaderboard({ limit = 50 }: LeaderboardProps) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserFid, setCurrentUserFid] = useState<string | null>(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const leaderboard = await getLeaderboard(limit)
        setUsers(leaderboard)

        // In a real app, get current user from wallet context
        setCurrentUserFid('current-user-fid')
      } catch (error) {
        console.error('Failed to load leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLeaderboard()
  }, [limit])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-muted w-5 text-center">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black'
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600 text-black'
    return 'bg-surface'
  }

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-fg">Leaderboard</h2>
          <p className="text-sm text-muted">Top philosophers this week</p>
        </div>
      </div>

      <div className="space-y-2">
        {users.map((user, index) => {
          const rank = index + 1
          const isCurrentUser = user.fid === currentUserFid

          return (
            <div
              key={user.fid}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                isCurrentUser
                  ? 'bg-primary/10 border border-primary/30'
                  : 'bg-surface/50 hover:bg-surface/80'
              }`}
            >
              {/* Rank */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRankBadge(rank)}`}>
                {getRankIcon(rank)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-medium truncate ${isCurrentUser ? 'text-primary' : 'text-fg'}`}>
                    {user.username}
                    {isCurrentUser && <span className="text-xs text-primary ml-1">(You)</span>}
                  </p>
                  {user.avatarUrl && (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span>Level {user.level}</span>
                  <span>{user.votingPower} votes</span>
                  {user.badges.length > 0 && (
                    <span>{user.badges.length} badges</span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="text-sm font-bold text-fg">
                  {user.votingPower.toLocaleString()}
                </div>
                <div className="text-xs text-muted">points</div>
              </div>
            </div>
          )
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted">No users yet. Be the first to vote!</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-surface/50 rounded-lg">
        <p className="text-xs text-muted text-center">
          🏆 Rankings update in real-time • Earn points by voting correctly
        </p>
      </div>
    </div>
  )
}

