// The browser localStorage key that holds the saved favourite photo IDs.
export const FAVOURITES_STORAGE_KEY = 'photo-gallery-favourites'

// Reads saved favourites. Missing, broken or unexpected data safely becomes an empty list.
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (saved === null) return []

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    // Photo IDs from the API are strings, so ignore anything else.
    return parsed.filter((id) => typeof id === 'string')
  } catch {
    // JSON.parse throws on malformed text; localStorage can throw if blocked by the browser.
    return []
  }
}

// Pure function: (old list, action) -> new list. It never changes the old list.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      return state.includes(action.id) ? state : [...state, action.id]
    case 'REMOVE_FAVOURITE':
      return state.filter((id) => id !== action.id)
    default:
      return state
  }
}
