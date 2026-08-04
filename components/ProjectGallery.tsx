'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setSelected(image)}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/3"
          >
            <img
              src={image}
              alt={`${title} — galeri ${index + 1}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
              <div className="rounded-full bg-white/90 p-3 opacity-0 transition group-hover:opacity-100">
                <svg className="h-5 w-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative max-w-5xl">
              <img src={selected} alt={title} className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl shadow-accent-500/20" />
              <button className="absolute right-0 top-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
