'use client'

import { useEffect } from 'react'

export default function Lightbox({ src, alt, onClose }: { src: string | null; alt: string; onClose: () => void }) {
  useEffect(() => {
    if (!src) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, onClose])

  if (!src) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- ukuran asli gambar tidak diketahui */}
      <img src={src} alt={alt} className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain" />
      <button
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 rounded-full border border-white/[.145] px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        Tutup
      </button>
    </div>
  )
}
