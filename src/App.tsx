import { useState } from 'react'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import type { CountryCode } from './lib/utils'
import { NEWS } from './data/news'

function App() {
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>(['US', 'IN', 'GB', 'JP'])
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Header
        selectedCountries={selectedCountries}
        onCountriesChange={setSelectedCountries}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalNews={NEWS.length}
      />
      <div className="flex-1 min-h-0">
        <Dashboard
          selectedCountries={selectedCountries}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>
    </div>
  )
}

export default App