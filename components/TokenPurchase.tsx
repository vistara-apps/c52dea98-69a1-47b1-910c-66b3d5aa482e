'use client'

import { useState } from 'react'
import { useTokens } from '@/hooks/useTokens'
import { X, Star } from 'lucide-react'

interface TokenPurchaseProps {
  isOpen: boolean
  onClose: () => void
}

export function TokenPurchase({ isOpen, onClose }: TokenPurchaseProps) {
  const { buyTokens, packages, isLoading } = useTokens()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  if (!isOpen) return null

  const handlePurchase = async (packageId: string) => {
    setSelectedPackage(packageId)
    const success = await buyTokens(packageId)
    if (success) {
      onClose()
    }
    setSelectedPackage(null)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-fg">Purchase Tokens</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface/80 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted mb-6">
          Get tokens to vote in debates, create custom debates, and earn rewards!
        </p>

        <div className="space-y-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-4 rounded-lg border transition-all cursor-pointer ${
                pkg.popular
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-surface/50 hover:bg-surface/80'
              }`}
              onClick={() => handlePurchase(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-2 -right-2 bg-accent text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-fg">{pkg.tokens} Tokens</span>
                    <span className="text-sm text-muted">(${pkg.price})</span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    ${(pkg.price / pkg.tokens * 100).toFixed(0)} per 100 tokens
                  </p>
                </div>

                <button
                  disabled={isLoading && selectedPackage === pkg.id}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pkg.popular
                      ? 'bg-accent text-black hover:bg-accent/80'
                      : 'bg-primary text-white hover:bg-primary/80'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading && selectedPackage === pkg.id ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-surface/50 rounded-lg">
          <p className="text-xs text-muted">
            💡 <strong>Pro tip:</strong> Tokens never expire and you earn 2 tokens for every correct vote!
          </p>
        </div>
      </div>
    </div>
  )
}

