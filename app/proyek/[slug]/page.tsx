import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/lib/projects'
import ProjectGallery from '@/components/ProjectGallery'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.title} | Wahyu Suhardiyono`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-6 sm:px-8">
      <header className="flex items-center justify-between py-8">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Wahyu Suhardiyono
        </Link>
        <Link href="/#proyek" className="text-sm text-foreground/60 transition-colors hover:text-foreground">
          ← Kembali ke proyek
        </Link>
      </header>

      <main className="pb-24 pt-16">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/50">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-4 max-w-xl leading-7 text-foreground/60">{project.summary}</p>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Kunjungi Proyek
          </a>
        )}

        <div className="relative mt-12 aspect-video overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
          <Image src={project.cover} alt={project.title} fill priority sizes="(min-width: 768px) 704px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 space-y-5 leading-7 text-foreground/70">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Galeri</h2>
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        )}
      </main>
    </div>
  )
}
