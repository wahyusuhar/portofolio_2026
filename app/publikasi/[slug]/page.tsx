import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicationBySlug, publications } from '@/lib/publications'

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

const border = 'border-black/[.08] dark:border-white/[.145]'

export default async function PublicationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const publication = getPublicationBySlug(slug)

  if (!publication) notFound()

  const meta = [
    { label: 'Jurnal', value: publication.journal },
    { label: 'Tahun', value: publication.year },
    { label: 'Volume / Issue', value: publication.volumeIssue },
    { label: 'Halaman', value: publication.pages },
  ]

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-6 sm:px-8">
      <header className="flex items-center justify-between py-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Wahyu Suhardiyono
        </Link>
        <Link href="/#publikasi" className="text-sm text-foreground/60 transition-colors hover:text-foreground">
          ← Kembali
        </Link>
      </header>

      <main className="pb-24 pt-16">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/50">
          <li>{publication.accreditation}</li>
          {publication.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>

        <h1 className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{publication.title}</h1>

        <p className="mt-4">{publication.authors.join(', ')}</p>
        <p className="mt-1 text-sm text-foreground/60">{publication.affiliation}</p>

        <dl className={`mt-10 grid grid-cols-2 gap-6 border-y py-6 sm:grid-cols-4 ${border}`}>
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs text-foreground/50">{item.label}</dt>
              <dd className="mt-1 text-sm font-medium">{item.value}</dd>
            </div>
          ))}
          {publication.highlights.map((highlight) => (
            <div key={highlight.label}>
              <dt className="text-xs text-foreground/50">{highlight.label}</dt>
              <dd className="mt-1 font-mono text-sm">{highlight.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={publication.doiUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
        >
          Baca Jurnal Lengkap
        </a>

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Abstrak</h2>
          <p className="leading-7 text-foreground/70">{publication.abstract}</p>
        </div>

        <div className={`mt-12 border-t pt-6 ${border}`}>
          <h2 className="mb-3 text-sm font-medium">Sitasi (APA)</h2>
          <p className="text-sm leading-7 text-foreground/70">{publication.citation}</p>
        </div>
      </main>
    </div>
  )
}
