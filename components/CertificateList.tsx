'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

type Certificate = { id: number; title: string; issuer: string; date: string; image_url: string }

export default function CertificateList({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null)

  return (
    <>
      <ul className="divide-y divide-black/[.08] border-y border-black/[.08] dark:divide-white/[.145] dark:border-white/[.145]">
        {certificates.map((cert) => (
          <li key={cert.id}>
            <button
              onClick={() => setSelected(cert)}
              className="grid w-full grid-cols-1 gap-1 py-4 text-left transition-opacity hover:opacity-60 sm:grid-cols-[9rem_1fr] sm:gap-6"
            >
              <span className="font-mono text-xs leading-6 text-foreground/50">{cert.date}</span>
              <span>
                <span className="block font-medium">{cert.title}</span>
                <span className="block text-sm text-foreground/60">{cert.issuer}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox src={selected?.image_url ?? null} alt={selected?.title ?? ''} onClose={() => setSelected(null)} />
    </>
  )
}
