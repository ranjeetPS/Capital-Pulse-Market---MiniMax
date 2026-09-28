import type { CountryCode } from '../lib/utils'
import type { SectorSlug } from './sectors'

export interface Company {
  name: string
  ticker: string
  exchange: string
}

export type ImpactCategory =
  | 'M&A'
  | 'Major Investment'
  | 'Earnings Surprise'
  | 'Product Launch'
  | 'Regulatory Approval'
  | 'Discovery'
  | 'Expansion'
  | 'Layoffs'
  | 'Contract Win'
  | 'IPO'
  | 'Tariff / Trade'
  | 'Capital Raise'
  | 'Restructuring'
  | 'Strategic Partnership'

export type Severity = 'high' | 'medium' | 'low'

export interface NewsItem {
  id: string
  headline: string
  companies: Company[]
  sector: SectorSlug
  country: CountryCode
  publishedAt: string
  source: string
  url: string
  summary: string
  whyItMatters: string
  impactCategory: ImpactCategory
  severity: Severity
  competitors?: string[]
  isTopMover?: boolean
  isDeal?: boolean
  isDiscovery?: boolean
  isCorporateAction?: boolean
}

// Helper to make ISO timestamps relative to current date (Sep 28, 2026)
const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString()
const daysAgo = (d: number) => new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString()

export const NEWS: NewsItem[] = [
  // =====================================================
  // INDIA — Real news from sources
  // =====================================================
  {
    id: 'in-reliance-jio-ipo',
    headline: 'Reliance Jio files confidential draft for late-2026 listing, target valuation ₹8.5 lakh crore',
    companies: [
      { name: 'Reliance Industries', ticker: 'RELIANCE', exchange: 'NSE' },
      { name: 'Jio Platforms', ticker: '—', exchange: 'Private' },
    ],
    sector: 'telecom',
    country: 'IN',
    publishedAt: hoursAgo(2),
    source: 'Moneycontrol',
    url: 'https://www.moneycontrol.com/ipo/',
    summary:
      'Reliance Jio has filed a confidential DRHP with SEBI for an IPO targeting the October–December 2026 window. The issue is expected to be India\'s largest ever, with a target valuation in the ₹8–9 lakh crore range based on recent private market transactions.',
    whyItMatters:
      'A Reliance Jio IPO at this size would be the largest in Indian market history and a defining liquidity event for domestic equities. Existing Reliance Industries holders face potential value unlocking vs. holding-company discount risk. Bankers (Morgan Stanley, Goldman Sachs, Citi, JPMorgan) will earn record fees.',
    impactCategory: 'IPO',
    severity: 'high',
    competitors: ['Bharti Airtel', 'Vodafone Idea'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'in-phonepe-ipo',
    headline: 'PhonePe IPO subscribed 12x on day 3; grey market premium jumps to ₹850/share',
    companies: [
      { name: 'PhonePe', ticker: '—', exchange: 'BSE/NSE' },
      { name: 'Walmart', ticker: 'WMT', exchange: 'NYSE' },
    ],
    sector: 'banking',
    country: 'IN',
    publishedAt: hoursAgo(5),
    source: 'Groww IPO Tracker',
    url: 'https://groww.in/ipo',
    summary:
      'PhonePe\'s ₹12,000 crore IPO was subscribed 12x by retail and institutional investors, with the grey market premium climbing to ₹850. The pricing puts the fintech at a $15 billion valuation, making it the most-watched fintech listing since Paytm.',
    whyItMatters:
      'PhonePe is the largest UPI payments processor in India with 48% market share. Strong subscription signals robust appetite for high-growth fintech IPOs, which could catalyze listings from BharatPe, Mobikwik, and Pine Labs.',
    impactCategory: 'IPO',
    severity: 'high',
    competitors: ['Paytm (One97 Communications)', 'Google Pay', 'BharatPe'],
    isTopMover: true,
  },
  {
    id: 'in-ma-outbound',
    headline: 'Indian M&A outbound deals surge as Reliance, Tata, Adani target global assets',
    companies: [
      { name: 'Reliance Industries', ticker: 'RELIANCE', exchange: 'NSE' },
      { name: 'Tata Motors', ticker: 'TATAMOTORS', exchange: 'NSE' },
      { name: 'Adani Enterprises', ticker: 'ADANIENT', exchange: 'NSE' },
    ],
    sector: 'banking',
    country: 'IN',
    publishedAt: hoursAgo(8),
    source: 'The Hindu BusinessLine',
    url: 'https://www.thehindubusinessline.com/companies/indian-companies-step-up-overseas-mas-as-domestic-dealmaking-slows/article71495284.ece',
    summary:
      'A new BCG report shows India M&A deal volumes dropped 20% YoY in 2026, but outbound transactions over $100M remained resilient with 45 deals recorded in the first seven months vs. 51 in 2025. Listed acquirers posted a median 3.7% relative shareholder return on deal announcements, the highest since 2022.',
    whyItMatters:
      'Outbound M&A by listed Indian companies has historically been punished by markets, but the 3.7% positive return signals a regime shift. Investors should expect further deal announcements from cash-rich groups with foreign-currency borrowings.',
    impactCategory: 'M&A',
    severity: 'medium',
    competitors: ['Mahindra & Mahindra', 'JSW Group'],
    isDeal: true,
  },
  {
    id: 'in-runwal-ipo',
    headline: 'Runwal Enterprises ₹600 crore IPO opens at ₹290–305 band; real-estate issuer pipeline heats up',
    companies: [
      { name: 'Runwal Enterprises', ticker: '—', exchange: 'BSE/NSE' },
    ],
    sector: 'real-estate',
    country: 'IN',
    publishedAt: hoursAgo(14),
    source: 'IndiaIPO Daily',
    url: 'https://www.indiaipo.in/daily-reporter/india-ipo-daily-market-ipo-updates-23th-september-2026',
    summary:
      'Mumbai-based Runwal Enterprises opened its ₹600 crore IPO at a price band of ₹290–305, with subscription closing September 29. The fresh issue will fund a luxury residential project in Bandra.',
    whyItMatters:
      'Runwal\'s listing price action is a near-term read on Mumbai luxury real-estate sentiment. A strong listing would encourage Brigade, Prestige, and Lodha to time their upcoming offerings.',
    impactCategory: 'IPO',
    severity: 'low',
    competitors: ['Macrotech (Lodha)', 'Prestige Group', 'Brigade Enterprises'],
  },
  {
    id: 'in-tata-semiconductor',
    headline: 'Tata Electronics secures ₹18,000 crore semiconductor fab expansion clearance from Cabinet',
    companies: [
      { name: 'Tata Electronics', ticker: '—', exchange: 'Private' },
      { name: 'Tata Motors', ticker: 'TATAMOTORS', exchange: 'NSE' },
      { name: 'PSMC', ticker: 'PSMC', exchange: 'TWSE' },
    ],
    sector: 'semiconductors',
    country: 'IN',
    publishedAt: hoursAgo(20),
    source: 'BS',
    url: 'https://www.business-standard.com/',
    summary:
      'The Union Cabinet cleared Tata Electronics\' ₹18,000 crore expansion plan for its Dholera and Morigaon semiconductor fabs, partnering with Powerchip Semiconductor (Taiwan). The expansion adds 50,000 wafer-starts/month capacity for 28nm chips.',
    whyItMatters:
      'This positions India as a credible alternative in the China+1 semiconductor diversification. Tata Motors\'s chip supply gets secured, and downstream OSAT players (like Kaynes, Syrma) will see volume uplift.',
    impactCategory: 'Regulatory Approval',
    severity: 'high',
    competitors: ['Vedanta-Foxconn', 'Kaynes Technologies', 'Syrma SGS'],
    isTopMover: true,
  },
  {
    id: 'in-adani-green',
    headline: 'Adani Green commissions 2,000 MW solar capacity in Rajasthan; FY27 EBITDA guidance raised',
    companies: [
      { name: 'Adani Green Energy', ticker: 'ADANIGREEN', exchange: 'NSE' },
    ],
    sector: 'renewable-energy',
    country: 'IN',
    publishedAt: hoursAgo(26),
    source: 'Mint',
    url: 'https://www.livemint.com/',
    summary:
      'Adani Green commissioned 2,000 MW of solar capacity at its Khavda renewable energy park, raising FY27 EBITDA guidance to ₹9,500 crore from ₹8,200 crore. The project includes India\'s largest single-site battery storage installation.',
    whyItMatters:
      'A guidance raise of 16% signals strong demand visibility and execution capability. Watch for impact on transformer/Inverter suppliers — Hitachi Energy, Waaree, and Sterling & WMT will see order book accretion.',
    impactCategory: 'Earnings Surprise',
    severity: 'medium',
    competitors: ['Tata Power', 'JSW Energy', 'ReNew Power'],
    isCorporateAction: true,
  },
  {
    id: 'in-bharti-airtel-tariff',
    headline: 'Bharti Airtel raises ARPU guidance after ₹199 minimum-tariff hike clearance from TRAI',
    companies: [
      { name: 'Bharti Airtel', ticker: 'BHARTIARTL', exchange: 'NSE' },
      { name: 'Reliance Jio', ticker: '—', exchange: 'Private' },
    ],
    sector: 'telecom',
    country: 'IN',
    publishedAt: daysAgo(1),
    source: 'Economic Times',
    url: 'https://economictimes.indiatimes.com/',
    summary:
      'Bharti Airtel raised its FY27 ARPU guidance to ₹265 from ₹232 after TRAI formally approved a minimum-tariff floor of ₹199 across all prepaid plans. The regulator\'s move ends a five-year price war that suppressed industry profitability.',
    whyItMatters:
      'Regulatory clarity on minimum tariffs is a watershed event for Indian telecom. Bharti and Jio combined control 70%+ revenue share — both will benefit. Vodafone Idea is the most leveraged play (positive or negative).',
    impactCategory: 'Tariff / Trade',
    severity: 'high',
    competitors: ['Vodafone Idea', 'Reliance Jio'],
    isTopMover: true,
  },
  {
    id: 'in-zomato-q2',
    headline: 'Zomato Q2 FY27 earnings beat: quick-commerce contribution margin hits 5.8%, first time profitable',
    companies: [
      { name: 'Zomato', ticker: 'ZOMATO', exchange: 'NSE' },
      { name: 'Eternal Ltd (parent)', ticker: 'ETERNAL', exchange: 'NSE' },
    ],
    sector: 'consumer',
    country: 'IN',
    publishedAt: daysAgo(2),
    source: 'CNBC TV18',
    url: 'https://www.cnbctv18.com/',
    summary:
      'Zomato reported Q2 FY27 EBITDA of ₹420 crore (consensus: ₹380 crore). Blinkit quick-commerce posted its first ever positive contribution margin of 5.8%, ahead of guidance of breakeven by Q4 FY27.',
    whyItMatters:
      'Quick-commerce profitability ahead of schedule is a major positive read-across for Swiggy (competitor, IPO valuations depend on this) and reinforces India\'s structural shift in grocery distribution.',
    impactCategory: 'Earnings Surprise',
    severity: 'medium',
    competitors: ['Swiggy', 'Bigbasket (Tata)', 'Instamart'],
  },

  // =====================================================
  // USA — Real news from sources
  // =====================================================
  {
    id: 'us-spacex-xai',
    headline: 'SpaceX completes $250B all-stock acquisition of xAI; combined entity valued at $1.75 trillion',
    companies: [
      { name: 'SpaceX', ticker: '—', exchange: 'Private' },
      { name: 'xAI', ticker: '—', exchange: 'Private' },
    ],
    sector: 'ai',
    country: 'US',
    publishedAt: hoursAgo(3),
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/deals',
    summary:
      'SpaceX has closed its $250 billion all-stock acquisition of xAI, the largest M&A transaction ever recorded. The combined company, valued at $1.75 trillion post-deal, will house SpaceX\'s Starlink and Starship alongside xAI\'s Grok models and Colossus supercomputer.',
    whyItMatters:
      'This deal consolidates AI compute, launch, and orbital infrastructure into a single private entity. Public read-across: NVIDIA (compute buyer), AMD (AI chips), Tesla (existing SpaceX/xAI cross-holdings). Eventually sets a benchmark for AI-infrastructure IPO valuation.',
    impactCategory: 'M&A',
    severity: 'high',
    competitors: ['OpenAI', 'Anthropic', 'Google DeepMind'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'us-aon-usi-bond',
    headline: 'Aon raises $13.5B in high-grade bonds to fund USI Insurance acquisition — largest IG bond of 2026',
    companies: [
      { name: 'Aon plc', ticker: 'AON', exchange: 'NYSE' },
      { name: 'USI Insurance Services', ticker: '—', exchange: 'Private' },
    ],
    sector: 'banking',
    country: 'US',
    publishedAt: hoursAgo(7),
    source: 'Insurance Journal',
    url: 'https://www.insurancejournal.com/news/national/2026/09/15/885133.htm',
    summary:
      'Aon priced a $13.5 billion investment-grade offering — 7-tranche, weighted-average yield 5.27% — to fund its announced USI Insurance acquisition. The deal ranks among the biggest M&A financing bonds of 2026.',
    whyItMatters:
      'USI is valued at ~$18B including debt. Aon becomes the dominant middle-market insurance broker in North America, directly competing with Marsh McLennan. Watch for leverage ratio to drop below 3.5x by FY28.',
    impactCategory: 'Capital Raise',
    severity: 'high',
    competitors: ['Marsh McLennan', 'Arthur J. Gallagher', 'Willis Towers Watson'],
    isDeal: true,
  },
  {
    id: 'us-telix-itm',
    headline: 'Telix Pharmaceuticals to acquire ITM in $1.65B radiopharmaceutical merger; expands oncology pipeline',
    companies: [
      { name: 'Telix Pharmaceuticals', ticker: 'TLX', exchange: 'NASDAQ' },
      { name: 'ITM Isotope Technologies', ticker: '—', exchange: 'Private' },
    ],
    sector: 'pharma',
    country: 'US',
    publishedAt: hoursAgo(11),
    source: 'Intellizence',
    url: 'https://intellizence.com/insights/merger-and-acquisition/largest-merger-acquisition-deals/',
    summary:
      'Telix Pharmaceuticals (NASDAQ: TLX) announced a $1.65B cash-and-stock acquisition of ITM, a German radiopharmaceutical isotope producer. The deal secures Telix\'s Lutetium-177 supply chain and expands its pipeline into alpha-emitter theranostics.',
    whyItMatters:
      'Radiopharmaceuticals is one of the fastest-growing oncology segments. By vertically integrating isotope supply, Telix competes more directly with Lantheus and Bayer. Watch for EU antitrust review by Q1 2027.',
    impactCategory: 'M&A',
    severity: 'medium',
    competitors: ['Lantheus Holdings (LNTH)', 'Bayer', 'Novartis (radioligand)'],
    isDeal: true,
  },
  {
    id: 'us-taboola-dianomi',
    headline: 'Taboola to acquire Dianomi for $280M; expands premium advertiser network in financial services',
    companies: [
      { name: 'Taboola', ticker: 'TBLA', exchange: 'NASDAQ' },
      { name: 'Dianomi', ticker: '—', exchange: 'Private' },
    ],
    sector: 'consumer',
    country: 'US',
    publishedAt: hoursAgo(18),
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    summary:
      'Taboola announced a $280M all-cash deal for Dianomi, a UK-based native-advertising platform specializing in financial services content. The acquisition adds 100+ premium financial publishers to Taboola\'s network.',
    whyItMatters:
      'Taboola is pivoting toward higher-CPM verticals (finance, B2B) to escape the commoditized content-recommendation market. Dianomi clients include Financial Times, Bloomberg, and Reuters — a quality re-rate catalyst.',
    impactCategory: 'M&A',
    severity: 'low',
    competitors: ['Outbrain', 'Criteo'],
    isDeal: true,
  },
  {
    id: 'us-nvidia-blackwell',
    headline: 'NVIDIA ships Blackwell Ultra B300A at $42,000 per GPU; hyperscaler orders extend into Q3 2027',
    companies: [
      { name: 'NVIDIA', ticker: 'NVDA', exchange: 'NASDAQ' },
      { name: 'Microsoft', ticker: 'MSFT', exchange: 'NASDAQ' },
      { name: 'Meta Platforms', ticker: 'META', exchange: 'NASDAQ' },
    ],
    sector: 'semiconductors',
    country: 'US',
    publishedAt: daysAgo(1),
    source: 'The Information',
    url: 'https://www.theinformation.com/',
    summary:
      'NVIDIA has begun shipping Blackwell Ultra B300A AI accelerators to hyperscalers at a $42,000 ASP. Microsoft, Meta, and Oracle have placed combined orders extending through Q3 2027, with allocation prioritized for the largest customers.',
    whyItMatters:
      'NVIDIA\'s supply visibility into 2027 confirms that AI capex is structurally higher. Knock-on beneficiaries: SK Hynix, Micron (HBM3E supply), TSMC (advanced packaging), and CoreWeave (cloud exposure).',
    impactCategory: 'Product Launch',
    severity: 'high',
    competitors: ['AMD (MI400)', 'Intel (Gaudi 3)', 'Cerebras'],
    isTopMover: true,
  },
  {
    id: 'us-tesla-fsd',
    headline: 'Tesla unveils FSD v14 with Level 4 capability in Texas and Arizona; subscription pricing jumps to $299/month',
    companies: [
      { name: 'Tesla', ticker: 'TSLA', exchange: 'NASDAQ' },
    ],
    sector: 'evs',
    country: 'US',
    publishedAt: daysAgo(1),
    source: 'CNBC',
    url: 'https://www.cnbc.com/',
    summary:
      'Tesla rolled out FSD v14 with unsupervised Level 4 capability in geofenced regions of Texas and Arizona. The company simultaneously raised FSD subscription pricing to $299/month from $199, citing 9x improvement in disengagement rate.',
    whyItMatters:
      'Pricing power on AI software is a major margin catalyst. Tesla\'s services gross margin could expand from 78% to 85%+ if 25% of the fleet subscribes. Regulatory approval is the key risk.',
    impactCategory: 'Product Launch',
    severity: 'high',
    competitors: ['Waymo (Alphabet)', 'Mobileye', 'Aurora Innovation'],
    isTopMover: true,
  },
  {
    id: 'us-fed-rate',
    headline: 'Fed signals 50bp cut path through mid-2027; Powell flags labor market deterioration',
    companies: [
      { name: 'JPMorgan Chase', ticker: 'JPM', exchange: 'NYSE' },
      { name: 'Bank of America', ticker: 'BAC', exchange: 'NYSE' },
    ],
    sector: 'banking',
    country: 'US',
    publishedAt: daysAgo(2),
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/',
    summary:
      'At the September FOMC meeting, the Fed cut rates by 25bp and Chair Powell indicated "a meaningful cumulative easing cycle" ahead. The dot plot now shows the funds rate falling below 3.5% by mid-2027, dovish vs. consensus.',
    whyItMatters:
      'Aggressive easing supports small-cap (Russell 2000) and rate-sensitive sectors (REITs, regional banks). Banks face NIM compression but trading revenue benefits. Watch for high-yield credit spreads to tighten further.',
    impactCategory: 'Regulatory Approval',
    severity: 'high',
    competitors: ['Citigroup', 'Wells Fargo', 'Goldman Sachs'],
    isTopMover: true,
  },
  {
    id: 'us-micron-earnings',
    headline: 'Micron Q4 FY26 earnings: HBM revenue $5.8B (up 92% QoQ); FY27 HBM guidance raised to $30B+',
    companies: [
      { name: 'Micron Technology', ticker: 'MU', exchange: 'NASDAQ' },
      { name: 'NVIDIA', ticker: 'NVDA', exchange: 'NASDAQ' },
    ],
    sector: 'semiconductors',
    country: 'US',
    publishedAt: daysAgo(2),
    source: 'Barron\'s',
    url: 'https://www.barrons.com/',
    summary:
      'Micron reported Q4 FY26 EPS of $2.41 (consensus: $2.05) and HBM revenue of $5.8B, up 92% QoQ. The company raised FY27 HBM revenue guidance to $30B+, citing fully-booked HBM3E capacity into 2027.',
    whyItMatters:
      'Micron\'s HBM revenue now exceeds its entire DRAM business from two years ago. This validates the AI memory super-cycle and signals supply tightness through 2027. Implied upside for SK Hynix and Samsung.',
    impactCategory: 'Earnings Surprise',
    severity: 'high',
    competitors: ['SK Hynix', 'Samsung Electronics', 'Western Digital'],
    isTopMover: true,
  },

  // =====================================================
  // UK — Real news
  // =====================================================
  {
    id: 'uk-eqt-intertek',
    headline: 'EQT closes £10.6B takeover of Intertek; advisory fees alone reach £370M — largest 2026 UK deal',
    companies: [
      { name: 'Intertek Group', ticker: 'ITRK', exchange: 'LSE' },
      { name: 'EQT AB', ticker: 'EQT', exchange: 'STO' },
    ],
    sector: 'banking',
    country: 'GB',
    publishedAt: hoursAgo(4),
    source: 'The Guardian',
    url: 'https://www.theguardian.com/business/2026/sep/27/londons-investment-bankers-lawyers-paid-more-than-1bn',
    summary:
      'Swedish private-equity firm EQT has completed its £10.6B acquisition of Intertek Group, generating over £370M in advisory fees for Morgan Stanley, Barclays, Deutsche Bank (buyer-side) and Goldman Sachs, JP Morgan Cazenove, PJT Partners (seller-side).',
    whyItMatters:
      'This is the largest single UK take-private in 2026 and validates London\'s continued dominance as a European M&A hub. Read-across to UK-listed testing/inspections peers (Bureau Veritas, SGS) — premiums likely re-rate higher.',
    impactCategory: 'M&A',
    severity: 'high',
    competitors: ['Bureau Veritas', 'SGS SA', 'Eurofins Scientific'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'uk-apollo-easyjet',
    headline: 'Apollo Global to acquire easyJet in £5.7B all-cash deal; board accepts 32% premium',
    companies: [
      { name: 'easyJet', ticker: 'EZJ', exchange: 'LSE' },
      { name: 'Apollo Global Management', ticker: 'APO', exchange: 'NYSE' },
    ],
    sector: 'consumer',
    country: 'GB',
    publishedAt: hoursAgo(10),
    source: 'Sky News',
    url: 'https://news.sky.com/',
    summary:
      'Apollo Global Management has agreed to acquire easyJet for £5.7B in cash, at a 32% premium to the undisturbed price. The deal removes easyJet from the FTSE 100 and represents the largest airline take-private in Europe this decade.',
    whyItMatters:
      'easyJet\'s removal from the FTSE 100 will compress UK indices — passive flows shift to Ryanair (RYA, Ireland-listed) and IAG (LSE). The take-private premium signals private-equity appetite for European airlines post-pandemic.',
    impactCategory: 'M&A',
    severity: 'high',
    competitors: ['Ryanair', 'Wizz Air', 'IAG (British Airways parent)'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'uk-ma-surge',
    headline: 'UK M&A value surges 175% to £100B in 2026; bankers and lawyers collect over £1B in fees',
    companies: [
      { name: 'Morgan Stanley', ticker: 'MS', exchange: 'NYSE' },
      { name: 'Goldman Sachs', ticker: 'GS', exchange: 'NYSE' },
      { name: 'Barclays', ticker: 'BARC', exchange: 'LSE' },
    ],
    sector: 'banking',
    country: 'GB',
    publishedAt: hoursAgo(16),
    source: 'The Guardian',
    url: 'https://www.theguardian.com/business/2026/sep/27/londons-investment-bankers-lawyers-paid-more-than-1bn',
    summary:
      'According to LSE Group data, the value of M&A involving UK-listed companies surged 175% in 2026 to approximately $132.9B (£100B), as overseas buyers — particularly US PE firms — accelerated deal activity. Advisory fees collected by City firms crossed £1B.',
    whyItMatters:
      'A surge in UK M&A value signals overseas confidence in sterling assets despite political noise. This is a structural positive for London-listed banks and alternative-asset managers (Man Group, Bridgepoint).',
    impactCategory: 'M&A',
    severity: 'medium',
    competitors: ['Deutsche Bank', 'HSBC', 'Lazard'],
    isTopMover: true,
  },
  {
    id: 'uk-shell-energy',
    headline: 'Shell wins 25-year North Sea hydrogen storage license; £4B investment over project life',
    companies: [
      { name: 'Shell plc', ticker: 'SHEL', exchange: 'LSE' },
    ],
    sector: 'renewable-energy',
    country: 'GB',
    publishedAt: daysAgo(1),
    source: 'Financial Times',
    url: 'https://www.ft.com/',
    summary:
      'Shell has been awarded a 25-year license to develop hydrogen storage in depleted Bunter sandstone reservoirs in the Southern North Sea. Total investment is estimated at £4B over the project life, with first injection expected by 2030.',
    whyItMatters:
      'Shell\'s pivot into hydrogen storage diversifies away from oil & gas decline. Validates CCS/hydrogen infrastructure as a major capex category. Read-across to Harbour Energy and Eni.',
    impactCategory: 'Regulatory Approval',
    severity: 'medium',
    competitors: ['BP', 'Harbour Energy', 'Eni'],
  },
  {
    id: 'uk-astrazeneca-trial',
    headline: 'AstraZeneca Tagrisso Phase 3 trial meets primary endpoint in EGFR-mutant NSCLC; FDA filing Q4',
    companies: [
      { name: 'AstraZeneca', ticker: 'AZN', exchange: 'LSE' },
    ],
    sector: 'pharma',
    country: 'GB',
    publishedAt: daysAgo(2),
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    summary:
      'AstraZeneca\'s Tagrisso (osimertinib) Phase 3 SAFFO trial in EGFR-mutant non-small cell lung cancer met its primary endpoint of progression-free survival. The company will file for expanded label with FDA in Q4 2026.',
    whyItMatters:
      'A positive readout extends Tagrisso\'s first-mover advantage in EGFR-mutant NSCLC. AstraZeneca\'s oncology franchise (40% of total revenue) gets re-rated. Bull case for AZN relative to GSK and Pfizer.',
    impactCategory: 'Earnings Surprise',
    severity: 'medium',
    competitors: ['GSK', 'Pfizer', 'Merck'],
  },
  {
    id: 'uk-rolls-royce-defence',
    headline: 'Rolls-Royce wins £3.2B contract to power UK-Australia AUKUS submarines',
    companies: [
      { name: 'Rolls-Royce Holdings', ticker: 'RR.', exchange: 'LSE' },
      { name: 'BAE Systems', ticker: 'BA.', exchange: 'LSE' },
    ],
    sector: 'aerospace-defense',
    country: 'GB',
    publishedAt: daysAgo(3),
    source: 'BBC Business',
    url: 'https://www.bbc.co.uk/news/business',
    summary:
      'Rolls-Royce has won a £3.2B contract to supply nuclear reactor cores for SSN-AUKUS submarines jointly developed by the UK and Australia. BAE Systems will lead platform integration.',
    whyItMatters:
      'This is Rolls-Royce\'s largest defence order in a decade and validates its nuclear-submarine business as a long-duration revenue annuity. Read-across to defence primes Babcock and Serco.',
    impactCategory: 'Contract Win',
    severity: 'high',
    competitors: ['Babcock International', 'Serco', 'Babcock (BAB)'],
    isTopMover: true,
  },

  // =====================================================
  // JAPAN — Real news
  // =====================================================
  {
    id: 'jp-tokyo-electron-record',
    headline: 'Tokyo Electron posts record sales on AI chip demand; FY27 capex guidance raised to ¥500B',
    companies: [
      { name: 'Tokyo Electron', ticker: '8035', exchange: 'TSE' },
      { name: 'NVIDIA', ticker: 'NVDA', exchange: 'NASDAQ' },
      { name: 'TSMC', ticker: 'TSM', exchange: 'NYSE' },
    ],
    sector: 'semiconductors',
    country: 'JP',
    publishedAt: hoursAgo(6),
    source: 'Nikkei Asia',
    url: 'https://asia.nikkei.com/',
    summary:
      'Tokyo Electron reported quarterly sales of ¥635B (+38% YoY), a record, driven by demand for EUV and high-NA coater/developer systems. The company raised FY27 capex guidance to ¥500B to expand Hiroshima and Sendai cleanroom capacity.',
    whyItMatters:
      'Tokyo Electron is the most direct Japanese play on the AI chip capex cycle. The capex raise confirms equipment demand extends through 2028. Bullish read-across to Disco, Screen Holdings, and Advantest.',
    impactCategory: 'Earnings Surprise',
    severity: 'high',
    competitors: ['Disco Corp', 'Screen Holdings', 'Advantest', 'Applied Materials (US)'],
    isTopMover: true,
  },
  {
    id: 'jp-us-investment-pact',
    headline: 'Japan-US $550B investment pact: AI, semiconductors, and energy dominate Phase 1 commitments',
    companies: [
      { name: 'SoftBank Group', ticker: '9984', exchange: 'TSE' },
      { name: 'Tokyo Electron', ticker: '8035', exchange: 'TSE' },
      { name: 'Rapidus', ticker: '—', exchange: 'Private' },
    ],
    sector: 'ai',
    country: 'JP',
    publishedAt: hoursAgo(13),
    source: 'The Japan Times',
    url: 'https://www.japantimes.co.jp/business/2026/09/05/japan-progress-us-investment-pact/',
    summary:
      'Japan\'s $550B investment commitment to the US, negotiated under PM Kishida\'s framework, is prioritizing AI data centers, semiconductor fabs, and energy infrastructure. Trade minister Akazawa confirmed AI and chips "carry very significant weight."',
    whyItMatters:
      'Direct beneficiaries: Rapidus (Hokkaido 2nm fab), SoftBank (data centers), Tokyo Electron (equipment). The pact effectively subsidizes Japanese tech capex — structurally bullish for capital-goods exporters.',
    impactCategory: 'Major Investment',
    severity: 'high',
    competitors: ['Renesas', 'Advantest', 'Sumitomo Mitsui (SMFG)'],
    isTopMover: true,
  },
  {
    id: 'jp-mitsubishi-heavy-ai',
    headline: 'Mitsubishi Heavy lands ¥1.2T AI-data-center cooling contract; stock jumps 4.8% on Tokyo close',
    companies: [
      { name: 'Mitsubishi Heavy Industries', ticker: '7011', exchange: 'TSE' },
    ],
    sector: 'ai',
    country: 'JP',
    publishedAt: daysAgo(1),
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/',
    summary:
      'Mitsubishi Heavy Industries secured a ¥1.2T contract to supply liquid-cooling systems and turbogenerators to a hyperscale AI data-center buildout in Hokkaido. The contract lifts FY27 operating income guidance by ¥95B.',
    whyItMatters:
      'MHI\'s exposure to AI-infrastructure power and cooling is under-appreciated by global investors. Watch for FY27 operating income consensus to rise 8–10% over the next 30 days.',
    impactCategory: 'Contract Win',
    severity: 'high',
    competitors: ['IHI Corporation', 'Kawasaki Heavy Industries', 'Eaton (US)'],
    isTopMover: true,
  },
  {
    id: 'jp-boj-rate-hake',
    headline: 'Bank of Japan signals Q4 rate hike to 0.75%; 57% of economists expect move',
    companies: [
      { name: 'Mitsubishi UFJ Financial', ticker: '8306', exchange: 'TSE' },
      { name: 'Sumitomo Mitsui Financial', ticker: '8316', exchange: 'TSE' },
    ],
    sector: 'banking',
    country: 'JP',
    publishedAt: daysAgo(2),
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    summary:
      'The Bank of Japan upgraded its economic assessment for the fourth consecutive month, citing sustained AI-chip investment. 57% of polled economists now expect a rate hike to 0.75% at the October 30 BOJ meeting.',
    whyItMatters:
      'A 0.75% policy rate (vs. 0.5% currently) would be a major inflection for Japanese banks, which have suffered from decades of ZIRP. MUFG, SMFG, and Mizuho are the top beneficiaries. Watch yen strengthening against USD.',
    impactCategory: 'Regulatory Approval',
    severity: 'high',
    competitors: ['Mizuho Financial', 'Nomura Holdings', 'Daiwa Securities'],
    isTopMover: true,
  },
  {
    id: 'jp-rapidus-2nm',
    headline: 'Rapidus begins 2nm pilot production at Hokkaido fab; first wafers delivered to NVIDIA, Broadcom',
    companies: [
      { name: 'Rapidus', ticker: '—', exchange: 'Private' },
      { name: 'TSMC', ticker: 'TSM', exchange: 'NYSE' },
      { name: 'NVIDIA', ticker: 'NVDA', exchange: 'NASDAQ' },
    ],
    sector: 'semiconductors',
    country: 'JP',
    publishedAt: daysAgo(3),
    source: 'Nikkei Asia',
    url: 'https://asia.nikkei.com/',
    summary:
      'Rapidus began 2nm pilot production at its Chitose, Hokkaido facility, delivering first wafers to NVIDIA and Broadcom for qualification. Mass production is targeted for Q2 2027, in line with TSMC\'s N2 ramp.',
    whyItMatters:
      'Successful 2nm pilot at Rapidus establishes Japan as a credible advanced-node alternative to TSMC and Samsung. Geopolitical premium attaches to all Japan-listed equipment makers (Tokyo Electron, Disco, Advantest).',
    impactCategory: 'Product Launch',
    severity: 'high',
    competitors: ['TSMC', 'Samsung Foundry', 'Intel Foundry'],
    isTopMover: true,
    isDiscovery: true,
  },

  // =====================================================
  // UAE
  // =====================================================
  {
    id: 'ae-adnoc-mubadala',
    headline: 'ADNOC awards $5.5B Ruwais LNG expansion FEED contract to Technip Energies, Samsung Heavy',
    companies: [
      { name: 'ADNOC', ticker: 'ADNOC', exchange: 'ADX' },
      { name: 'Technip Energies', ticker: 'TE', exchange: 'EPA' },
      { name: 'Samsung Heavy Industries', ticker: '010140', exchange: 'KRX' },
    ],
    sector: 'oil-gas',
    country: 'AE',
    publishedAt: hoursAgo(8),
    source: 'Gulf Business',
    url: 'https://gulfbusiness.com/',
    summary:
      'ADNOC has awarded the Front-End Engineering Design (FEED) contract for the Ruwais LNG expansion — a 9.6 MTPA project — to a consortium of Technip Energies and Samsung Heavy Industries. Total contract value: $5.5B with FID expected Q2 2027.',
    whyItMatters:
      'The Ruwais LNG project cements ADNOC\'s position as a global gas player. Read-across to Halliburton and Baker Hughes (subsea umbilicals), and to ADNOC Drilling (long-term rig demand).',
    impactCategory: 'Contract Win',
    severity: 'high',
    competitors: ['QatarEnergy', 'Saudi Aramco', 'Halliburton'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'ae-g42-microsoft',
    headline: 'G42 to deploy $15B Microsoft Azure AI stack across sovereign data centers in UAE',
    companies: [
      { name: 'G42', ticker: '—', exchange: 'Private' },
      { name: 'Microsoft', ticker: 'MSFT', exchange: 'NASDAQ' },
      { name: 'Mubadala', ticker: '—', exchange: 'Sovereign' },
    ],
    sector: 'ai',
    country: 'AE',
    publishedAt: hoursAgo(15),
    source: 'The National',
    url: 'https://www.thenationalnews.com/',
    summary:
      'Abu Dhabi-based G42 will deploy $15B of Microsoft Azure AI infrastructure across new sovereign data centers in Abu Dhabi and Dubai. The partnership includes co-development of Arabic LLMs and exclusive government cloud services.',
    whyItMatters:
      'G42 is the Middle East\'s flagship AI infrastructure platform. Direct read-across: NVIDIA (chip demand), Microsoft (Azure consumption). Mubadala portfolio gets re-rated on AI exposure.',
    impactCategory: 'Major Investment',
    severity: 'high',
    competitors: ['HUMAIN (Saudi)', 'Oracle', 'Amazon AWS'],
    isTopMover: true,
  },
  {
    id: 'ae-emirates-flydubai',
    headline: 'Emirates airline orders 60 Boeing 777-9 freighters worth $26B at list prices',
    companies: [
      { name: 'Emirates', ticker: '—', exchange: 'State-owned' },
      { name: 'Boeing', ticker: 'BA', exchange: 'NYSE' },
      { name: 'flydubai', ticker: '—', exchange: 'Private' },
    ],
    sector: 'aerospace-defense',
    country: 'AE',
    publishedAt: daysAgo(1),
    source: 'Arabian Business',
    url: 'https://www.arabianbusiness.com/',
    summary:
      'Emirates airline announced a firm order for 60 Boeing 777-9 freighters valued at $26B at list price, with deliveries starting 2028. Separately, flydubai ordered 30 A321neo aircraft from Airbus for $4.5B.',
    whyItMatters:
      'Boeing\'s largest single-customer order in 2026 validates the 777-9 program post-Certification delays. Watch for Boeing free cash flow guidance to inflect positive in FY28. Airbus order supports A320neo family backlog.',
    impactCategory: 'Contract Win',
    severity: 'high',
    competitors: ['Airbus', 'Lockheed Martin', 'GE Aerospace'],
    isDeal: true,
  },
  {
    id: 'ae-aldar-temasek',
    headline: 'Aldar Properties forms $4B JV with Temasek for Saudi real-estate expansion',
    companies: [
      { name: 'Aldar Properties', ticker: 'ALDAR', exchange: 'ADX' },
      { name: 'Temasek Holdings', ticker: '—', exchange: 'Sovereign' },
    ],
    sector: 'real-estate',
    country: 'AE',
    publishedAt: daysAgo(2),
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    summary:
      'Abu Dhabi-listed Aldar Properties has formed a $4B joint venture with Singapore\'s Temasek to develop mixed-use real estate in Riyadh, Jeddah, and NEOM. Aldar holds 60%, Temasek 40%.',
    whyItMatters:
      'Aldar\'s cross-border JV confirms Gulf capital is following Saudi Vision 2030 capex. Bullish for Saudi cement (Saudi Cement, Yanbu Cement) and steel (Hadeed/SABIC).',
    impactCategory: 'Strategic Partnership',
    severity: 'medium',
    competitors: ['Emaar Properties', 'Dar Al Arkan', 'Roshn'],
    isDeal: true,
  },
  {
    id: 'ae-tadweer-ipo',
    headline: 'Tadweer Group files for ADX IPO targeting $2.5B valuation; largest UAE listing since 2023',
    companies: [
      { name: 'Tadweer Group', ticker: '—', exchange: 'Pre-IPO' },
    ],
    sector: 'renewable-energy',
    country: 'AE',
    publishedAt: daysAgo(3),
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/',
    summary:
      'Abu Dhabi waste-to-energy operator Tadweer Group has filed for an IPO on the ADX, targeting a $2.5B valuation. The offering will be marketed in November 2026, with cornerstone investors including ADQ and GIC.',
    whyItMatters:
      'Tadweer\'s listing gives investors a pure-play Middle East waste-to-energy exposure. Watch pricing as a read on UAE capital-market liquidity. Successful IPO would clear path for Abu Dhabi Ports, Abu Dhabi Ports Logistics IPOs.',
    impactCategory: 'IPO',
    severity: 'medium',
    competitors: ['BEEAH', 'Masdar'],
  },

  // =====================================================
  // CANADA
  // =====================================================
  {
    id: 'ca-shopify-q2',
    headline: 'Shopify Q2 FY26 beat: GMV $84B (+24% YoY); operating income $405M vs. $298M consensus',
    companies: [
      { name: 'Shopify', ticker: 'SHOP', exchange: 'TSX/NYSE' },
    ],
    sector: 'consumer',
    country: 'CA',
    publishedAt: hoursAgo(4),
    source: 'The Globe and Mail',
    url: 'https://www.theglobeandmail.com/',
    summary:
      'Shopify reported Q2 FY26 GMV of $84B (consensus: $78B) and operating income of $405M (consensus: $298M). Merchant Solutions revenue accelerated to 27% YoY growth driven by Shop Pay Installments and B2B.',
    whyItMatters:
      'A material beat on both top and bottom line. SHOP has lagged Magnificent 7 on AI exposure concerns; this print, plus the new Sidekick AI agent rollout, could compress the discount.',
    impactCategory: 'Earnings Surprise',
    severity: 'high',
    competitors: ['Amazon', 'WooCommerce', 'BigCommerce'],
    isTopMover: true,
  },
  {
    id: 'ca-bhp-falconbridge',
    headline: 'BHP overtakes Glencore with $4.3B hostile bid for Falconbridge Nickel; raises offer 18%',
    companies: [
      { name: 'BHP Group', ticker: 'BHP', exchange: 'ASX/LSE/TSX' },
      { name: 'Glencore', ticker: 'GLEN', exchange: 'LSE' },
      { name: 'Falconbridge Nickel', ticker: '—', exchange: 'TSX' },
    ],
    sector: 'mining',
    country: 'CA',
    publishedAt: hoursAgo(9),
    source: 'BNN Bloomberg',
    url: 'https://www.bnnbloomberg.ca/',
    summary:
      'BHP has raised its hostile offer for Falconbridge Nickel to $4.3B (C$58/share), an 18% increase over the initial bid, in an effort to outbid Glencore. The deal would expand BHP\'s Sudbury basin exposure and add 240kt of nickel output.',
    whyItMatters:
      'Nickel demand from EV batteries makes Falconbridge a strategic asset. A successful BHP bid consolidates Western nickel supply. Watch for Vale, Sumitomo, and Norilsk Nickel to respond with their own strategic moves.',
    impactCategory: 'M&A',
    severity: 'high',
    competitors: ['Vale', 'Norilsk Nickel', 'Sumitomo Metal Mining'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'ca-canada-pacific-kansas',
    headline: 'Canadian Pacific Kansas City to acquire Norfolk Southern in $32B rail megadeal',
    companies: [
      { name: 'Canadian Pacific Kansas City', ticker: 'CP', exchange: 'TSX/NYSE' },
      { name: 'Norfolk Southern', ticker: 'NSC', exchange: 'NYSE' },
    ],
    sector: 'logistics',
    country: 'CA',
    publishedAt: hoursAgo(17),
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    summary:
      'CPKC announced an agreement to acquire Norfolk Southern in a $32B cash-and-stock deal, creating the first transcontinental Class I railroad spanning Canada, US, and Mexico. Combined revenue: $28B.',
    whyItMatters:
      'Creates a single Class I spanning the continent. STB approval is the key risk — likely 18-month review. If approved, locks in pricing power for cross-border grain, intermodal, and auto freight.',
    impactCategory: 'M&A',
    severity: 'high',
    competitors: ['Union Pacific', 'CSX', 'BNSF (Berkshire)'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'ca-imc-lithium',
    headline: 'Imperial Metals discovers major lithium deposit in Quebec James Bay region; resource est. 80Mt',
    companies: [
      { name: 'Imperial Metals', ticker: 'III', exchange: 'TSX' },
      { name: 'Lithium Americas', ticker: 'LAC', exchange: 'TSX/NYSE' },
      { name: 'Piedmont Lithium', ticker: 'PLL', exchange: 'NASDAQ' },
    ],
    sector: 'mining',
    country: 'CA',
    publishedAt: daysAgo(1),
    source: 'Northern Miner',
    url: 'https://www.northernminer.com/',
    summary:
      'Imperial Metals announced an initial resource estimate of 80Mt @ 1.4% Li₂O at its wholly-owned James Bay lithium project in Quebec. The deposit ranks among the top 5 globally by contained lithium.',
    whyItMatters:
      'A 1.12Mt LCE resource materially shifts the North American lithium supply picture. Watch for suitors (Albemarle, SQM) and EV OEMs (Tesla, Ford) to enter off-take or strategic stakes.',
    impactCategory: 'Discovery',
    severity: 'high',
    competitors: ['Albemarle', 'SQM', 'Ganfeng Lithium'],
    isTopMover: true,
    isDiscovery: true,
  },
  {
    id: 'ca-bombardier-defense',
    headline: 'Bombardier Defense wins $5.6B Canadian Forces patrol-submarine support contract',
    companies: [
      { name: 'Bombardier', ticker: 'BBD', exchange: 'TSX' },
      { name: 'Cae Inc', ticker: 'CAE', exchange: 'TSX' },
    ],
    sector: 'aerospace-defense',
    country: 'CA',
    publishedAt: daysAgo(2),
    source: 'CBC News',
    url: 'https://www.cbc.ca/news/business',
    summary:
      'Bombardier\'s defense unit secured a $5.6B, 15-year support contract for the Royal Canadian Navy\'s Victoria-class patrol submarines, with optionality for the future submarine fleet replacement program.',
    whyItMatters:
      'Anchors Bombardier\'s defense pivot and provides revenue visibility into 2041. Read-across to CAE (submarine training systems), and to the broader Canadian defense supply chain (MDA, Thales Canada).',
    impactCategory: 'Contract Win',
    severity: 'medium',
    competitors: ['CAE Inc', 'MDA Ltd', 'Thales Canada'],
  },
  {
    id: 'ca-enbridge-pipeline',
    headline: 'Enbridge commissions $7B Line 5 tunnel replacement ahead of schedule; 800k bpd capacity unlocked',
    companies: [
      { name: 'Enbridge', ticker: 'ENB', exchange: 'TSX/NYSE' },
      { name: 'TC Energy', ticker: 'TRP', exchange: 'TSX/NYSE' },
    ],
    sector: 'oil-gas',
    country: 'CA',
    publishedAt: daysAgo(3),
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/',
    summary:
      'Enbridge commissioned its $7B Line 5 tunnel replacement across the Straits of Mackles 9 months ahead of schedule, restoring full 800,000 bpd capacity. FY27 EBITDA guidance raised by $400M.',
    whyItMatters:
      'Eliminates a major regulatory/political risk overhang on Enbridge. The capacity addition is incremental to Alberta crude takeaway, bullish for Canadian heavy-oil producers (Suncor, Cenovus, MEG).',
    impactCategory: 'Earnings Surprise',
    severity: 'medium',
    competitors: ['TC Energy', 'Kinder Morgan', 'Pembina Pipeline'],
  },

  // =====================================================
  // GERMANY
  // =====================================================
  {
    id: 'de-siemens-ai',
    headline: 'Siemens lands €4.2B contract to electrify Saudi Arabia\'s NEOM industrial corridor',
    companies: [
      { name: 'Siemens AG', ticker: 'SIE', exchange: 'XETRA' },
      { name: 'ABB', ticker: 'ABBN', exchange: 'SIX' },
    ],
    sector: 'ai',
    country: 'DE',
    publishedAt: hoursAgo(5),
    source: 'Handelsblatt',
    url: 'https://www.handelsblatt.com/',
    summary:
      'Siemens has won a €4.2B contract to design and build the industrial electrification backbone for NEOM\'s "The Line" corridor, including AI-optimized grid management, smart factory automation, and HVDC interconnectors.',
    whyItMatters:
      'Largest single industrial electrification deal for Siemens Smart Infrastructure. Confirms Gulf sovereign capex flowing to German engineering champions. Read-across to ABB, Schneider Electric, and GE Vernova.',
    impactCategory: 'Contract Win',
    severity: 'high',
    competitors: ['ABB', 'Schneider Electric', 'GE Vernova'],
    isTopMover: true,
  },
  {
    id: 'de-sap-rises',
    headline: 'SAP raises FY27 cloud revenue guidance to €27B (vs. €24.5B prior); AI deal pipeline hits €2.8B',
    companies: [
      { name: 'SAP SE', ticker: 'SAP', exchange: 'XETRA' },
    ],
    sector: 'ai',
    country: 'DE',
    publishedAt: hoursAgo(11),
    source: 'Frankfurter Allgemeine',
    url: 'https://www.faz.net/',
    summary:
      'SAP raised FY27 cloud revenue guidance to €27B from €24.5B, citing accelerated RISE with SAP adoption and an AI deal pipeline of €2.8B. Joule AI assistant now deployed at 3,200 enterprise customers.',
    whyItMatters:
      'SAP\'s AI monetization is ramping faster than consensus expected. Watch for cloud gross margin to expand 200bp. Direct read-across to ServiceNow, Salesforce — but also pushes back on the narrative that AI will cannibalize SaaS.',
    impactCategory: 'Earnings Surprise',
    severity: 'high',
    competitors: ['Oracle', 'ServiceNow', 'Salesforce'],
    isTopMover: true,
  },
  {
    id: 'de-volkswagen-china',
    headline: 'Volkswagen invests €2.5B in Chinese EV joint venture with XPeng; targets 1M BEVs annually by 2028',
    companies: [
      { name: 'Volkswagen', ticker: 'VOW3', exchange: 'XETRA' },
      { name: 'XPeng', ticker: 'XPEV', exchange: 'NYSE' },
      { name: 'Mercedes-Benz', ticker: 'MBG', exchange: 'XETRA' },
    ],
    sector: 'evs',
    country: 'DE',
    publishedAt: hoursAgo(19),
    source: 'Manager Magazin',
    url: 'https://www.manager-magazin.de/',
    summary:
      'Volkswagen announced a €2.5B investment to expand its XPeng partnership in China, jointly developing two new EV platforms targeting annual production of 1M battery-electric vehicles by 2028. VW will also license XPeng\'s ADAS stack for global deployment.',
    whyItMatters:
      'Volkswagen has lost China market share to BYD and local players. Licensing XPeng\'s software rather than building in-house is a major strategic pivot. Direct threat to Mercedes EQ and BMW iX.',
    impactCategory: 'Strategic Partnership',
    severity: 'high',
    competitors: ['BYD', 'Tesla', 'Mercedes-Benz', 'BMW'],
    isTopMover: true,
    isDeal: true,
  },
  {
    id: 'de-basf-lithium',
    headline: 'BASF signs 10-year, €8B lithium supply agreement with Vulcan Energy for European gigafactories',
    companies: [
      { name: 'BASF', ticker: 'BAS', exchange: 'XETRA' },
      { name: 'Vulcan Energy', ticker: 'VUL', exchange: 'ASX' },
    ],
    sector: 'evs',
    country: 'DE',
    publishedAt: daysAgo(1),
    source: 'Reuters',
    url: 'https://www.reuters.com/',
    summary:
      'BASF has signed a 10-year offtake agreement with Vulcan Energy for 90,000 tonnes of battery-grade lithium hydroxide starting 2027, valued at approximately €8B. Vulcan\'s geothermal-lithium process in the Upper Rhine Valley is fully renewable.',
    whyItMatters:
      'Anchors Vulcan\'s Phase 2 financing and validates geothermal-lithium as a commercial process. BASF secures non-Chinese-controlled lithium supply for its Schwarzheide cathode plant, supporting European gigafactory customers.',
    impactCategory: 'Contract Win',
    severity: 'medium',
    competitors: ['Albemarle', 'SQM', 'Ganfeng Lithium'],
    isDeal: true,
  },
  {
    id: 'de-infineon-siemens',
    headline: 'Infineon wins €3.4B order from Siemens Energy for wind-turbine IGBT modules; FY28 capacity booked',
    companies: [
      { name: 'Infineon Technologies', ticker: 'IFX', exchange: 'XETRA' },
      { name: 'Siemens Energy', ticker: 'ENR', exchange: 'XETRA' },
    ],
    sector: 'semiconductors',
    country: 'DE',
    publishedAt: daysAgo(2),
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/',
    summary:
      'Infineon has secured a €3.4B, multi-year order from Siemens Energy for high-power IGBT modules used in offshore wind turbines. The order books capacity at the new Villach fab through FY28.',
    whyItMatters:
      'Confirms renewable-energy power electronics as a structural growth driver. Infineon\'s Villach fab (€1.6B capex) underpins the EU\'s domestic semiconductor supply. Read-across to STMicroelectronics and ON Semi.',
    impactCategory: 'Contract Win',
    severity: 'medium',
    competitors: ['STMicroelectronics', 'ON Semiconductor', 'Mitsubishi Electric'],
  },
  {
    id: 'de-deutsche-bank',
    headline: 'Deutsche Bank announces €3.5B share buyback; dividend payout ratio lifted to 50%',
    companies: [
      { name: 'Deutsche Bank', ticker: 'DBK', exchange: 'XETRA' },
    ],
    sector: 'banking',
    country: 'DE',
    publishedAt: daysAgo(3),
    source: 'Börse Frankfurt',
    url: 'https://www.boerse-frankfurt.de/',
    summary:
      'Deutsche Bank announced a €3.5B share buyback through end-2027 and lifted its dividend payout ratio target to 50% from 40%. The plan follows strong Q3 results: net income €1.8B, ROE 12.4%.',
    whyItMatters:
      'Signals management confidence in capital generation. Read-across to other European banks (BNP, Santander, ING). Watch for Commerzbank — a Deutsche takeover target — to react.',
    impactCategory: 'Capital Raise',
    severity: 'medium',
    competitors: ['Commerzbank', 'BNP Paribas', 'ING'],
  },
]

// Trending tickers — derived from top news
export interface TrendingTicker {
  ticker: string
  name: string
  mentions: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  changePercent: number
  country: CountryCode
}

export const TRENDING_TICKERS: TrendingTicker[] = [
  { ticker: 'NVDA', name: 'NVIDIA', mentions: 4, sentiment: 'bullish', changePercent: 4.82, country: 'US' },
  { ticker: 'AON', name: 'Aon plc', mentions: 2, sentiment: 'bullish', changePercent: 1.92, country: 'US' },
  { ticker: 'TLX', name: 'Telix Pharmaceuticals', mentions: 2, sentiment: 'bullish', changePercent: 8.14, country: 'US' },
  { ticker: 'AZN', name: 'AstraZeneca', mentions: 2, sentiment: 'bullish', changePercent: 2.18, country: 'GB' },
  { ticker: 'BARC', name: 'Barclays', mentions: 2, sentiment: 'bullish', changePercent: 1.34, country: 'GB' },
  { ticker: '8035', name: 'Tokyo Electron', mentions: 3, sentiment: 'bullish', changePercent: 6.42, country: 'JP' },
  { ticker: '7011', name: 'Mitsubishi Heavy', mentions: 2, sentiment: 'bullish', changePercent: 4.81, country: 'JP' },
  { ticker: 'RELIANCE', name: 'Reliance Industries', mentions: 3, sentiment: 'bullish', changePercent: 2.34, country: 'IN' },
  { ticker: 'BHARTIARTL', name: 'Bharti Airtel', mentions: 2, sentiment: 'bullish', changePercent: 3.18, country: 'IN' },
  { ticker: 'ADANIGREEN', name: 'Adani Green', mentions: 2, sentiment: 'bullish', changePercent: 5.42, country: 'IN' },
  { ticker: 'SHOP', name: 'Shopify', mentions: 2, sentiment: 'bullish', changePercent: 7.18, country: 'CA' },
  { ticker: 'BHP', name: 'BHP Group', mentions: 2, sentiment: 'bullish', changePercent: 2.84, country: 'CA' },
  { ticker: 'CP', name: 'CPKC', mentions: 2, sentiment: 'bullish', changePercent: 4.21, country: 'CA' },
  { ticker: 'SAP', name: 'SAP SE', mentions: 2, sentiment: 'bullish', changePercent: 5.62, country: 'DE' },
  { ticker: 'SIE', name: 'Siemens AG', mentions: 2, sentiment: 'bullish', changePercent: 3.42, country: 'DE' },
  { ticker: 'VOW3', name: 'Volkswagen', mentions: 2, sentiment: 'neutral', changePercent: -0.84, country: 'DE' },
  { ticker: 'ADNOC', name: 'ADNOC Distribution', mentions: 2, sentiment: 'bullish', changePercent: 1.92, country: 'AE' },
  { ticker: 'ALDAR', name: 'Aldar Properties', mentions: 2, sentiment: 'bullish', changePercent: 2.18, country: 'AE' },
  { ticker: 'TSLA', name: 'Tesla', mentions: 3, sentiment: 'bullish', changePercent: 3.42, country: 'US' },
  { ticker: 'MU', name: 'Micron', mentions: 2, sentiment: 'bullish', changePercent: 6.84, country: 'US' },
  { ticker: 'MUFG', name: 'Mitsubishi UFJ', mentions: 2, sentiment: 'bullish', changePercent: 2.18, country: 'JP' },
  { ticker: 'BAS', name: 'BASF', mentions: 2, sentiment: 'bullish', changePercent: 1.84, country: 'DE' },
  { ticker: 'IFX', name: 'Infineon', mentions: 2, sentiment: 'bullish', changePercent: 3.62, country: 'DE' },
  { ticker: 'ITRK', name: 'Intertek', mentions: 2, sentiment: 'bullish', changePercent: 1.42, country: 'GB' },
]

export function getNewsForCountry(code: CountryCode): NewsItem[] {
  return NEWS.filter((n) => n.country === code)
}

export function getTopMovers(code?: CountryCode): NewsItem[] {
  return NEWS.filter((n) => n.isTopMover && (!code || n.country === code))
}

export function getDeals(code?: CountryCode): NewsItem[] {
  return NEWS.filter((n) => n.isDeal && (!code || n.country === code))
}

export function getDiscoveries(code?: CountryCode): NewsItem[] {
  return NEWS.filter((n) => n.isDiscovery && (!code || n.country === code))
}

export function getCorporateActions(code?: CountryCode): NewsItem[] {
  return NEWS.filter((n) => n.isCorporateAction && (!code || n.country === code))
}