"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import {
  siGit,
  siGithub,
  siInstagram,
  siJavascript,
  siLaravel,
  siMysql,
  siNextdotjs,
  siPhp,
  siReact,
  siTailwindcss,
  siTelegram,
  siTiktok,
  siWhatsapp,
} from 'simple-icons'
import ParticleField from '@/components/ParticleField'
import ThemeToggle from '@/components/ThemeToggle'
import { BrandIcon, LineIcon } from '@/components/Icons'
import { projects } from '@/lib/projects'
import { publications } from '@/lib/publications'

const DEFAULT_IMAGE = '/profile-fallback.svg'
const PROFILE_IMAGE = '/image/foto_pribadi.png'

const skills = [
  { name: 'Laravel', icon: siLaravel },
  { name: 'PHP', icon: siPhp },
  { name: 'MySQL', icon: siMysql },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Tailwind', icon: siTailwindcss },
  { name: 'Git', icon: siGit },
]

const profile = {
  name: 'Wahyu Suhardiyono, S.Kom',
  role: 'Full Stack Developer — Laravel Specialist',
  tagline:
    'Saya membangun sistem pembukuan untuk BUMDes dan pemerintah desa, website biro wisata di Dieng, dan platform belajar video untuk siswa SD.',
  about_text:
    'Saya Wahyu Suhardiyono, full stack developer lulusan Teknik Informatika (S.Kom) Universitas Sains Al-Qur’an (UNSIQ) Wonosobo. Sehari-hari saya bekerja dengan Laravel dan MySQL, dari merancang tabel transaksi sampai menyusun halaman laporan yang siap dicetak.\nKebanyakan pengguna aplikasi saya bukan orang teknis: pengurus BUMDes Kragilan, perangkat Desa Somogede, admin Dieng Tour BSD. Karena itu saya menjaga alurnya tetap pendek — catat pemasukan, lihat saldo, cetak laporan pertanggungjawaban.',
  image_url: PROFILE_IMAGE,
}

const certificates = [
  { id: 1, title: 'Belajar Membuat Aplikasi Web dengan React', issuer: 'Dicoding', date: '16 September 2024', image_url: '/image/sertifikat/1.png' },
  { id: 2, title: 'R Fundamental for Data Science', issuer: 'DQLab', date: '17 September 2024', image_url: '/image/sertifikat/2.png' },
  { id: 3, title: 'Python Fundamental for Data Science', issuer: 'DQLab', date: '18 September 2024', image_url: '/image/sertifikat/3.png' },
  { id: 4, title: 'Fundamental SQL Using SELECT Statement', issuer: 'DQLab', date: '19 September 2024', image_url: '/image/sertifikat/4.png' },
  { id: 5, title: 'Sertifikasi Database (Skor 96)', issuer: 'UPT Laboratorium UNSIQ', date: '1 Juli 2026', image_url: '/image/sertifikat/5.png' },
  { id: 7, title: 'Sertifikasi Tahfidz Al-Qur’an', issuer: 'LTPQ UNSIQ', date: '28 Oktober 2025', image_url: '/image/sertifikat/7.png' },
]

const education = [
  { year: '2016', title: 'Lulus SD', place: 'SD S YPPAB Putri Ayu Bakrie' },
  { year: '2019', title: 'Lulus SMP', place: 'SMP S YPPAB' },
  { year: '2022', title: 'Lulus SMA', place: 'SMA Islam Al-Arief, Muaro Jambi' },
  { year: '2022 — 2026', title: 'S1 Teknik Informatika', place: 'Universitas Sains Alquran (UNSIQ), Wonosobo' },
]

const career = [
  {
    year: '2024 — Sekarang',
    title: 'Freelance Programmer',
    place: 'Mandiri / Lepas',
    description: 'Menerima berbagai proyek pembuatan website sebagai full stack developer, mulai dari perencanaan, pengembangan, hingga deployment.',
  },
  {
    year: '2025',
    title: 'Tim IT — Website Wisata',
    place: 'Dieng Tour BSD',
    description: 'Mendapat proyek membangun website wisata dan direkrut sebagai bagian dari tim IT biro wisata Dieng Tour BSD.',
  },
]

const socialLinks = [
  { name: 'GitHub', icon: siGithub, link: 'https://github.com/wahyusuhar' },
  { name: 'Instagram', icon: siInstagram, link: 'https://www.instagram.com/wahyu.suhardiyono' },
  { name: 'TikTok', icon: siTiktok, link: 'https://www.tiktok.com/@wahyu_suhardi' },
  { name: 'WhatsApp', icon: siWhatsapp, link: 'https://wa.me/6282142918053' },
  { name: 'Telegram', icon: siTelegram, link: 'https://t.me/wahyusuhardiyono' },
]

const navItems = [
  { id: 'top', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'publikasi', label: 'Publikasi' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'skill', label: 'Skill' },
  { id: 'kontak', label: 'Kontak' },
]

// U+2197 diikuti variation selector teks agar tidak dirender sebagai emoji berwarna
const ARROW = '↗︎'

export default function Home() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const [imageSrc, setImageSrc] = useState(PROFILE_IMAGE)
  const [activeSection, setActiveSection] = useState('top')

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-foreground selection:text-background scroll-smooth">
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-black/[.08] bg-background/70 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/[.145]">
          <a href="#top" className="shrink-0 pl-3 font-display text-base font-bold tracking-tight text-foreground">
            Wahyu<span className="text-foreground/40">.</span>
          </a>
          <nav className="hidden items-center gap-0.5 rounded-full bg-foreground/5 p-1 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'bg-foreground text-background shadow-md'
                    : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <a href="#kontak" className="whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 text-xs font-bold text-background shadow-md transition-all hover:bg-foreground/85">
              Hubungi Saya
            </a>
          </div>
        </div>
      </header>

      <main className="w-full pt-28">
        {/* Hero */}
        <section id="top" className="relative flex min-h-[85vh] items-center overflow-hidden px-4 sm:px-6">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="z-10 space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[.08] bg-foreground/5 px-3 py-1 dark:border-white/[.145]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
                <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">Tersedia untuk proyek baru</span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Halo, Saya {profile.name}
                <br />
                <span className="text-foreground/50">Full Stack Laravel Developer</span>
              </h1>

              <p className="max-w-lg text-base leading-relaxed text-foreground/60 sm:text-lg">{profile.tagline}</p>

              <div className="flex flex-wrap gap-4">
                <a href="#proyek" className="rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background transition-transform hover:scale-105">
                  Lihat Proyek
                </a>
                <a href="/CV_Wahyu_Suhardiyono.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-black/[.08] px-8 py-4 text-sm font-bold text-foreground transition-colors hover:bg-foreground/5 dark:border-white/[.145]">
                  Lihat CV
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <p className="border-r border-foreground/15 pr-4 font-mono text-xs uppercase tracking-widest text-foreground/40">Ikuti Saya</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" className="group relative rounded-full border border-foreground/10 bg-foreground/5 p-2.5 text-foreground/70 transition-all hover:-translate-y-1 hover:border-foreground/30 hover:text-foreground">
                      <BrandIcon icon={social.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="relative h-[420px] w-full lg:h-[560px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-foreground/5 via-transparent to-foreground/5 blur-[100px]" />
              <div className="absolute inset-0">
                <ParticleField />
              </div>

              <motion.div
                drag
                dragElastic={0.2}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ opacity: { delay: 0.3 }, scale: { delay: 0.3 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.04, boxShadow: '0 35px 80px rgba(0,0,0,0.4)' }}
                className="absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[1.75rem] border border-foreground/10 bg-foreground/5 p-3 shadow-2xl backdrop-blur-xl active:cursor-grabbing sm:w-[300px]"
              >
                <div className="overflow-hidden rounded-[1.3rem] border border-foreground/10 bg-black/40">
                  <img
                    src={imageSrc}
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement
                      target.onerror = null
                      target.src = DEFAULT_IMAGE
                      setImageSrc(DEFAULT_IMAGE)
                    }}
                    className="h-[260px] w-full object-cover object-top sm:h-[300px]"
                    alt="Profile"
                  />
                </div>
                <div className="px-2 pb-1 pt-4 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">ID Card</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{profile.name}</p>
                  <p className="mt-0.5 text-xs text-foreground/50">{profile.role}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Strip */}
        <section className="relative w-full overflow-hidden border-y border-foreground/10 bg-foreground/2 py-10 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
          <motion.div
            animate={{ x: ['0%', '-25%'] }}
            transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
            className="flex w-max items-center gap-4"
          >
            {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
              <div key={`${skill.name}-${index}`} className="group flex shrink-0 items-center gap-3 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-3 text-foreground/70 transition-all hover:border-foreground/30 hover:text-foreground">
                <BrandIcon icon={skill.icon} className="h-5 w-5" />
                <span className="font-mono text-xs uppercase tracking-widest text-foreground/60">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section id="proyek" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">Portfolio</p>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Proyek yang sedang saya bangun</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-black/[.08] bg-foreground/3 backdrop-blur-xl transition-colors hover:border-foreground/30 dark:border-white/[.145]"
              >
                <Link href={`/proyek/${project.slug}`} className="block aspect-video w-full overflow-hidden">
                  <img
                    src={project.cover}
                    alt={project.title}
                    onError={(event) => {
                      const target = event.currentTarget as HTMLImageElement
                      target.onerror = null
                      target.src = DEFAULT_IMAGE
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] uppercase tracking-tight text-foreground/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="line-clamp-2 text-sm text-foreground/60">{project.summary}</p>
                  <Link href={`/proyek/${project.slug}`} className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all group-hover:gap-3">
                    Lihat Detail <span>{ARROW}</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skill" className="w-full bg-foreground/2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-16 space-y-3 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">Keahlian</p>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Apa yang saya kerjakan</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-6 rounded-3xl border border-black/[.08] bg-background p-8 transition-all hover:border-foreground/20 hover:shadow-2xl dark:border-white/[.145]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-2xl"><LineIcon name="puzzle" className="h-6 w-6" /></div>
                <h4 className="font-display text-xl font-bold text-foreground">Backend Development</h4>
                <p className="text-sm text-foreground/60">Logika pembukuan per unit usaha, rekap pemasukan–pengeluaran per periode, dan login admin dengan Laravel.</p>
                <ul className="space-y-2 font-mono text-xs uppercase tracking-wider text-foreground/40">
                  <li>{'// Laravel & Eloquent ORM'}</li>
                  <li>{'// REST API & Sanctum'}</li>
                  <li>{'// Queue & Job Scheduling'}</li>
                </ul>
              </div>
              <div className="space-y-6 rounded-3xl border border-black/[.08] bg-background p-8 transition-all hover:border-foreground/20 hover:shadow-2xl lg:-translate-y-6 dark:border-white/[.145]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-2xl"><LineIcon name="palette" className="h-6 w-6" /></div>
                <h4 className="font-display text-xl font-bold text-foreground">Frontend Development</h4>
                <p className="text-sm text-foreground/60">Halaman katalog paket wisata, dashboard grafik arus kas, dan antarmuka belajar yang mudah dipakai anak SD.</p>
                <ul className="space-y-2 font-mono text-xs uppercase tracking-wider text-foreground/40">
                  <li>{'// Blade & Livewire'}</li>
                  <li>{'// React / Next.js'}</li>
                  <li>{'// Tailwind CSS'}</li>
                </ul>
              </div>
              <div className="space-y-6 rounded-3xl border border-black/[.08] bg-background p-8 transition-all hover:border-foreground/20 hover:shadow-2xl dark:border-white/[.145]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-2xl"><LineIcon name="database" className="h-6 w-6" /></div>
                <h4 className="font-display text-xl font-bold text-foreground">Database &amp; Deployment</h4>
                <p className="text-sm text-foreground/60">Skema transaksi, hutang piutang, dan aset desa di MySQL, lalu deploy ke hosting yang dipakai klien.</p>
                <ul className="space-y-2 font-mono text-xs uppercase tracking-wider text-foreground/40">
                  <li>{'// MySQL & Query Optimization'}</li>
                  <li>{'// Git & CI/CD'}</li>
                  <li>{'// VPS / cPanel Deployment'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="group relative md:col-span-5">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-foreground/10 to-foreground/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-foreground/10 shadow-2xl">
                <img src={imageSrc} onError={() => setImageSrc(DEFAULT_IMAGE)} alt="Profile" className="h-full w-full object-cover object-top" />
              </div>
            </div>
            <div className="space-y-8 md:col-span-7">
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Dari buku kas desa ke <span className="text-foreground/50">laporan yang bisa dicetak</span>.
              </h2>
              <div className="space-y-5 text-base leading-8 text-foreground/60">
                {profile.about_text.split('\n').filter(Boolean).map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="flex items-center gap-12 border-t border-foreground/10 py-6">
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">20+</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Proyek Selesai</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">Wahyu Suhardiyono, S.Kom</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">Teknik Informatika, UNSIQ</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perjalanan: Pendidikan & Karier */}
        <section id="perjalanan" className="w-full bg-foreground/2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-16 space-y-3 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">Journey</p>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Perjalanan saya</h2>
            </div>
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
              <div>
                <h3 className="mb-8 flex items-center gap-3 font-display text-xl font-bold text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-lg"><LineIcon name="graduation" className="h-5 w-5" /></span>
                  Pendidikan
                </h3>
                <div>
                  {education.map((item, index) => (
                    <div key={item.title} className="relative pb-10 pl-8 last:pb-0">
                      {index !== education.length - 1 && (
                        <span className="absolute left-1.75 top-3 h-full w-px bg-foreground/10" />
                      )}
                      <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-foreground bg-background" />
                      <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">{item.year}</p>
                      <h4 className="mt-1 font-display text-base font-bold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-sm text-foreground/50">{item.place}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-8 flex items-center gap-3 font-display text-xl font-bold text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-lg"><LineIcon name="briefcase" className="h-5 w-5" /></span>
                  Karier
                </h3>
                <div>
                  {career.map((item, index) => (
                    <div key={item.title} className="relative pb-10 pl-8 last:pb-0">
                      {index !== career.length - 1 && (
                        <span className="absolute left-1.75 top-3 h-full w-px bg-foreground/10" />
                      )}
                      <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-foreground bg-background" />
                      <p className="font-mono text-xs uppercase tracking-widest text-foreground/50">{item.year}</p>
                      <h4 className="mt-1 font-display text-base font-bold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-sm text-foreground/50">{item.place}</p>
                      <p className="mt-2 text-sm leading-6 text-foreground/40">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publikasi Ilmiah */}
        <section id="publikasi" className="w-full bg-foreground/2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-16 space-y-3 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">Academic</p>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Publikasi Ilmiah</h2>
            </div>
            <div className="mx-auto max-w-4xl space-y-6">
              {publications.map((publication) => (
                <Link
                  key={publication.slug}
                  href={`/publikasi/${publication.slug}`}
                  className="group relative block overflow-hidden rounded-3xl border border-black/[.08] bg-background p-6 transition-all hover:border-foreground/30 hover:shadow-2xl sm:p-10 dark:border-white/[.145]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-foreground/5 text-3xl">
                      <LineIcon name="microscope" className="h-8 w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-tight text-background">
                          {publication.accreditation} Terakreditasi
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-tight text-foreground/40">{publication.journal} · {publication.year}</span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground sm:text-xl">{publication.title}</h3>
                      <p className="mt-2 text-sm text-foreground/50">{publication.authors.join(', ')}</p>
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-foreground/60">{publication.abstract}</p>

                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {publication.highlights.map((highlight) => (
                          <div key={highlight.label} className="rounded-xl bg-foreground/5 px-3 py-3 text-center">
                            <p className="font-display text-base font-bold text-foreground">{highlight.value}</p>
                            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-foreground/40">{highlight.label}</p>
                          </div>
                        ))}
                      </div>

                      <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-all group-hover:gap-3">
                        Baca Selengkapnya <span>{ARROW}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section id="sertifikat" className="w-full bg-foreground/2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-16 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/50">Achievements</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Sertifikasi &amp; penghargaan</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="rounded-[1.75rem] border border-black/[.08] bg-foreground/3 p-3 backdrop-blur-xl dark:border-white/[.145]"
                >
                  <div onClick={() => setSelectedImg(cert.image_url)} className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-[1.1rem] bg-black/30">
                    <img
                      src={cert.image_url}
                      alt={cert.title}
                      onError={(event) => {
                        const target = event.currentTarget as HTMLImageElement
                        target.onerror = null
                        target.src = DEFAULT_IMAGE
                      }}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
                      <div className="rounded-full bg-white/90 p-3 opacity-0 transition group-hover:opacity-100">
                        <svg className="h-5 w-5 text-[#171717]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="px-2 pb-2 pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">{cert.issuer || 'Credential'}</p>
                    <h3 className="mt-1 font-display text-lg font-bold text-foreground">{cert.title}</h3>
                    <p className="mt-1 font-mono text-sm text-foreground/40">{cert.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="kontak" className="px-4 pb-24 pt-4 sm:px-6">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--foreground)_0%,transparent_50%)] opacity-[.06]" />
            <div className="relative z-10 grid grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-2 lg:gap-10 lg:px-16">
              <div className="text-center lg:text-left">
                <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">Punya buku kas, katalog paket, atau materi belajar yang mau dipindah ke web?</h2>
                <p className="mt-6 text-lg text-foreground/60">
                  Saya menerima proyek untuk desa, BUMDes, biro wisata, sekolah, dan UMKM lewat Cetha Digital Solution. Ceritakan dulu cara kerja yang sekarang berjalan — dari situ kita tentukan apa yang perlu dibangun.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <a href="https://cetha-portofolio.vercel.app/" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-foreground px-6 py-3 font-display text-sm font-bold text-background transition-transform hover:scale-105 sm:w-auto">
                     Kunjungi Cetha
                  </a>
                  <a href="https://wa.me/6282142918053" target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/[.08] px-6 py-3 font-display text-sm font-bold text-foreground transition-transform hover:scale-105 sm:w-auto dark:border-white/[.145]">
                    Chat WhatsApp
                  </a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-foreground/10 to-foreground/5 blur-2xl" />
                <img
                  src="/image/IMAGE_CTA.png"
                  alt="Butuh website profesional? Konsultasi gratis bersama Cetha Digital Solution"
                  className="relative w-full rounded-[32px] object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-foreground/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
          <div>
            <p className="font-display text-lg font-bold text-foreground">Wahyu Suhardiyono, S.Kom</p>
            <p className="mt-1 max-w-sm text-sm text-foreground/40">Full stack developer Laravel di Wonosobo, Jawa Tengah.</p>
          </div>
          <p className="font-mono text-xs text-foreground/40">© 2026 Wahyu Suhardiyono</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative max-w-5xl">
              <img src={selectedImg} alt="Preview" className="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl" />
              <button className="absolute right-0 top-0 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  )
}
