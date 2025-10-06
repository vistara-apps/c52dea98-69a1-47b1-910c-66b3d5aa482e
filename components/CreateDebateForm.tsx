'use client'

import { useState } from 'react'
import { useTokens } from '@/hooks/useTokens'
import { useDebate } from '@/hooks/useDebate'
import { X, Sparkles, Brain, Zap } from 'lucide-react'

interface CreateDebateFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (debateId: string) => void
}

const PERSONALITIES = [
  { id: 'aggressive', name: 'Aggressive', description: 'Street-smart, sarcastic, confident', icon: '🐔' },
  { id: 'logical', name: 'Logical', description: 'Philosophical, calm, analytical', icon: '🥚' },
  { id: 'sarcastic', name: 'Sarcastic', description: 'Witty, humorous, mocking', icon: '😏' },
  { id: 'formal', name: 'Formal', description: 'Proper, academic, structured', icon: '🎩' },
  { id: 'meme', name: 'Meme Lord', description: 'Internet culture, viral, absurd', icon: '😂' },
  { id: 'zen', name: 'Zen Master', description: 'Peaceful, enlightened, profound', icon: '🧘' }
]

export function CreateDebateForm({ isOpen, onClose, onSuccess }: CreateDebateFormProps) {
  const { canAfford, payForDebate } = useTokens()
  const { createDebate } = useDebate()

  const [question, setQuestion] = useState('')
  const [chickenPersonality, setChickenPersonality] = useState('aggressive')
  const [eggPersonality, setEggPersonality] = useState('logical')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tokenCost = 5 // Base cost for custom debate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim() || !canAfford(tokenCost)) {
      return
    }

    setIsSubmitting(true)
    try {
      // Pay for the debate
      const paymentSuccess = await payForDebate(tokenCost)
      if (!paymentSuccess) {
        alert('Payment failed. Please try again.')
        return
      }

      // Create the debate
      const engine = await createDebate(
        question.trim(),
        chickenPersonality,
        eggPersonality,
        undefined, // No tournament
        'current-user-fid' // Would be from wallet context
      )

      if (engine) {
        onSuccess?.('new-debate-id') // Would get actual ID
        onClose()
        // Reset form
        setQuestion('')
        setChickenPersonality('aggressive')
        setEggPersonality('logical')
      }
    } catch (error) {
      console.error('Failed to create debate:', error)
      alert('Failed to create debate. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-fg">Create Custom Debate</h2>
              <p className="text-sm text-muted">Design your own philosophical showdown</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/80 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">
              Debate Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., Is a hot dog a sandwich?"
              className="w-full p-3 bg-surface border border-border rounded-lg text-fg placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              required
            />
            <p className="text-xs text-muted mt-1">
              Make it philosophical and debatable for the best results!
            </p>
          </div>

          {/* Chicken Personality */}
          <div>
            <label className="block text-sm font-medium text-fg mb-3 flex items-center gap-2">
              <span className="text-orange-400">🐔</span>
              Chicken Personality
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PERSONALITIES.map((personality) => (
                <button
                  key={`chicken-${personality.id}`}
                  type="button"
                  onClick={() => setChickenPersonality(personality.id)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    chickenPersonality === personality.id
                      ? 'border-orange-400 bg-orange-400/10'
                      : 'border-border bg-surface/50 hover:bg-surface/80'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{personality.icon}</span>
                    <span className="font-medium text-sm">{personality.name}</span>
                  </div>
                  <p className="text-xs text-muted">{personality.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Egg Personality */}
          <div>
            <label className="block text-sm font-medium text-fg mb-3 flex items-center gap-2">
              <span className="text-yellow-400">🥚</span>
              Egg Personality
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PERSONALITIES.map((personality) => (
                <button
                  key={`egg-${personality.id}`}
                  type="button"
                  onClick={() => setEggPersonality(personality.id)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    eggPersonality === personality.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-border bg-surface/50 hover:bg-surface/80'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{personality.icon}</span>
                    <span className="font-medium text-sm">{personality.name}</span>
                  </div>
                  <p className="text-xs text-muted">{personality.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cost and Preview */}
          <div className="glass-card p-4 bg-surface/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-fg">Creation Cost</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">{tokenCost}</span>
                <span className="text-sm text-muted">tokens</span>
              </div>
            </div>

            {!canAfford(tokenCost) && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg mb-3">
                <p className="text-red-400 text-sm">
                  Insufficient tokens! You need {tokenCost} tokens to create a debate.
                </p>
              </div>
            )}

            <div className="text-xs text-muted">
              <p>💡 Your debate will start immediately and run for 2-3 minutes</p>
              <p>🎭 AI agents will debate using the personalities you selected</p>
              <p>🏆 Community votes determine the winner</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-surface hover:bg-surface/80 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!question.trim() || !canAfford(tokenCost) || isSubmitting}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Create Debate ({tokenCost} tokens)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

