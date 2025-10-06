'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { TokenBadge } from './TokenBadge';
import { Trophy } from 'lucide-react';

export function Header() {
  return (
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
            <TokenBadge balance={100} />
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
  );
}
