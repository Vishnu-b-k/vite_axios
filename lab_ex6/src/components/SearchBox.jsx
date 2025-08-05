import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const quickSearchOptions = ['nature', 'animals', 'technology', 'food', 'travel']

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for photos..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600 mr-2">Quick search:</span>
        {quickSearchOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSearch(option)}
            disabled={loading}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 disabled:opacity-50"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
