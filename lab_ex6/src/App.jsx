import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import PhotoCard from './components/PhotoCard'
import Loading from './components/Loading'
import Error from './components/Error'

function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentQuery, setCurrentQuery] = useState('')

  const searchPhotos = async (query) => {
    setLoading(true)
    setError(null)
    setCurrentQuery(query)

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          per_page: 12,
          client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }
      })
      
      setPhotos(response.data.results)
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || 'Failed to fetch photos. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const retrySearch = () => {
    if (currentQuery) {
      searchPhotos(currentQuery)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Photo Gallery Dashboard
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Discover amazing photos from Unsplash
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar onSearch={searchPhotos} loading={loading} />

        {loading && <Loading />}
        
        {error && <Error message={error} onRetry={retrySearch} />}
        
        {!loading && !error && photos.length === 0 && currentQuery && (
          <div className="text-center py-12">
            <p className="text-gray-600">No photos found for "{currentQuery}". Try a different search term.</p>
          </div>
        )}

        {!loading && !error && photos.length === 0 && !currentQuery && (
          <div className="text-center py-12">
            <p className="text-gray-600">Search for photos to get started!</p>
          </div>
        )}

        {!loading && !error && photos.length > 0 && (
          <div>
            <p className="text-gray-600 mb-6">
              Showing {photos.length} results for "{currentQuery}"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Photos provided by <a href="https://unsplash.com" className="text-blue-600 hover:underline">Unsplash</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
