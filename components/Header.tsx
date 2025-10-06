'use client';

import { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useWallet } from '@/hooks/useWallet';
import { useTokens } from '@/hooks/useTokens';
import { TokenBadge } from './TokenBadge';
import { TokenPurchase } from './TokenPurchase';
import { Trophy, Plus } from 'lucide-react';

export function Header() {
  const { user, isConnected } = useWallet();
  const { balance } = useTokens();
  const [showTokenPurchase, setShowTokenPurchase] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-surface/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-glow">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  ChickenEgg Arena
                </h1>
                <p className="text-sm text-muted">AI Debate Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isConnected && (
                <div className="flex items-center gap-2">
                  <TokenBadge balance={balance} />
                  <button
                    onClick={() => setShowTokenPurchase(true)}
                    className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
                    title="Buy Tokens"
                  >
                    <Plus className="w-4 h-4 text-primary" />
                  </button>
                </div>
              )}
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      <TokenPurchase
        isOpen={showTokenPurchase}
        onClose={() => setShowTokenPurchase(false)}
      />
    </>
  );
}
