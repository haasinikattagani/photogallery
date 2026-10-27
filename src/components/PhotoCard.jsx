function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  )
}

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-gold-soft bg-white shadow-[0_2px_10px_rgba(73,56,45,0.06)] transition duration-300 ease-out hover:shadow-[0_14px_30px_rgba(198,161,91,0.25)] motion-safe:hover:-translate-y-1">
      <div className="aspect-[4/3] bg-blush/30">
        <img
          src={photo.download_url}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gold-soft/70 p-4">
        <p className="min-w-0 break-words font-display text-lg font-semibold leading-snug text-ink">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className={`shrink-0 cursor-pointer rounded-full border border-gold-soft bg-ivory p-2 transition duration-200 hover:border-blush hover:bg-blush/40 motion-safe:active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep ${
            isFavourite ? 'text-rose-deep' : 'text-gold-deep hover:text-rose-deep'
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </article>
  )
}

export default PhotoCard
