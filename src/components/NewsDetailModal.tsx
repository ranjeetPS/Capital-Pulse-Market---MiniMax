import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ExternalLink,
  Calendar,
  Building2,
  Globe,
  Target,
  Users,
  TrendingUp,
  Tag,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import type { NewsItem } from '../data/news'
import { getSector } from '../data/sectors'
import { formatDateTime, timeAgo, getCountry, classNames } from '../lib/utils'

interface Props {
  item: NewsItem | null
  onClose: () => void
}

const CATEGORY_ICON: Record<string, LucideIcon> = {
  'M&A': Target,
  'Major Investment': TrendingUp,
  'Earnings Surprise': TrendingUp,
  'Product Launch': TrendingUp,
  'Regulatory Approval': Target,
  'Discovery': Target,
  'Expansion': TrendingUp,
  'Layoffs': AlertTriangle,
  'Contract Win': Target,
  'IPO': TrendingUp,
  'Tariff / Trade': AlertTriangle,
  'Capital Raise': TrendingUp,
  'Restructuring': AlertTriangle,
  'Strategic Partnership': Users,
}

export function NewsDetailModal({ item, onClose }: Props) {
  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto flex flex-col">
              <NewsDetailContent item={item} onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function NewsDetailContent({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const sector = getSector(item.sector)
  const country = getCountry(item.country)
  const Icon = CATEGORY_ICON[item.impactCategory] ?? Target

  return (
    <>
      {/* Top color accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${sector.color} 0%, transparent 100%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-6 border-b border-zinc-800/80">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Icon className="w-3.5 h-3.5" />
              {item.impactCategory}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium"
              style={{ backgroundColor: `${sector.color}15`, color: sector.color }}
            >
              {sector.emoji} {sector.name}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300">
              {country.flag} {country.name}
            </span>
            {item.severity === 'high' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                <AlertTriangle className="w-3 h-3" />
                High Impact
              </span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-50 leading-tight pr-2">
            {item.headline}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto flex-1">
        <div className="p-6 space-y-6">
          {/* Summary */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-amber-500 rounded-full" />
              Event Summary
            </h3>
            <p className="text-zinc-300 leading-relaxed text-[15px]">{item.summary}</p>
          </section>

          {/* Why It Matters */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-500 rounded-full" />
              Why It Matters to Investors
            </h3>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-zinc-200 leading-relaxed text-sm">{item.whyItMatters}</p>
            </div>
          </section>

          {/* Companies + Tickers */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-violet-500 rounded-full" />
              Companies Involved & Tickers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.companies.map((c) => (
                <div
                  key={c.ticker + c.name}
                  className="flex items-center justify-between gap-3 bg-zinc-900/60 border border-zinc-800 rounded-lg px-3.5 py-2.5"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-zinc-100 truncate">{c.name}</div>
                    <div className="text-[11px] text-zinc-500">{c.exchange}</div>
                  </div>
                  {c.ticker !== '—' && (
                    <div className="shrink-0 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30">
                      <span className="font-mono font-bold text-amber-300 text-sm">{c.ticker}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Competitors / Related */}
          {item.competitors && item.competitors.length > 0 && (
            <section>
              <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-3 flex items-center gap-2">
                <span className="w-1 h-3 bg-blue-500 rounded-full" />
                Related Sectors & Competitors
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.competitors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-500/5 border border-blue-500/20 text-xs text-blue-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Metadata grid */}
          <section>
            <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-3 flex items-center gap-2">
              <span className="w-1 h-3 bg-zinc-500 rounded-full" />
              Event Metadata
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <MetaItem icon={Tag} label="Impact Category" value={item.impactCategory} />
              <MetaItem icon={Globe} label="Country" value={`${country.flag} ${country.name}`} />
              <MetaItem icon={Building2} label="Source" value={item.source} />
              <MetaItem
                icon={Calendar}
                label="Published"
                value={`${formatDateTime(item.publishedAt)} · ${timeAgo(item.publishedAt)}`}
              />
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-3.5 text-[11px] text-zinc-500 leading-relaxed">
            <strong className="text-zinc-400">Research note:</strong> This news item is provided
            for investment research context only. It is not investment advice or a guaranteed
            indicator of stock movement. Always verify with primary sources and consult a licensed
            financial advisor before making investment decisions.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800/80 p-4 flex items-center justify-between gap-3 bg-zinc-950">
        <div className="text-xs text-zinc-500">
          Last updated <span className="text-zinc-300 font-medium">{timeAgo(item.publishedAt)}</span>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm transition-colors"
        >
          Read original at {item.source}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </>
  )
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg px-3.5 py-2.5">
      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-1">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="text-sm font-medium text-zinc-200">{value}</div>
    </div>
  )
}