'use client'

import { useState } from 'react'
import TraderCard from '@/components/TraderCard'
import FollowModal, { type FollowMode, type FollowState } from '@/components/FollowModal'

export default function HomePage() {
  const [followOpen, setFollowOpen] = useState(false)
  const [followMode, setFollowMode] = useState<FollowMode>('mirror')
  const [followState, setFollowState] = useState<FollowState>('ready')
  const [selectedTraderName, setSelectedTraderName] = useState('Momentum Core')
  const [selectedTraderStatus, setSelectedTraderStatus] = useState<'ACTIVE' | 'PAUSED' | 'WATCH'>('ACTIVE')

  const openFollow = (
    traderName: string,
    traderStatus: 'ACTIVE' | 'PAUSED' | 'WATCH',
    state: FollowState = 'ready'
  ) => {
    setSelectedTraderName(traderName)
    setSelectedTraderStatus(traderStatus)
    setFollowState(state)
    setFollowMode('mirror')
    setFollowOpen(true)
  }

  const handleConfirm = () => {
    console.log('Confirmed follow:', {
      trader: selectedTraderName,
      mode: followMode,
      state: followState,
    })
    setFollowOpen(false)
  }

  return (
    <>
      <main className="min-h-screen bg-[#05070A] text-white flex flex-col items-center px-4 py-10 space-y-6">
        <div className="w-full max-w-md space-y-2 text-center">
          <h1 className="text-xl font-semibold">OnlyTradeGreen LIVE</h1>
          <p className="text-sm text-white/50">
            Follow real traders. No fake stats. No promises.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <TraderCard
            traderId="T-001"
            name="Momentum Core"
            status="ACTIVE"
            strategyNote="Focus on short-term momentum bursts and rotation."
            lastUpdate="2 min ago"
            onFollow={() => openFollow('Momentum Core', 'ACTIVE', 'ready')}
          />

          <TraderCard
            traderId="T-002"
            name="Rotation Watch"
            status="WATCH"
            strategyNote="Tracks early rotation signals across alt markets."
            lastUpdate="5 min ago"
            onFollow={() => openFollow('Rotation Watch', 'WATCH', 'restricted')}
          />

          <TraderCard
            traderId="T-003"
            name="Risk-Off Guard"
            status="PAUSED"
            strategyNote="Avoids trades during unstable BTC conditions."
            lastUpdate="10 min ago"
            onFollow={() => openFollow('Risk-Off Guard', 'PAUSED', 'paused')}
          />
        </div>
      </main>

      <FollowModal
        open={followOpen}
        traderName={selectedTraderName}
        traderStatus={selectedTraderStatus}
        walletBalanceUsd={42}
        minimumWalletUsd={100}
        mode={followMode}
        state={followState}
        onClose={() => setFollowOpen(false)}
        onConfirm={handleConfirm}
        onModeChange={setFollowMode}
      />
    </>
  )
}
