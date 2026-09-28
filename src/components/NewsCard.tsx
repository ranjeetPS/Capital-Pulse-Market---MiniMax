import { motion } from 'framer-motion'
import {
  Building2,
  ExternalLink,
  Calendar,
  Flame,
  Briefcase,
  Rocket,
  Lightbulb,
  AlertTriangle,
  Package,
  Handshake,
  Globe,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import type { NewsItem } from '../data/news'
import { getSector } from '../data/sectors'
import { timeAgo, formatDateTime, getCountry } from '../lib/utils'

const CATEGORY_ICON: Record<NewsItem['impactCategory'], LucideIcon> = {
  'M&A': Handshake,
  'Major Investment': Rocket,
  'Earnings Surprise': Flame,
  'Product Launch': Rocket,
  'Regulatory Approval': CheckCircle,
  'Discovery': Lightbulb,
  'Expansion': Globe,
  'Layoffs': AlertTriangle,
  'Contract Win': Briefcase,
  'IPO': Package,
  'Tariff / Trade': Globe,
  'Capital Raise': Building2,
  'Restructuring': Building2,
  'Strategic Partnership': Handshake,
}

const CATEGORY_COLOR: Record<NewsItem['impactCategory'], string> = {
  'M&A': 'text-violet-400 bg-violet-500/10 border-violet-500/30',
  'Major Investment': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Earnings Surprise': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Product Launch': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  'Regulatory Approval': 'text-teal-400 bg-teal-500/10 border-teal-500/30',
  'Discovery': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  'Expansion': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
  'Layoffs': 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  'Contract Win': 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'IPO': 'text-pink-400 bg-pink-500/10 border-pink-500/30',
  'Tariff / Trade': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'Capital Raise': 'text-sky-400 bg-sky-500/10 border-sky-500/30',
  'Restructuring': 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
  'Strategic Partnership': 'text-purple-400 bg-purple-500/10 border-purple-500/30',
}

const SEVERITY_DOT: Record<NewsItem['severity'], string> = {
  high: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]',
  medium: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
  low: 'bg-zinc-500',
}

interface Props {
  item: NewsItem
  variant?: 'default' | 'compact' | 'featured'
  onClick?: () => void
}

export function NewsCard({ item, variant = 'default', onClick }: Props) {
  const sector = getSector(item.sector)
  const country = getCountry(item.country)
  const Icon = CATEGORY_ICON[item.impactCategory]
  const categoryColor = CATEGORY_COLOR[item.impactCategory]

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className="group relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all cursor-pointer card-glow overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${categoryColor}`}>
              <Icon className="w-3.5 h-3.5" />
              {item.impactCategory}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium"
              style={{ backgroundColor: `${sector.color}15`, color: sector.color }}
            >
              <span>{sector.emoji}</span>
              {sector.shortName}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300">
              <span>{country.flag}</span>
              {country.shortName}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-zinc-400">
              <span className={`w-1.5 h-1.5 rounded-full ${SEVERITY_DOT[item.severity]}`} />
              {item.severity === 'high' ? 'High Impact' : item.severity === 'medium' ? 'Medium Impact' : 'Standard'}
            </span>
            <span className="text-xs text-zinc-500 ml-auto">{timeAgo(item.publishedAt)}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-zinc-50 leading-snug mb-3 group-hover:text-amber-100 transition-colors">
            {item.headline}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.summary}</p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {item.companies.map((c) => (
              <span
                key={c.ticker}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/60 text-xs"
              >
                <span className="text-zinc-200 font-medium">{c.name}</span>
                {c.ticker !== '—' && (
                  <span className="font-mono text-amber-400 font-semibold">{c.ticker}</span>
                )}
                <span className="text-[10px] text-zinc-500">{c.exchange}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-zinc-500">
              <span className="font-medium text-zinc-300">{item.source}</span>
              <span>·</span>
              <span>{formatDateTime(item.publishedAt)}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
          </div>
        </div>
      </motion.article>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onClick}
        className="group flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/60 cursor-pointer transition-colors"
      >
        <div className={`shrink-0 w-1 h-12 rounded-full ${SEVERITY_DOT[item.severity].split(' ')[0]}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
            <span style={{ color: sector.color }} className="font-medium">
              {sector.shortName}
            </span>
            <span>·</span>
            <span>{timeAgo(item.publishedAt)}</span>
          </div>
          <h4 className="text-sm font-medium text-zinc-200 line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
            {item.headline}
          </h4>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="group bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all card-glow cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${categoryColor}`}>
            <Icon className="w-3 h-3" />
            {item.impactCategory}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium"
            style={{ backgroundColor: `${sector.color}15`, color: sector.color }}
          >
            <span className="text-xs">{sector.emoji}</span>
            {sector.shortName}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-800/60 text-zinc-400">
            <span className="text-xs">{country.flag}</span>
            {country.shortName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span className={`w-1.5 h-1.5 rounded-full ${SEVERITY_DOT[item.severity]}`} />
          <span>{timeAgo(item.publishedAt)}</span>
        </div>
      </div>

      <h3 className="text-base md:text-lg font-semibold text-zinc-50 leading-snug mb-2.5 group-hover:text-amber-100 transition-colors">
        {item.headline}
      </h3>

      <p className="text-zinc-400 text-sm leading-relaxed mb-3.5 line-clamp-3">{item.summary}</p>

      <div className="flex flex-wrap gap-1.5 mb-3.5">
        {item.companies.slice(0, 4).map((c) => (
          <span
            key={c.ticker + c.name}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-[11px]"
          >
            <span className="text-zinc-200">{c.name}</span>
            {c.ticker !== '—' && (
              <span className="font-mono text-amber-400 font-semibold">{c.ticker}</span>
            )}
          </span>
        ))}
        {item.companies.length > 4 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-800/60 text-[11px] text-zinc-400">
            +{item.companies.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <Building2 className="w-3 h-3" />
          <span className="font-medium text-zinc-400">{item.source}</span>
          <span>·</span>
          <Calendar className="w-3 h-3" />
          <span>{formatDateTime(item.publishedAt)}</span>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
        >
          Source <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.article>
  )
}