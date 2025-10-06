'use client';

import { Coins } from 'lucide-react';

interface TokenBadgeProps {
  balance: number;
  variant?: 'balance' | 'cost' | 'reward';
}

export function TokenBadge({ balance, variant = 'balance' }: TokenBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cost':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'reward':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getVariantStyles()}`}>
      <Coins className="w-4 h-4" />
      <span className="text-sm font-semibold">{balance}</span>
    </div>
  );
}
