'use client'

import TraderCard from '@/components/TraderCard'

export default function HomePage() {
  const handleFollow = (id: string) => {
    console.log('Follow clicked:', id)
  }

  return (
    <main className="min-h-screen bg-[#05070A] text-white flex flex-col items-center px-4 py-10 space-y-6">
      <div className="w-full max-w-md space-y-2 text-center">
        <h1 className="text-xl font-semibold">OnlyTradeGreen</h1>
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
          onFollow={handleFollow}
        />

        <TraderCard
          traderId="T-002"
          name="Rotation Watch"
          status="WATCH"
          strategyNote="Tracks early rotation signals across alt markets."
          lastUpdate="5 min ago"
          onFollow={handleFollow}
        />

        <TraderCard
          traderId="T-003"
          name="Risk-Off Guard"
          status="PAUSED"
          strategyNote="Avoids trades during unstable BTC conditions."
          lastUpdate="10 min ago"
          onFollow={handleFollow}
        />
      </div>
    </main>
  )
}