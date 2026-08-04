export type Project = {
  slug: string
  title: string
  summary: string
  description: string[]
  tags: string[]
  cover: string
  gallery: string[]
  demoUrl?: string
}

const IMG = '/image/projects'

export const projects: Project[] = [
  {
    slug: 'bumdes-kragilan',
    title: 'Website & Sistem Keuangan BUMDes Kragilan',
    summary: 'Website resmi profil desa sekaligus dashboard pembukuan keuangan untuk BUMDes Kragilan, Kabupaten Purworejo.',
    tags: ['Laravel', 'MySQL', 'Tailwind'],
    cover: `${IMG}/bumdes-kragilan-cover.png`,
    gallery: [`${IMG}/bumdes-kragilan-cover.png`, `${IMG}/bumdes-kragilan-cover-2.png`, `${IMG}/bumdes-kragilan-gallery-1.png`],
    demoUrl: 'https://bumdes.krandegandigital.id',
    description: [
      'Website resmi untuk BUMDes Kragilan, Kecamatan Gebang, Kabupaten Purworejo — dibangun agar profil desa, unit usaha, dan galeri kegiatan bisa diakses publik secara mudah dan profesional.',
      'Selain sisi publik, tersedia juga dashboard admin untuk mengelola pembukuan tiap unit usaha BUMDes (peternakan bebek, sewa panggung, dan lainnya): pencatatan pemasukan & pengeluaran, ringkasan saldo, hingga grafik arus kas per kategori.',
      'Dibangun dengan Laravel dan MySQL, dengan antarmuka publik yang menonjolkan foto desa serta panel admin dashboard yang ringkas dan mudah dipakai oleh pengurus BUMDes yang bukan berlatar belakang teknis.',
    ],
  },
  {
    slug: 'dieng-tour-bsd',
    title: 'Dieng Tour BSD — Website Biro Wisata',
    summary: 'Website resmi biro wisata Dieng Tour BSD: paket wisata, sewa jeep & shuttle, hingga galeri destinasi Dieng.',
    tags: ['Laravel', 'PHP', 'MySQL'],
    cover: `${IMG}/dieng-tour-bsd-cover.png`,
    gallery: [`${IMG}/dieng-tour-bsd-cover.png`, `${IMG}/dieng-tour-bsd-gallery-1.png`],
    demoUrl: 'https://diengtourbsd.com',
    description: [
      'Proyek ini berawal dari permintaan membuat website wisata, dan berlanjut menjadi kepercayaan untuk bergabung sebagai tim IT di biro perjalanan Dieng Tour BSD sejak 2025.',
      'Website menampilkan katalog paket wisata Dieng (zona 1, 2, dan 3), layanan sewa jeep & shuttle Wonosobo, daftar destinasi populer seperti Kawah Sikidang dan Telaga Merdada, hingga artikel dan galeri wisata.',
      'Setiap paket dilengkapi info durasi, destinasi yang dikunjungi, dan harga mulai dari, dirancang agar calon wisatawan bisa membandingkan dan memesan paket dengan cepat langsung dari halaman beranda.',
    ],
  },
  {
    slug: 'keuangan-desa-somogede',
    title: 'Sistem Pemasukan & Pengeluaran Desa Somogede',
    summary: 'Dashboard pembukuan keuangan desa: pemasukan, pengeluaran, laporan periodik, dan cetak PDF.',
    tags: ['Laravel', 'MySQL', 'Dashboard'],
    cover: `${IMG}/keuangan-desa-somogede-cover.png`,
    gallery: [`${IMG}/keuangan-desa-somogede-cover.png`, `${IMG}/keuangan-desa-somogede-gallery-1.png`],
    description: [
      'Sistem pembukuan keuangan untuk Desa Somogede, dibuat agar pencatatan pemasukan dan pengeluaran desa lebih rapi, transparan, dan mudah dipantau dibanding pencatatan manual di buku besar.',
      'Dashboard menampilkan ringkasan pemasukan & pengeluaran harian, bulanan, dan tahunan, lengkap dengan grafik arus kas, kalender kegiatan, serta modul hutang piutang dan data aset desa.',
      'Tersedia halaman laporan dengan filter rentang tanggal dan kategori, yang bisa langsung dicetak ke PDF atau diprint — memudahkan perangkat desa saat menyusun laporan pertanggungjawaban.',
    ],
  },
  {
    slug: 'dunia-online-academy',
    title: 'Dunia Online Academy — Platform Belajar Online',
    summary: 'Platform belajar online untuk siswa SD dengan kumpulan video materi dari berbagai mata pelajaran.',
    tags: ['Web', 'PHP', 'Edukasi'],
    cover: `${IMG}/dunia-online-academy-cover.png`,
    gallery: [`${IMG}/dunia-online-academy-cover.png`, `${IMG}/dunia-online-academy-gallery-1.png`],
    description: [
      'Dunia Online Academy adalah platform belajar online yang menghadirkan materi pelajaran SD dalam bentuk video yang ringan dan menyenangkan, mulai dari IPA, PPKn, Bahasa Indonesia, hingga Matematika.',
      'Materi dikurasi dari berbagai sumber video edukasi dan disusun ulang dalam tampilan katalog yang rapi per mata pelajaran, lengkap dengan judul dan ringkasan singkat setiap topik.',
      'Fokus utama pengembangan adalah kemudahan navigasi untuk anak-anak dan orang tua, dengan tampilan berwarna-warni yang ramah untuk pengguna usia sekolah dasar.',
    ],
  },
  {
    slug: 'cetha-digital-solution',
    title: 'Cetha Digital Solution',
    summary: 'Usaha jasa pembuatan website & solusi digital yang saya kelola sendiri, melayani klien di Jogja, Wonosobo, dan seluruh Indonesia.',
    tags: ['Jasa Web', 'Laravel', 'Next.js'],
    cover: `${IMG}/cetha-digital-solution-cover.png`,
    gallery: [`${IMG}/cetha-digital-solution-cover.png`, `${IMG}/cetha-digital-solution-cover-2.png`, `${IMG}/cetha-digital-solution-gallery-1.png`],
    demoUrl: 'https://cetha-portofolio.vercel.app/',
    description: [
      'Cetha Digital Solution adalah usaha jasa pembuatan website yang saya bangun dan kelola sendiri, melayani UMKM, instansi desa, hingga bisnis perorangan di Yogyakarta, Wonosobo, dan seluruh Indonesia.',
      'Layanan mencakup pembuatan website profil, sistem informasi, hingga aplikasi web custom sesuai kebutuhan klien — mulai dari konsultasi kebutuhan, desain, pengembangan, sampai website siap dipakai.',
      'Beberapa proyek yang ditampilkan di portfolio ini — seperti website BUMDes Kragilan, Dieng Tour BSD, dan sistem keuangan Desa Somogede — juga dikerjakan lewat Cetha Digital Solution.',
    ],
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
