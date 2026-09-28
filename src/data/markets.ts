import type { CountryCode } from '../lib/utils'

export interface MarketIndex {
  symbol: string
  name: string
  country: CountryCode
  level: number
  change: number
  changePercent: number
}

export const MARKET_INDICES: MarketIndex[] = [
  // India
  { symbol: 'NIFTY 50', name: 'Nifty 50', country: 'IN', level: 25784.35, change: 168.42, changePercent: 0.66 },
  { symbol: 'SENSEX', name: 'BSE Sensex', country: 'IN', level: 84312.10, change: 491.28, changePercent: 0.59 },
  { symbol: 'BANKNIFTY', name: 'Bank Nifty', country: 'IN', level: 54210.65, change: -132.15, changePercent: -0.24 },
  { symbol: 'NIFTYIT', name: 'Nifty IT', country: 'IN', level: 42318.20, change: 312.45, changePercent: 0.74 },

  // USA
  { symbol: 'SPX', name: 'S&P 500', country: 'US', level: 5847.32, change: 28.16, changePercent: 0.48 },
  { symbol: 'INDU', name: 'Dow Jones', country: 'US', level: 43821.55, change: 145.32, changePercent: 0.33 },
  { symbol: 'COMP', name: 'Nasdaq Composite', country: 'US', level: 19145.78, change: 92.41, changePercent: 0.49 },
  { symbol: 'RUT', name: 'Russell 2000', country: 'US', level: 2318.42, change: -8.34, changePercent: -0.36 },

  // UK
  { symbol: 'UKX', name: 'FTSE 100', country: 'GB', level: 8429.16, change: 32.18, changePercent: 0.38 },
  { symbol: 'MCX', name: 'FTSE 250', country: 'GB', level: 21342.78, change: -45.62, changePercent: -0.21 },
  { symbol: 'FTAS', name: 'FTSE All-Share', country: 'GB', level: 4812.45, change: 14.92, changePercent: 0.31 },

  // Japan
  { symbol: 'NKY', name: 'Nikkei 225', country: 'JP', level: 41238.65, change: 387.42, changePercent: 0.95 },
  { symbol: 'TPX', name: 'Topix', country: 'JP', level: 2945.18, change: 22.34, changePercent: 0.76 },
  { symbol: 'MOTHERS', name: 'Mothers Index', country: 'JP', level: 712.42, change: -3.18, changePercent: -0.44 },

  // UAE
  { symbol: 'DFMGI', name: 'DFM General', country: 'AE', level: 4742.18, change: 28.45, changePercent: 0.60 },
  { symbol: 'ADI', name: 'ADX General', country: 'AE', level: 9382.65, change: 52.18, changePercent: 0.56 },
  { symbol: 'DFSI', name: 'DFM Sharia', country: 'AE', level: 2184.92, change: 14.32, changePercent: 0.66 },

  // Canada
  { symbol: 'SPTSX', name: 'S&P/TSX', country: 'CA', level: 23842.18, change: 78.42, changePercent: 0.33 },
  { symbol: 'TX60', name: 'S&P/TSX 60', country: 'CA', level: 1542.18, change: 6.34, changePercent: 0.41 },
  { symbol: 'TXVC', name: 'TSX Venture', country: 'CA', level: 612.45, change: -2.18, changePercent: -0.36 },

  // Germany
  { symbol: 'DAX', name: 'DAX 40', country: 'DE', level: 19342.78, change: 84.32, changePercent: 0.44 },
  { symbol: 'MDAX', name: 'MDAX', country: 'DE', level: 26918.42, change: 62.18, changePercent: 0.23 },
  { symbol: 'SDAX', name: 'SDAX', country: 'DE', level: 14218.65, change: -18.42, changePercent: -0.13 },
]

export function getIndicesForCountry(code: CountryCode): MarketIndex[] {
  return MARKET_INDICES.filter((m) => m.country === code)
}