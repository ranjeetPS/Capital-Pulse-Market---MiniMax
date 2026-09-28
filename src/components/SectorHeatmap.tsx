import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { SECTORS } from '../data/sectors'
import { NEWS } from '../data/news'
import type { CountryCode } from '../lib/utils'

interface Props {
  countries: CountryCode[]
  onSectorClick?: (slug: string) => void
  activeSector?: string
}

export function SectorHeatmap({ countries, onSectorClick, activeSector }: Props) {
  const filtered = countries.length === 0 ? NEWS : NEWS.filter((n) => countries.includes(n.country))

  const sectorStats = SECTORS.filter((s) => s.slug !== 'all')
    .map((s) => {
      const sectorNews = filtered.filter((n) => n.sector === s.slug)
      const highImpact = sectorNews.filter((n) => n.severity === 'high').length
      const total = sectorNews.length
      // Synthetic but realistic performance based on news tone
      const sentiment =
        total === 0 ? 0 : ((highImpact * 1.5 + (total - highImpact) * 0.4) / total) * (Math.random() * 0.8 + 0.6)
      return { sector: s, total, highImpact, performance: sentiment }
    })
    .filter((s) => s.total > 0)
    .sort((a, b) => b.performance - a.performance)

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-zinc-800/80">
        <Layers className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-bold text-zinc-100 tracking-tight">Sector Heatmap</h3>
        <span className="ml-auto text-[11px] text-zinc-500">
          {sectorStats.length} active sectors
        </span>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2">
        {sectorStats.length === 0 && (
          <div className="col-span-2 text-xs text-zinc-500 text-center py-6">
            No sector data for selected countries
          </div>
        )}
        {sectorStats.map(({ sector, total, highImpact, performance }, i) => {
          const isActive = activeSector === sector.slug
          const intensity = Math.min(1, performance / 2.5)
          return (
            <motion.button
              key={sector.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => onSectorClick?.(sector.slug)}
              className={`relative text-left p-3 rounded-lg border transition-all overflow-hidden group ${
                isActive
                  ? 'border-amber-500/60 bg-amber-500/10'
                  : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40'
              }`}
            >
              <div
                className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${sector.color}${Math.round(intensity * 60).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base leading-none">{sector.emoji}</span>
                  {highImpact > 0 && (
                    <span className="text-[10px] font-bold text-rose-400">
                      {highImpact} HIGH
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-zinc-100 leading-tight mb-0.5">
                  {sector.shortName}
                </div>
                <div className="text-[10px] text-zinc-500">{total} stories</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}