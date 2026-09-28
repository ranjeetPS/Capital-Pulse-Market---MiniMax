import { motion } from 'framer-motion'
import { Globe, Check, Plus } from 'lucide-react'
import { COUNTRIES, type CountryCode } from '../lib/utils'
import { classNames } from '../lib/utils'

interface Props {
  selected: CountryCode[]
  onChange: (codes: CountryCode[]) => void
}

export function CountrySelector({ selected, onChange }: Props) {
  const toggle = (code: CountryCode) => {
    if (selected.includes(code)) {
      if (selected.length > 1) {
        onChange(selected.filter((c) => c !== code))
      }
    } else {
      onChange([...selected, code])
    }
  }

  const selectAll = () => onChange(COUNTRIES.map((c) => c.code))

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1">
      <div className="flex items-center gap-2 text-zinc-400 shrink-0">
        <Globe className="w-4 h-4" />
        <span className="text-xs uppercase tracking-wider font-medium">Markets</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {COUNTRIES.map((country) => {
          const active = selected.includes(country.code)
          return (
            <motion.button
              key={country.code}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(country.code)}
              className={classNames(
                'group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all',
                active
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-[0_0_18px_-6px_rgba(245,158,11,0.5)]'
                  : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              )}
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span>{country.shortName}</span>
              {active && (
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-amber-500 text-zinc-950">
                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                </span>
              )}
            </motion.button>
          )
        })}
        {selected.length < COUNTRIES.length && (
          <button
            onClick={selectAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-900/60 text-zinc-500 border border-dashed border-zinc-700 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <Plus className="w-3 h-3" />
            All
          </button>
        )}
      </div>
    </div>
  )
}