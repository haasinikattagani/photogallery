import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen text-ink">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink after:mt-4 after:block after:h-0.5 after:w-16 after:rounded-full after:bg-gold after:content-[''] md:text-5xl">
            Discover Photos
          </h1>
          <p className="mt-3 text-base text-ink/75">
            A gallery of photographs from different authors. Search by author
            name and save the ones you like.
          </p>
        </header>

        <Gallery />
      </main>
    </div>
  )
}

export default App
