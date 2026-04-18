'use client'

import { useState } from 'react'

type TraderStatus = 'ACTIVE' | 'PAUSED' | 'WATCH'

export interface TraderCardProps {
  traderId: string
  name: string
  status: TraderStatus
  strategyNote?: string
  lastUpdate?: string
  isFollowed?: boolean
  onFollow?: (traderId: string) => void
}

export default function TraderCard({
  traderId,
  name,
  status,
  strategyNote = 'Trades based on real-time market conditions.',
  lastUpdate = 'Just now',
  isFollowed = false,
  onFollow,
}: TraderCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getStatusStyles = () => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'PAUSED':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'WATCH':
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    }
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-[#0B0F14] border border-white/5 shadow-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white text-base font-semibold">{name}</div>
          <div className="text-xs text-white/40">ID: {traderId}</div>
        </div>

        <div className={`px-2 py-1 text-xs rounded-md border ${getStatusStyles()}`}>
          {status}
        </div>
      </div>

      <div className="text-xs text-white/60 leading-relaxed">
        Real trades. Performance varies. No guaranteed outcomes.
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => onFollow && onFollow(traderId)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            isFollowed
              ? 'bg-white/10 text-white border border-white/10'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {isFollowed ? 'Following' : 'Follow'}
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-white/40 hover:text-white/70 px-2"
        >
          {expanded ? 'Less' : 'More'}
        </button>
      </div>

      {expanded && (
        <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-white/60">
          <div>
            <span className="text-white/40">Strategy:</span> {strategyNote}
          </div>
          <div>
            <span className="text-white/40">Last update:</span> {lastUpdate}
          </div>
        </div>
      )}
    </div>
  )
}