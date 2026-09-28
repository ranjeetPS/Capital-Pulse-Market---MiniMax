import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Filter,
  ArrowUpDown,
  Calendar,
  Sparkles,
  AlertCircle,
  Newspaper,
  Flame,
  Handshake,
  Lightbulb,
  Building2,
  Bookmark,
  Inbox,
} from 'lucide-react'
import { NewsDetailModal } from '../components/NewsDetailModal'
import { NewsCard } from '../components/NewsCard'
import { MarketOverview } from '../components/MarketOverview'
import { MarketTicker } from '../components/MarketTicker'
import { SectorFilter } from '../components/SectorFilter'
import { TrendingTickers } from '../components/TrendingTickers'
import { SectorHeatmap } from '../components/SectorHeatmap'
import {
  NEWS,
  type NewsItem,
  getTopMovers,
  getDeals,
  getDiscoveries,
  getCorporateActions,
} from '../data/news'
import type { SectorSlug } from '../data/sectors'
import { SECTORS } from '../data/sectors'
import { classNames, type CountryCode } from '../lib/utils'
import { Sidebar, type SectionId } from '../components/Sidebar'

type SortBy = 'newest' | 'severity' | 'sector'

interface Props {
  selectedCountries: CountryCode[]
  searchQuery: string
  onSearchChange: (v: string) => void
}

const SECTION_LABELS: Record<SectionId, { title: string; subtitle: string; icon: typeof Newspaper }> = {
  feed: {
    title: 'Latest Market News',
    subtitle: 'Real-time flow of business events from your selected markets',
    icon: Newspaper,
  },
  'top-movers': {
    title: 'Top Market-Moving Stories',
    subtitle: 'High-severity events most likely to move stock prices today',
    icon: Flame,
  },
  deals: {
    title: 'Major Deals & M&A',
    subtitle: 'Mergers, acquisitions, buyouts, and strategic transactions',
    icon: Handshake,
  },
  discoveries: {
    title: 'Discoveries & New Resources',
    subtitle: 'Major resource finds, product breakthroughs, and technological milestones',
    icon: Lightbulb,
  },
  'corporate-actions': {
    title: 'Corporate Actions',
    subtitle: 'Earnings, capital raises, expansion plans, and leadership changes',
    icon: Building2,
  },
  watchlist: {
    title: 'My Watchlist',
    subtitle: 'Companies and sectors you follow — personalized feed',
    icon: Bookmark,
  },
}

export function Dashboard({ selectedCountries, searchQuery, onSearchChange }: Props) {
  const [section, setSection] = useState<SectionId>('feed')
  const [sector, setSector] = useState<SectorSlug>('all')
  const [sortBy, setSortBy] = useState<SortBy>('newest')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  // Filter base set by selected countries
  const countryFiltered = useMemo(() => {
    if (selectedCountries.length === 0) return NEWS
    return NEWS.filter((n) => selectedCountries.includes(n.country))
  }, [selectedCountries])

  // Counts per section
  const sectionCounts = useMemo(() => {
    const filterByCountry = (items: NewsItem[]) =>
      selectedCountries.length === 0
        ? items
        : items.filter((n) => selectedCountries.includes(n.country))

    return {
      feed: filterByCountry(NEWS).length,
      'top-movers': filterByCountry(getTopMovers()).length,
      deals: filterByCountry(getDeals()).length,
      discoveries: filterByCountry(getDiscoveries()).length,
      'corporate-actions': filterByCountry(getCorporateActions()).length,
      watchlist: 0,
    }
  }, [selectedCountries])

  // Pick which news to display based on section
  const baseList = useMemo(() => {
    switch (section) {
      case 'top-movers':
        return countryFiltered.filter((n) => n.isTopMover)
      case 'deals':
        return countryFiltered.filter((n) => n.isDeal)
      case 'discoveries':
        return countryFiltered.filter((n) => n.isDiscovery)
      case 'corporate-actions':
        return countryFiltered.filter((n) => n.isCorporateAction)
      case 'watchlist':
        return countryFiltered.filter((n) =>
          n.companies.some((c) => c.ticker === selectedCompany)
        )
      default:
        return countryFiltered
    }
  }, [section, countryFiltered, selectedCompany])

  // Apply sector + search + sort
  const filteredNews = useMemo(() => {
    let list = baseList
    if (sector !== 'all') {
      list = list.filter((n) => n.sector === sector)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(
        (n) =>
          n.headline.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.whyItMatters.toLowerCase().includes(q) ||
          n.source.toLowerCase().includes(q) ||
          n.companies.some(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.ticker.toLowerCase().includes(q)
          ) ||
          n.competitors?.some((c) => c.toLowerCase().includes(q))
      )
    }

    // Sort
    const sorted = [...list]
    if (sortBy === 'newest') {
      sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    } else if (sortBy === 'severity') {
      const rank = { high: 0, medium: 1, low: 2 }
      sorted.sort((a, b) => rank[a.severity] - rank[b.severity])
    } else if (sortBy === 'sector') {
      sorted.sort((a, b) => a.sector.localeCompare(b.sector))
    }
    return sorted
  }, [baseList, sector, searchQuery, sortBy])

  // Top-mover featured (first one)
  const featuredTopMover = useMemo(() => {
    return filteredNews.find((n) => n.isTopMover) ?? filteredNews[0] ?? null
  }, [filteredNews])

  const listNews = useMemo(() => {
    if (!featuredTopMover) return filteredNews
    return filteredNews.filter((n) => n.id !== featuredTopMover.id)
  }, [filteredNews, featuredTopMover])

  const activeSector = SECTORS.find((s) => s.slug === sector)
  const sectionInfo = SECTION_LABELS[section]
  const SectionIcon = sectionInfo.icon

  return (
    <div className="flex h-full">
      <Sidebar
        active={section}
        onChange={setSection}
        counts={sectionCounts}
      />

      <main className="flex-1 min-w-0 overflow-y-auto bg-grid">
        <MarketTicker />

        <div className="px-5 lg:px-8 py-6 max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="mb-5 flex items-start gap-3 flex-wrap">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center">
              <SectionIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-zinc-50 tracking-tight leading-tight">
                {sectionInfo.title}
              </h2>
              <p className="text-sm text-zinc-500 mt-0.5">{sectionInfo.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {filteredNews.length} {filteredNews.length === 1 ? 'story' : 'stories'}
                {sector !== 'all' && ` · ${activeSector?.shortName}`}
              </span>
            </div>
          </div>

          {/* Market Overview - always shown above news */}
          {section === 'feed' && (
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 flex items-center gap-2">
                  <span className="w-1 h-3 bg-amber-500 rounded-full" />
                  Market Overview
                </h3>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {selectedCountries.length === 0
                    ? 'All markets'
                    : selectedCountries.length === 1
                      ? '1 market'
                      : `${selectedCountries.length} markets`}
                </span>
              </div>
              <MarketOverview countries={selectedCountries} />
            </div>
          )}

          {/* Featured top mover */}
          {section === 'top-movers' && featuredTopMover && (
            <div className="mb-7">
              <h3 className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-3 flex items-center gap-2">
                <span className="w-1 h-3 bg-rose-500 rounded-full" />
                Featured Story
              </h3>
              <NewsCard
                item={featuredTopMover}
                variant="featured"
                onClick={() => setSelectedNews(featuredTopMover)}
              />
            </div>
          )}

          {/* Watchlist quick filter */}
          {section === 'watchlist' && !selectedCompany && (
            <div className="mb-6 bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-zinc-100 mb-1 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-400" />
                Pick a company to filter your watchlist
              </h3>
              <p className="text-xs text-zinc-500 mb-3">
                Click a trending ticker in the right rail, or search for any company above.
              </p>
              <button
                onClick={() => {
                  setSelectedCompany('NVDA')
                  onSearchChange('')
                }}
                className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs hover:border-amber-500/50 hover:bg-amber-500/10 transition-colors font-mono"
              >
                Try NVDA
              </button>
            </div>
          )}

          {/* Filter Bar */}
          <div className="mb-5 space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                  Sector
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 hidden sm:inline">Sort:</span>
                <div className="flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 rounded-lg p-0.5">
                  <SortButton
                    label="Newest"
                    active={sortBy === 'newest'}
                    onClick={() => setSortBy('newest')}
                    icon={Calendar}
                  />
                  <SortButton
                    label="Impact"
                    active={sortBy === 'severity'}
                    onClick={() => setSortBy('severity')}
                    icon={AlertCircle}
                  />
                  <SortButton
                    label="Sector"
                    active={sortBy === 'sector'}
                    onClick={() => setSortBy('sector')}
                    icon={ArrowUpDown}
                  />
                </div>
              </div>
            </div>
            <SectorFilter selected={sector} onChange={setSector} />
            {(sector !== 'all' || searchQuery || selectedCompany) && (
              <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-500">
                <span className="font-medium text-zinc-400">Active filters:</span>
                {sector !== 'all' && (
                  <button
                    onClick={() => setSector('all')}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
                  >
                    Sector: {activeSector?.shortName} <span className="opacity-60">×</span>
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
                  >
                    Search: &ldquo;{searchQuery}&rdquo; <span className="opacity-60">×</span>
                  </button>
                )}
                {selectedCompany && (
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 font-mono"
                  >
                    Watchlist: {selectedCompany} <span className="opacity-60">×</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Main news list with right sidebar */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* News list */}
            <div>
                {filteredNews.length === 0 ? (
                  <EmptyState
                    onReset={() => {
                      setSector('all')
                      onSearchChange('')
                      setSelectedCompany(null)
                    }}
                  />
                ) : section === 'top-movers' ? (
                  // Top movers: stacked cards
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {listNews.map((item, i) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                        >
                          <NewsCard
                            item={item}
                            onClick={() => setSelectedNews(item)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Default: 2-col grid on lg
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                      {listNews.map((item, i) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: Math.min(i * 0.02, 0.4) }}
                        >
                          <NewsCard
                            item={item}
                            onClick={() => setSelectedNews(item)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {filteredNews.length > 0 && listNews.length === 0 && featuredTopMover && (
                  <div className="text-center text-zinc-500 text-sm py-8">
                    <Inbox className="w-6 h-6 mx-auto mb-2 text-zinc-700" />
                    All stories in view are shown in the featured card above.
                  </div>
                )}
              </div>

            {/* Right sidebar */}
            <aside className="space-y-5 hidden xl:block">
              <TrendingTickers
                countries={selectedCountries}
                onCompanyClick={(t) => {
                  setSection('watchlist')
                  setSelectedCompany(t)
                  onSearchChange('')
                }}
              />
              <SectorHeatmap
                countries={selectedCountries}
                onSectorClick={(slug) => setSector(slug as SectorSlug)}
                activeSector={sector}
              />
              <ResearchNote />
            </aside>
          </div>
        </div>
      </main>

      <NewsDetailModal item={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  )
}

function SortButton({
  label,
  active,
  onClick,
  icon: Icon,
}: {
  label: string
  active: boolean
  onClick: () => void
  icon: typeof Calendar
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
        active
          ? 'bg-zinc-800 text-zinc-100'
          : 'text-zinc-500 hover:text-zinc-200'
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl py-16 px-6 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4">
        <Inbox className="w-7 h-7 text-zinc-700" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-200 mb-1.5">No stories match your filters</h3>
      <p className="text-sm text-zinc-500 max-w-md mx-auto mb-5">
        Try adjusting your sector filter, removing your search term, or selecting more countries.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm transition-colors"
      >
        Reset all filters
      </button>
    </div>
  )
}

function ResearchNote() {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 leading-relaxed">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-1 h-3 bg-amber-500 rounded-full" />
        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">
          Research Disclaimer
        </span>
      </div>
      <p>
        Capital Pulse aggregates publicly available business news to surface potentially
        market-moving events for research purposes. Stories are{' '}
        <span className="text-zinc-200 font-medium">not investment advice</span> and do not
        guarantee stock price movements. Always verify with original sources and consult a
        licensed advisor.
      </p>
    </div>
  )
}