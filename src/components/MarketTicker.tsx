import { MARKET_INDICES } from '../data/markets'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { formatNumber } from '../lib/utils'

export function MarketTicker() {
  // Show the first 9 indices in a ticker strip
  const tickerItems = MARKET_INDICES.slice(0, 9)
  const display = [...tickerItems, ...tickerItems]

  return (
    <div className="relative overflow-hidden bg-zinc-950 border-y border-zinc-800/60 h-9">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="flex items-center h-full ticker-scroll whitespace-nowrap">
        {display.map((m, i) => {
          const up = m.change >= 0
          return (
            <div key={`${m.symbol}-${i}`} className="flex items-center gap-2 px-5 h-full border-r border-zinc-900 text-xs">
              <span className="font-semibold text-zinc-300">{m.symbol}</span>
              <span className="font-mono text-zinc-100">{formatNumber(m.level)}</span>
              <span
                className={`flex items-center gap-0.5 font-mono font-medium ${
                  up ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {up ? '+' : ''}
                {formatNumber(m.change)} ({up ? '+' : ''}
                {formatNumber(m.changePercent)}%)
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}