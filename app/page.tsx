import Image from 'next/image'
import Link from 'next/link'
import CertificateList from '@/components/CertificateList'
import { projects } from '@/lib/projects'
import { publications } from '@/lib/publications'

const PROFILE_IMAGE = '/image/foto_pribadi.png'

const profile = {
  name: 'Wahyu Suhardiyono, S.Kom',
  role: 'Full stack developer Laravel di Wonosobo, Jawa Tengah.',
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

const skillGroups = [
  {
    title: 'Backend',
    description: 'Logika pembukuan per unit usaha, rekap pemasukan–pengeluaran per periode, dan login admin dengan Laravel.',
    items: ['Laravel & Eloquent ORM', 'REST API & Sanctum', 'Queue & Job Scheduling'],
  },
  {
    title: 'Frontend',
    description: 'Halaman katalog paket wisata, dashboard grafik arus kas, dan antarmuka belajar yang mudah dipakai anak SD.',
    items: ['Blade & Livewire', 'React / Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Database & Deployment',
    description: 'Skema transaksi, hutang piutang, dan aset desa di MySQL, lalu deploy ke hosting yang dipakai klien.',
    items: ['MySQL & Query Optimization', 'Git & CI/CD', 'VPS / cPanel Deployment'],
  },
]

const socialLinks = [
  { name: 'GitHub', link: 'https://github.com/wahyusuhar' },
  { name: 'Instagram', link: 'https://www.instagram.com/wahyu.suhardiyono' },
  { name: 'TikTok', link: 'https://www.tiktok.com/@wahyu_suhardi' },
  { name: 'WhatsApp', link: 'https://wa.me/6282142918053' },
  { name: 'Telegram', link: 'https://t.me/wahyusuhardiyono' },
]

const navItems = [
  { id: 'proyek', label: 'Proyek' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'perjalanan', label: 'Perjalanan' },
  { id: 'publikasi', label: 'Publikasi' },
  { id: 'kontak', label: 'Kontak' },
]

const border = 'border-black/[.08] dark:border-white/[.145]'
const divide = 'divide-black/[.08] dark:divide-white/[.145]'
const primaryButton =
  'flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85'
const secondaryButton = `flex h-11 items-center justify-center rounded-full border ${border} px-5 text-sm font-medium transition-colors hover:bg-foreground/5`

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-8 text-xl font-semibold tracking-tight">{children}</h2>
}

function Timeline({ items }: { items: { year: string; title: string; place: string; description?: string }[] }) {
  return (
    <ul className={`divide-y border-y ${divide} ${border}`}>
      {items.map((item) => (
        <li key={item.title} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <span className="font-mono text-xs leading-6 text-foreground/50">{item.year}</span>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-foreground/60">{item.place}</p>
            {item.description && <p className="mt-2 text-sm leading-6 text-foreground/60">{item.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-6 sm:px-8">
      <header className="flex items-center justify-between py-8">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          Wahyu Suhardiyono
        </a>
        <nav className="hidden gap-6 sm:flex">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm text-foreground/60 transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="space-y-28 pb-24">
        <section id="top" className="pt-16 sm:pt-24">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-4 text-lg">{profile.role}</p>
          <p className="mt-2 max-w-xl leading-7 text-foreground/60">{profile.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#proyek" className={primaryButton}>
              Lihat Proyek
            </a>
            <a href="/CV_Wahyu_Suhardiyono.pdf" target="_blank" rel="noreferrer" className={secondaryButton}>
              Lihat CV
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.link} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="proyek" className="scroll-mt-8">
          <SectionHeading>Proyek yang sedang saya bangun</SectionHeading>
          <ul className={`divide-y border-y ${divide} ${border}`}>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/proyek/${project.slug}`} className="group grid grid-cols-1 gap-5 py-8 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <div className={`relative aspect-video overflow-hidden rounded-lg border ${border}`}>
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(min-width: 640px) 224px, 100vw"
                      className="object-cover transition-opacity group-hover:opacity-80"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium transition-colors group-hover:text-foreground/60">{project.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-foreground/60">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/50">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="skill" className="scroll-mt-8">
          <SectionHeading>Apa yang saya kerjakan</SectionHeading>
          <ul className={`divide-y border-y ${divide} ${border}`}>
            {skillGroups.map((group) => (
              <li key={group.title} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <h3 className="font-medium">{group.title}</h3>
                <div>
                  <p className="text-sm leading-6 text-foreground/60">{group.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-foreground/50">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="tentang" className="scroll-mt-8">
          <SectionHeading>Dari buku kas desa ke laporan yang bisa dicetak</SectionHeading>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <Image
              src={profile.image_url}
              alt={profile.name}
              width={112}
              height={112}
              className={`h-28 w-28 shrink-0 rounded-full border object-cover object-top ${border}`}
            />
            <div className="space-y-4 leading-7 text-foreground/70">
              {profile.about_text.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="perjalanan" className="scroll-mt-8 space-y-16">
          <div>
            <SectionHeading>Pendidikan</SectionHeading>
            <Timeline items={education} />
          </div>
          <div>
            <SectionHeading>Karier</SectionHeading>
            <Timeline items={career} />
          </div>
        </section>

        <section id="publikasi" className="scroll-mt-8">
          <SectionHeading>Publikasi ilmiah</SectionHeading>
          <ul className={`divide-y border-y ${divide} ${border}`}>
            {publications.map((publication) => (
              <li key={publication.slug}>
                <Link href={`/publikasi/${publication.slug}`} className="group block py-8">
                  <p className="font-mono text-xs text-foreground/50">
                    {publication.year} · {publication.journal} · {publication.accreditation}
                  </p>
                  <h3 className="mt-3 font-medium leading-snug transition-colors group-hover:text-foreground/60">{publication.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{publication.authors.join(', ')}</p>
                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-foreground/60">{publication.abstract}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {publication.highlights.map((highlight) => (
                      <div key={highlight.label}>
                        <dt className="text-xs text-foreground/50">{highlight.label}</dt>
                        <dd className="mt-1 font-mono text-sm">{highlight.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="sertifikat" className="scroll-mt-8">
          <SectionHeading>Sertifikasi &amp; penghargaan</SectionHeading>
          <CertificateList certificates={certificates} />
        </section>

        <section id="kontak" className="scroll-mt-8">
          <SectionHeading>Punya buku kas, katalog paket, atau materi belajar yang mau dipindah ke web?</SectionHeading>
          <p className="max-w-xl leading-7 text-foreground/60">
            Saya menerima proyek untuk desa, BUMDes, biro wisata, sekolah, dan UMKM lewat Cetha Digital Solution. Ceritakan dulu cara kerja yang sekarang berjalan — dari situ kita tentukan apa yang perlu dibangun.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="https://wa.me/6282142918053" target="_blank" rel="noreferrer" className={primaryButton}>
              Chat WhatsApp
            </a>
            <a href="https://cetha-portofolio.vercel.app/" target="_blank" rel="noreferrer" className={secondaryButton}>
              Kunjungi Cetha
            </a>
          </div>
        </section>
      </main>

      <footer className={`border-t py-8 ${border}`}>
        <p className="text-sm text-foreground/50">© 2026 Wahyu Suhardiyono</p>
      </footer>
    </div>
  )
}
