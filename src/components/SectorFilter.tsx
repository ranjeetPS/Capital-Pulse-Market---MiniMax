import { motion } from 'framer-motion'
import { SECTORS, type SectorSlug, getSector } from '../data/sectors'

interface Props {
  selected: SectorSlug
  onChange: (slug: SectorSlug) => void
}

export function SectorFilter({ selected, onChange }: Props) {
  const sectors = SECTORS
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {sectors.map((s) => {
        const active = s.slug === selected
        const sectorData = getSector(s.slug)
        return (
          <motion.button
            key={s.slug}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(s.slug)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              active
                ? 'bg-zinc-100 text-zinc-950 shadow-[0_0_18px_-6px_rgba(255,255,255,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
            }`}
            style={
              active
                ? { backgroundColor: sectorData.color, color: '#0a0a0a' }
                : undefined
            }
          >
            <span className="text-sm leading-none">{s.emoji}</span>
            <span>{s.shortName}</span>
          </motion.button>
        )
      })}
    </div>
  )
}