export type CountryCode = 'IN' | 'US' | 'GB' | 'JP' | 'AE' | 'CA' | 'DE'

export interface Country {
  code: CountryCode
  name: string
  shortName: string
  flag: string
  region: string
  currency: string
  timezone: string
  marketHours: string
}

export const COUNTRIES: Country[] = [
  {
    code: 'IN',
    name: 'India',
    shortName: 'India',
    flag: '🇮🇳',
    region: 'Asia',
    currency: 'INR',
    timezone: 'IST (UTC+5:30)',
    marketHours: '09:15 – 15:30',
  },
  {
    code: 'US',
    name: 'United States',
    shortName: 'USA',
    flag: '🇺🇸',
    region: 'Americas',
    currency: 'USD',
    timezone: 'ET (UTC−5)',
    marketHours: '09:30 – 16:00',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    shortName: 'UK',
    flag: '🇬🇧',
    region: 'Europe',
    currency: 'GBP',
    timezone: 'GMT (UTC+0)',
    marketHours: '08:00 – 16:30',
  },
  {
    code: 'JP',
    name: 'Japan',
    shortName: 'Japan',
    flag: '🇯🇵',
    region: 'Asia',
    currency: 'JPY',
    timezone: 'JST (UTC+9)',
    marketHours: '09:00 – 15:00',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    shortName: 'UAE',
    flag: '🇦🇪',
    region: 'Middle East',
    currency: 'AED',
    timezone: 'GST (UTC+4)',
    marketHours: '09:30 – 14:00',
  },
  {
    code: 'CA',
    name: 'Canada',
    shortName: 'Canada',
    flag: '🇨🇦',
    region: 'Americas',
    currency: 'CAD',
    timezone: 'ET (UTC−5)',
    marketHours: '09:30 – 16:00',
  },
  {
    code: 'DE',
    name: 'Germany',
    shortName: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    currency: 'EUR',
    timezone: 'CET (UTC+1)',
    marketHours: '09:00 – 17:30',
  },
]

export function getCountry(code: CountryCode): Country {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatCompact(value: number): string {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value)
}

export function timeAgo(iso: string): string {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = Math.max(0, now - then)
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}