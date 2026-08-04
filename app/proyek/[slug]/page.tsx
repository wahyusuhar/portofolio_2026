import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/lib/projects'
import ProjectGallery from '@/components/ProjectGallery'
import ThemeToggle from '@/components/ThemeToggle'

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
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-4xl items-center justify-between gap-3 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Link href="/" className="pl-3 font-display text-base font-bold tracking-tight text-foreground">
            Wahyu<span className="text-accent-400">.</span>
          </Link>
          <Link
            href="/#proyek"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground/60 transition-colors hover:text-foreground"
          >
            ← Kembali ke Proyek
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-32 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accent-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-tight text-accent-400">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-6 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg">{project.summary}</p>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-400 to-violet-500 px-6 py-3 text-sm font-bold text-[#04141a] shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-transform hover:scale-105"
          >
            Kunjungi Proyek ↗
          </a>
        )}

        <div className="mt-10 overflow-hidden rounded-3xl border border-foreground/10">
          <img src={project.cover} alt={project.title} className="aspect-video w-full object-cover" />
        </div>

        <div className="mt-12 space-y-5 text-base leading-8 text-foreground/70">
          {project.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-xl font-bold text-foreground">Galeri</h2>
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>
        )}
      </main>
    </div>
  )
}
