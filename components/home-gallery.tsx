'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
};

export type HomeGalleryLabels = {
  /** Prefix used for the per-thumbnail "open this photo" aria-label. Composed as `${openPrefix}: ${alt}`. */
  openPrefix: string;
  close: string;
  prev: string;
  next: string;
  /** Prefix for the lightbox dialog label. Composed as `${dialogPrefix} ${i} ${counterOf} ${n}: ${alt}`. */
  dialogPrefix: string;
  counterOf: string;
};

type HomeGalleryProps = {
  images: readonly GalleryImage[];
  note?: string;
  labels: HomeGalleryLabels;
};

export function HomeGallery({ images, note, labels }: HomeGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isOpen = openIndex !== null;

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) {
        const trigger = triggerRefs.current[current];
        if (trigger) {
          window.requestAnimationFrame(() => trigger.focus());
        }
      }
      return null;
    });
  }, []);

  const goTo = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const next = (current + delta + images.length) % images.length;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(-1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close, goTo]);

  const current = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-1 [scrollbar-color:theme(colors.line)_transparent] [scrollbar-width:thin] md:-mx-10 md:px-10"
        role="list"
      >
        {images.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            ref={(node) => {
              triggerRefs.current[index] = node;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`${labels.openPrefix}: ${item.alt}`}
            className="group relative aspect-[4/3] w-[min(78vw,17.5rem)] shrink-0 cursor-zoom-in snap-center snap-always overflow-hidden rounded-[1.25rem] border border-line/70 transition first:snap-start last:snap-end hover:border-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:w-[min(42vw,17.5rem)] md:w-[17.5rem]"
            role="listitem"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 78vw, (max-width: 768px) 42vw, 280px"
            />
          </button>
        ))}
      </div>

      {note ? <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted">{note}</p> : null}

      {isOpen && current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${labels.dialogPrefix} ${openIndex! + 1} ${labels.counterOf} ${images.length}: ${current.alt}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 px-4 py-8 backdrop-blur-sm"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              close();
            }}
            aria-label={labels.close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(-1);
                }}
                aria-label={labels.prev}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(1);
                }}
                aria-label={labels.next}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : null}

          <figure
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full overflow-hidden rounded-[1.25rem]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 1024px"
                className="object-contain"
              />
            </div>
            <figcaption className="text-center text-xs text-white/80 sm:text-sm">
              {current.alt}
              <span className="ml-2 text-white/50">
                {openIndex! + 1} {labels.counterOf} {images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
