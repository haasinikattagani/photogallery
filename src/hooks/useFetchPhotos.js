import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

// Custom hook: downloads the photo list once and reports its progress.
// Returns { photos, loading, error } and knows nothing about how they are displayed.
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true) // the request starts as soon as the page opens
  const [error, setError] = useState(null)

  useEffect(() => {
    // AbortController lets us cancel the request if the component goes away.
    const controller = new AbortController()

    async function loadPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        // fetch() only rejects on network failure; HTTP errors (404, 500...) must be checked by hand.
        if (!response.ok) {
          throw new Error(
            `The photo service returned an error (status ${response.status}).`,
          )
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The photo service returned unexpected data.')
        }

        setError(null)
        setPhotos(data)
      } catch (err) {
        // A cancelled request is not a real error, and the component may be gone: do nothing.
        if (err.name === 'AbortError') return

        if (err instanceof TypeError) {
          setError(
            'Could not reach the photo service. Check your internet connection and refresh the page.',
          )
        } else if (err instanceof SyntaxError) {
          setError('The photo data was not in the expected format.')
        } else {
          setError(err.message)
        }
      } finally {
        // Only stop the spinner if this request was not cancelled.
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadPhotos()

    // Cleanup: runs when the component unmounts (and between Strict Mode's dev-only double run).
    return () => controller.abort()
  }, []) // empty array = run once when the component first appears

  return { photos, loading, error }
}
