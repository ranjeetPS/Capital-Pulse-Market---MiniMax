import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Activity, ShieldCheck } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { CountrySelector } from './CountrySelector'
import type { CountryCode } from '../lib/utils'

interface Props {
  selectedCountries: CountryCode[]
  onCountriesChange: (codes: CountryCode[]) => void
  searchQuery: string
  onSearchChange: (v: string) => void
  totalNews: number
}

export function Header({
  selectedCountries,
  onCountriesChange,
  searchQuery,
  onSearchChange,
  totalNews,
}: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Title (mobile-only because sidebar shows on lg) */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center">
              <Activity className="w-4 h-4 text-zinc-950" strokeWidth={2.5} />
            </div>
            <h1 className="text-base font-bold text-zinc-50 tracking-tight">Capital Pulse</h1>
          </div>

          <div className="flex-1 min-w-[180px] max-w-md">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>

          <div className="hidden md:flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <span className="relative">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot inline-block" />
              </span>
              <span className="font-medium">Markets Live</span>
            </div>

            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono">{totalNews} verified stories</span>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 font-mono text-xs">
              <span className="text-zinc-500">UTC</span>
              <span className="text-zinc-100 tabular-nums">
                {now.toISOString().substring(11, 19)}
              </span>
            </div>

            <button
              className="relative p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </button>
          </div>
        </div>

        <CountrySelector selected={selectedCountries} onChange={onCountriesChange} />
      </div>
    </header>
  )
}