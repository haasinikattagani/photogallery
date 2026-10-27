# Discover Photos — React Photo Gallery

A responsive photo gallery built with React, Vite and Tailwind CSS v4.
It fetches 30 photos from `https://picsum.photos/v2/list?limit=30`, lets you search by author name, and lets you favourite photos (saved in your browser with localStorage).

## Requirements

- Node.js 20.19+ or 22.12+ (check with `node -v`)
- npm (installed together with Node.js; check with `npm -v`)

## Install

Open a terminal **inside this folder** (the one containing `package.json`) and run:

```
npm install
```

This downloads the libraries listed in `package.json` into a `node_modules` folder.

## Run in development

```
npm run dev
```

Open the address it prints (usually http://localhost:5173) in your browser. Stop the server with `Ctrl + C`.

## Production build

```
npm run build
npm run preview
```

`build` creates an optimised copy of the site in the `dist` folder; `preview` serves it locally so you can check it.

## Optional code check

```
npm run lint
```

## Project structure

```
src/
  components/
    Gallery.jsx        search box, loading/error/empty states, grid, favourites wiring
    PhotoCard.jsx      one photo, its author and the heart button
  hooks/
    useFetchPhotos.js  custom hook: returns { photos, loading, error }
  reducers/
    favouritesReducer.js  reducer + localStorage loader for favourite photo IDs
  App.jsx              page heading and layout
  main.jsx             starts React (inside StrictMode)
  index.css            loads Tailwind CSS
```

## Manual test checklist

1. `npm run dev` starts without errors and the page opens.
2. 30 photo cards appear after a short loading spinner.
3. Type `ale` in the search box: only matching authors remain. Type in capitals: same result. Clear it: all 30 return.
4. Type `zzzz`: a "No photos found" message appears.
5. Open DevTools > Network and search again: no new request to picsum.photos appears.
6. Click hearts: they fill red/pink; click again: they empty.
7. Favourite a few photos, refresh the page: they stay favourited.
8. Search while favourites exist: hearts stay correct after clearing the search.
9. DevTools > Application > Local Storage: set `photo-gallery-favourites` to `{broken` and refresh: the page loads with no favourites and no crash.
10. DevTools > Network > Offline (or block `picsum.photos`), refresh: an error message appears.
11. DevTools device toolbar: about 390px wide = 1 column, 768-1023px = 2 columns, 1024px and wider = 4 columns; no horizontal scrollbar.
12. Console shows no errors or React key warnings.
13. `npm run build` finishes successfully.
