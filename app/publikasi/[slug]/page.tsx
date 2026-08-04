import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicationBySlug, publications } from '@/lib/publications'
import ThemeToggle from '@/components/ThemeToggle'

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const publication = getPublicationBySlug(slug)
  if (!publication) return {}

  return {
    title: `${publication.title} | Wahyu Suhardiyono`,
    description: publication.abstract.slice(0, 160),
  }
}

export default async function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const publication = getPublicationBySlug(slug)

  if (!publication) notFound()

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-4xl items-center justify-between gap-3 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Link href="/" className="pl-3 font-display text-base font-bold tracking-tight text-foreground">
            Wahyu<span className="text-accent-400">.</span>
          </Link>
          <Link
            href="/#publikasi"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground/60 transition-colors hover:text-foreground"
          >
            ← Kembali
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-tight text-accent-400">{publication.accreditation}</span>
          {publication.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] uppercase tracking-tight text-foreground/50">
              {keyword}
            </span>
          ))}
        </div>

        <h1 className="mt-6 font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl md:text-4xl">{publication.title}</h1>

        <p className="mt-4 text-base text-foreground/70">{publication.authors.join(', ')}</p>
        <p className="mt-1 text-sm text-foreground/50">{publication.affiliation}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-foreground/10 bg-foreground/3 p-6 sm:grid-cols-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Jurnal</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{publication.journal}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Tahun</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{publication.year}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Volume / Issue</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{publication.volumeIssue}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Halaman</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{publication.pages}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {publication.highlights.map((highlight) => (
            <div key={highlight.label} className="rounded-xl border border-foreground/10 bg-foreground/3 px-3 py-3 text-center">
              <p className="font-display text-lg font-bold text-accent-400">{highlight.value}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-foreground/40">{highlight.label}</p>
            </div>
          ))}
        </div>

        <a
          href={publication.doiUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-400 to-violet-500 px-6 py-3 text-sm font-bold text-[#04141a] shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-transform hover:scale-105"
        >
          Baca Jurnal Lengkap ↗
        </a>

        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Abstrak</h2>
          <p className="text-base leading-8 text-foreground/70">{publication.abstract}</p>
        </div>

        <div className="mt-12 rounded-2xl border border-foreground/10 bg-foreground/3 p-6">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Sitasi (APA)</h2>
          <p className="font-mono text-sm leading-7 text-foreground/70">{publication.citation}</p>
        </div>
      </main>
    </div>
  )
}
