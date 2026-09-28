export type SectorSlug =
  | 'all'
  | 'ai'
  | 'semiconductors'
  | 'evs'
  | 'renewable-energy'
  | 'pharma'
  | 'banking'
  | 'oil-gas'
  | 'mining'
  | 'consumer'
  | 'aerospace-defense'
  | 'telecom'
  | 'real-estate'
  | 'crypto'
  | 'logistics'

export interface Sector {
  slug: SectorSlug
  name: string
  shortName: string
  emoji: string
  color: string
}

export const SECTORS: Sector[] = [
  { slug: 'all', name: 'All Sectors', shortName: 'All', emoji: '◎', color: '#a1a1aa' },
  { slug: 'ai', name: 'Artificial Intelligence', shortName: 'AI', emoji: '🧠', color: '#8b5cf6' },
  { slug: 'semiconductors', name: 'Semiconductors', shortName: 'Semis', emoji: '🔬', color: '#06b6d4' },
  { slug: 'evs', name: 'Electric Vehicles', shortName: 'EVs', emoji: '⚡', color: '#22c55e' },
  { slug: 'renewable-energy', name: 'Renewable Energy', shortName: 'Renewables', emoji: '☀️', color: '#eab308' },
  { slug: 'pharma', name: 'Pharmaceuticals', shortName: 'Pharma', emoji: '💊', color: '#ec4899' },
  { slug: 'banking', name: 'Banking & Finance', shortName: 'Banking', emoji: '🏦', color: '#3b82f6' },
  { slug: 'oil-gas', name: 'Oil & Gas', shortName: 'Energy', emoji: '🛢️', color: '#f97316' },
  { slug: 'mining', name: 'Mining & Metals', shortName: 'Mining', emoji: '⛏️', color: '#84cc16' },
  { slug: 'consumer', name: 'Consumer & Retail', shortName: 'Consumer', emoji: '🛍️', color: '#f43f5e' },
  { slug: 'aerospace-defense', name: 'Aerospace & Defense', shortName: 'Aero/Def', emoji: '🚀', color: '#64748b' },
  { slug: 'telecom', name: 'Telecommunications', shortName: 'Telecom', emoji: '📡', color: '#0ea5e9' },
  { slug: 'real-estate', name: 'Real Estate & Infra', shortName: 'Real Estate', emoji: '🏗️', color: '#a3a3a3' },
  { slug: 'crypto', name: 'Crypto & Fintech', shortName: 'Crypto', emoji: '₿', color: '#fbbf24' },
  { slug: 'logistics', name: 'Logistics & Shipping', shortName: 'Logistics', emoji: '🚢', color: '#10b981' },
]

export function getSector(slug: SectorSlug): Sector {
  return SECTORS.find((s) => s.slug === slug) ?? SECTORS[0]
}