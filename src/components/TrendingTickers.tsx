import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react'
import { TRENDING_TICKERS } from '../data/news'
import { formatNumber, type CountryCode } from '../lib/utils'
import { getCountry } from '../lib/utils'

interface Props {
  countries: CountryCode[]
  onCompanyClick?: (ticker: string) => void
}

export function TrendingTickers({ countries, onCompanyClick }: Props) {
  const filtered =
    countries.length === 0
      ? TRENDING_TICKERS
      : TRENDING_TICKERS.filter((t) => countries.includes(t.country))

  const display = filtered.length > 0 ? filtered : TRENDING_TICKERS.slice(0, 8)

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          </div>
          <h3 className="text-sm font-bold text-zinc-100 tracking-tight">Trending Tickers</h3>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">live</span>
      </div>
      <div className="divide-y divide-zinc-800/60">
        {display.slice(0, 10).map((t, i) => {
          const up = t.changePercent > 0
          const flat = t.changePercent === 0
          const country = getCountry(t.country)
          const TrendIcon = flat ? Minus : up ? TrendingUp : TrendingDown
          return (
            <motion.button
              key={t.ticker}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onCompanyClick?.(t.ticker)}
              className="w-full flex items-center justify-between gap-3 p-3 hover:bg-zinc-900/60 transition-colors text-left group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-xs">
                  {country.flag}
                </div>
                <div className="min-w-0">
                  <div className="font-mono font-bold text-amber-300 text-sm leading-tight group-hover:text-amber-200 transition-colors">
                    {t.ticker}
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate leading-tight">{t.name}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div
                  className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold ${
                    flat
                      ? 'text-zinc-400'
                      : up
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  {up ? '+' : ''}
                  {formatNumber(t.changePercent)}%
                </div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  {t.mentions} {t.mentions === 1 ? 'mention' : 'mentions'}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
      <div className="p-3 border-t border-zinc-800/60 bg-zinc-950/40">
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span>Source: aggregated news flow</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}