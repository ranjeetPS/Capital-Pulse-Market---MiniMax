import {
  Newspaper,
  Flame,
  Handshake,
  Lightbulb,
  Building2,
  Bookmark,
  Settings,
  BarChart3,
} from 'lucide-react'
import { classNames } from '../lib/utils'

export type SectionId =
  | 'feed'
  | 'top-movers'
  | 'deals'
  | 'discoveries'
  | 'corporate-actions'
  | 'watchlist'

interface Props {
  active: SectionId
  onChange: (id: SectionId) => void
  counts: Record<SectionId, number>
}

const SECTIONS: { id: SectionId; label: string; icon: typeof Newspaper }[] = [
  { id: 'feed', label: 'Latest Feed', icon: Newspaper },
  { id: 'top-movers', label: 'Top Movers', icon: Flame },
  { id: 'deals', label: 'Major Deals', icon: Handshake },
  { id: 'discoveries', label: 'Discoveries', icon: Lightbulb },
  { id: 'corporate-actions', label: 'Corporate Actions', icon: Building2 },
  { id: 'watchlist', label: 'My Watchlist', icon: Bookmark },
]

export function Sidebar({ active, onChange, counts }: Props) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-zinc-800/80 bg-zinc-950/60 h-full">
      <div className="px-5 py-5 border-b border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_4px_18px_-4px_rgba(245,158,11,0.5)]">
              <BarChart3 className="w-5 h-5 text-zinc-950" strokeWidth={2.5} />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-50 leading-tight tracking-tight">
              Capital Pulse
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
              Market Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {SECTIONS.map((s) => {
          const Icon = s.icon
          const isActive = active === s.id
          const count = counts[s.id] ?? 0
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              className={classNames(
                'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent'
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="w-4 h-4" strokeWidth={isActive ? 2.4 : 2} />
                {s.label}
              </span>
              {count > 0 && (
                <span
                  className={classNames(
                    'px-1.5 py-0.5 rounded-md text-[10px] font-bold font-mono',
                    isActive
                      ? 'bg-amber-500 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-400'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-zinc-800/60 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/60 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <div className="px-3 py-2 text-[10px] text-zinc-600 leading-relaxed">
          <div className="font-mono">v2.4.1</div>
          <div>Real-time market intelligence</div>
        </div>
      </div>
    </aside>
  )
}