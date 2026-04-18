'use client'

export type FollowMode = 'mirror' | 'alert'
export type FollowState = 'ready' | 'restricted' | 'paused' | 'insufficient'

interface Props {
  open: boolean
  traderName: string
  traderStatus: 'ACTIVE' | 'PAUSED' | 'WATCH'
  walletBalanceUsd: number
  minimumWalletUsd: number
  mode: FollowMode
  state: FollowState
  onClose: () => void
  onConfirm: () => void
  onModeChange: (mode: FollowMode) => void
}

export default function FollowModal({
  open,
  traderName,
  traderStatus,
  walletBalanceUsd,
  minimumWalletUsd,
  mode,
  state,
  onClose,
  onConfirm,
  onModeChange,
}: Props) {
  if (!open) return null

  const disabled =
    state === 'paused' ||
    state === 'restricted' ||
    state === 'insufficient'

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50">
      <div className="w-full max-w-md bg-[#0B0F14] rounded-t-2xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm text-white/70">Follow</h2>
          <button onClick={onClose} className="text-white/40">✕</button>
        </div>

        <div>
          <div className="text-base font-semibold">{traderName}</div>
          <div className="text-xs text-white/40">{traderStatus}</div>
        </div>

        <div className="text-xs text-white/40">
          Wallet: ${walletBalanceUsd} (min ${minimumWalletUsd})
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onModeChange('mirror')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              mode === 'mirror'
                ? 'bg-blue-600'
                : 'bg-[#11161C]'
            }`}
          >
            Mirror
          </button>
          <button
            onClick={() => onModeChange('alert')}
            className={`flex-1 py-2 rounded-lg text-sm ${
              mode === 'alert'
                ? 'bg-blue-600'
                : 'bg-[#11161C]'
            }`}
          >
            Alerts
          </button>
        </div>

        {state === 'restricted' && (
          <div className="text-xs text-yellow-400">
            Watch-only mode
          </div>
        )}

        {state === 'paused' && (
          <div className="text-xs text-yellow-400">
            Trader is paused
          </div>
        )}

        {state === 'insufficient' && (
          <div className="text-xs text-red-400">
            Insufficient balance
          </div>
        )}

        <button
          onClick={onConfirm}
          disabled={disabled}
          className={`w-full py-3 rounded-lg text-sm ${
            disabled
              ? 'bg-gray-700 text-white/40'
              : 'bg-blue-600'
          }`}
        >
          Confirm Follow
        </button>
      </div>
    </div>
  )
}
