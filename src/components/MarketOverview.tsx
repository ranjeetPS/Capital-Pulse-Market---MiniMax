import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Activity } from 'lucide-react'
import { formatNumber, type CountryCode } from '../lib/utils'
import { getIndicesForCountry } from '../data/markets'

interface Props {
  countries: CountryCode[]
}

export function MarketOverview({ countries }: Props) {
  const indices = countries.length > 0
    ? countries.flatMap((c) => getIndicesForCountry(c))
    : []

  if (indices.length === 0) {
    return (
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 text-center text-zinc-500">
        Select a country to view market indices
      </div>
    )
  }

  // Take the first 4-6 for display
  const display = indices.slice(0, 6)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {display.map((idx, i) => {
        const up = idx.change >= 0
        return (
          <motion.div
            key={`${idx.symbol}-${idx.country}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3.5 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
                {idx.symbol}
              </span>
              <Activity className={`w-3 h-3 ${up ? 'text-emerald-500/60' : 'text-rose-500/60'}`} />
            </div>
            <div className="text-zinc-400 text-xs mb-2 truncate">{idx.name}</div>
            <div className="font-mono text-base font-semibold text-zinc-50 mb-1.5 tracking-tight">
              {formatNumber(idx.level)}
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-mono font-medium ${
                up ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              <span>
                {up ? '+' : ''}
                {formatNumber(idx.change)}
              </span>
              <span className="text-zinc-500">·</span>
              <span>
                {up ? '+' : ''}
                {formatNumber(idx.changePercent)}%
              </span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}