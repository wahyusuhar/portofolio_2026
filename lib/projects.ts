export type Project = {
  slug: string
  title: string
  summary: string
  description: string[]
  tags: string[]
  cover: string
  gallery: string[]
  demoUrl?: string
  video?: { src: string; poster?: string }
  note?: string
}

const IMG = '/image/projects'
const VID = '/video/projects'

export const projects: Project[] = [
  {
    slug: 'smart-waste',
    title: 'Smart Waste — Sistem Pelaporan Sampah dengan Deteksi AI',
    summary: 'Sistem pelaporan tumpukan sampah: warga melapor lewat web & aplikasi Android, kategori sampah dideteksi otomatis oleh model machine learning.',
    tags: ['Laravel', 'Expo', 'Machine Learning'],
    cover: `${IMG}/smart-waste-cover.png`,
    gallery: [
      `${IMG}/smart-waste-cover.png`,
      `${IMG}/smart-waste-gallery-1.png`,
      `${IMG}/smart-waste-gallery-2.png`,
      `${IMG}/smart-waste-gallery-3.png`,
      `${IMG}/smart-waste-mobile.png`,
    ],
    demoUrl: 'https://smart-waste-web1.vercel.app/',
    video: { src: `${VID}/smart-waste-demo.webm`, poster: `${IMG}/smart-waste-cover.png` },
    note: 'Database demo memakai MySQL free tier yang berakhir 21 Desember 2026, sehingga demo live bisa tidak aktif setelah tanggal tersebut. Video di bawah merekam alur aplikasi secara lengkap.',
    description: [
      'Smart Waste adalah sistem pelaporan tumpukan sampah yang saya bangun sebagai technical test Fullstack Developer. Warga cukup memotret tumpukan sampah, menandai lokasi GPS, lalu mengirim laporan — baik dari website maupun aplikasi Android.',
      'Setiap foto diklasifikasikan oleh model machine learning (transfer learning MobileNetV2, dijalankan dengan FastAPI + LiteRT) menjadi organik, plastik, atau kertas sebagai saran kategori yang tetap bisa dikoreksi oleh pelapor maupun admin.',
      'Di sisi admin tersedia dashboard ringkasan status laporan, grafik laporan per hari, filter dan pencarian laporan, detail laporan dengan peta lokasi (Leaflet + OpenStreetMap), riwayat perubahan status (Menunggu → Diproses → Selesai/Ditolak), serta manajemen pengguna.',
      'Backend dibangun dengan Laravel 12 (Livewire + Tailwind) sekaligus menyediakan REST API bertoken Sanctum untuk aplikasi mobile Expo/React Native, dengan MySQL sebagai database dan Cloudinary untuk penyimpanan foto.',
    ],
  },
  {
    slug: 'smp-yppab',
    title: 'Website Sekolah SMPS YPPAB Jambi',
    summary: 'Website profil sekolah untuk SMPS YPPAB di Provinsi Jambi: profil, guru & staf, ekstrakurikuler, galeri, berita, hingga info pendaftaran murid baru.',
    tags: ['Astro', 'Tailwind', 'TypeScript'],
    cover: `${IMG}/smp-yppab-cover.png`,
    gallery: [
      `${IMG}/smp-yppab-cover.png`,
      `${IMG}/smp-yppab-gallery-1.png`,
      `${IMG}/smp-yppab-gallery-2.png`,
      `${IMG}/smp-yppab-gallery-3.png`,
      `${IMG}/smp-yppab-mobile.png`,
    ],
    demoUrl: 'https://web-smp-yppab.vercel.app/',
    description: [
      'Website profil untuk SMPS YPPAB, sekolah menengah pertama swasta di Provinsi Jambi, yang dirancang agar orang tua calon murid bisa mengenal sekolah dengan cepat: visi, keseharian belajar, ekstrakurikuler, fasilitas, hingga kontak sekolah.',
      'Halaman beranda menampilkan hero slider, jawaban atas pertanyaan yang paling sering diajukan orang tua, daftar ekstrakurikuler berjalan, galeri kegiatan, dan ajakan menuju halaman Penerimaan Murid Baru (SPMB) yang berisi syarat berkas serta alur pendaftaran.',
      'Dibangun dengan Astro dan Tailwind CSS sehingga halaman statis sangat ringan dan cepat dibuka di ponsel, lengkap dengan menu mobile, navigasi breadcrumb, dan perhatian pada aksesibilitas seperti tombol jeda animasi.',
    ],
  },
  {
    slug: 'speakup',
    title: 'SpeakUp — Guru Privat Bahasa Inggris Berbasis AI',
    summary: 'Aplikasi latihan speaking bahasa Inggris: pengguna "menelepon" guru AI dan bercakap langsung dengan suara, lengkap dengan transkrip percakapan.',
    tags: ['Expo', 'React Native', 'Gemini AI'],
    cover: `${IMG}/speakup-cover.png`,
    gallery: [`${IMG}/speakup-cover.png`, `${IMG}/speakup-gallery-2.png`, `${IMG}/speakup-gallery-1.png`],
    demoUrl: 'https://speakup-phi-one.vercel.app/onboarding',
    description: [
      'SpeakUp adalah aplikasi latihan berbicara bahasa Inggris dengan konsep telepon: pengguna menekan tombol "Telepon" dan langsung bercakap dengan Miss Rina, guru privat AI yang merespons dengan suara secara real-time.',
      'Saat onboarding, pengguna mengisi nama panggilan, perkiraan kemampuan, tujuan belajar (ngobrol sehari-hari, pekerjaan, interview kerja, traveling, sekolah), dan target belajar per hari agar materi percakapan menyesuaikan kebutuhannya.',
      'Dibangun dengan Expo dan React Native (berjalan di web maupun mobile) serta Google Gemini sebagai mesin percakapan suara. API key dan riwayat percakapan disimpan di perangkat pengguna, audio tidak disimpan, dan tersedia catatan privasi yang jelas sejak awal.',
    ],
  },
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
    demoUrl: 'https://web-pembelajaran-online.vercel.app/',
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
