'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setSelected(image)}
            className="relative aspect-video cursor-zoom-in overflow-hidden rounded-lg border border-black/[.08] transition-opacity hover:opacity-80 dark:border-white/[.145]"
          >
            <Image src={image} alt={`${title} — galeri ${index + 1}`} fill sizes="(min-width: 640px) 384px, 100vw" className="object-cover" />
          </button>
        ))}
      </div>
      <Lightbox src={selected} alt={title} onClose={() => setSelected(null)} />
    </>
  )
}
