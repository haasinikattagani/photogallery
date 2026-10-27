import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PhotoCard from './PhotoCard'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import {
  FAVOURITES_STORAGE_KEY,
  favouritesReducer,
  loadFavourites,
} from '../reducers/favouritesReducer'

function Gallery() {
  // 1. Data: fetching lives in the custom hook, not here.
  const { photos, loading, error } = useFetchPhotos()

  // 2. Search text (independent UI state, so useState is fine).
  const [query, setQuery] = useState('')

  // 3. Favourites: a list of photo IDs managed by a reducer, started from localStorage.
  const [favourites, dispatch] = useReducer(favouritesReducer, null, loadFavourites)

  // Save favourites whenever they change. Only "favourites" is a dependency, so there is no loop.
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // Storage may be full or blocked; the app keeps working without saving.
    }
  }, [favourites])

  // Search handler: setQuery never changes, so the function can be kept between renders.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // Filtered list: recalculated only when the photos or the search text change.
  const filteredPhotos = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term === '') return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, query])

  function handleToggleFavourite(id) {
    dispatch({
      type: favourites.includes(id) ? 'REMOVE_FAVOURITE' : 'ADD_FAVOURITE',
      id,
    })
  }

  return (
    <section className="mt-8" aria-label="Photo gallery">
      <div className="relative max-w-xl">
        <label htmlFor="author-search" className="sr-only">
          Search photos by author name
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-deep"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          id="author-search"
          type="search"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search by author name..."
          autoComplete="off"
          className="w-full rounded-full border border-gold bg-white py-3 pl-12 pr-4 text-base text-ink shadow-[0_2px_10px_rgba(198,161,91,0.15)] placeholder:text-ink/65 focus:border-gold-deep focus:outline-2 focus:outline-offset-2 focus:outline-gold-deep"
        />
      </div>

      <div className="mt-8">
        {loading && (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-4 py-20 text-ink/75"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-soft border-t-gold" />
            <p>Loading photos...</p>
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-deep/30 bg-blush/30 px-6 py-8 text-center"
          >
            <p className="font-semibold text-wine">Photos could not be loaded</p>
            <p className="mt-1 text-sm text-wine">{error}</p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div
            role="status"
            className="rounded-2xl border border-gold-soft bg-white px-6 py-12 text-center"
          >
            <p className="font-semibold text-ink">No photos found</p>
            <p className="mt-1 text-sm text-ink/75">
              No author matches &ldquo;{query.trim()}&rdquo;. Try a different name or clear the
              search.
            </p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
