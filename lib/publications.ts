export type Publication = {
  slug: string
  title: string
  authors: string[]
  affiliation: string
  journal: string
  publisher: string
  year: string
  volumeIssue: string
  pages: string
  accreditation: string
  doiUrl: string
  keywords: string[]
  abstract: string
  citation: string
  highlights: { label: string; value: string }[]
}

export const publications: Publication[] = [
  {
    slug: 'klasifikasi-real-time-buah-carica',
    title: 'Klasifikasi Real-Time Tingkat Kematangan Buah Carica Menggunakan Convolutional Neural Network dan Grad-CAM',
    authors: ['Wahyu Suhardiyono', 'Nahar Mardiyantoro', 'Saifu Rohman'],
    affiliation: "Universitas Sains Al-Qur'an (UNSIQ), Wonosobo",
    journal: 'ANTHOR: Education and Learning Journal',
    publisher: 'Institut Teknologi Pendidikan Indonesia',
    year: '2026',
    volumeIssue: 'Vol. 5, No. 4',
    pages: '664–671',
    accreditation: 'SINTA 4',
    doiUrl: 'https://doi.org/10.31004/anthor.v5i4.866',
    keywords: ['Buah Carica', 'Convolutional Neural Network', 'MobileNetV2', 'Grad-CAM', 'Explainable Artificial Intelligence'],
    abstract:
      'Buah Carica (Carica pubescens) merupakan komoditas unggulan dataran tinggi Dieng, Wonosobo, yang kualitas produk olahannya sangat ditentukan oleh tingkat kematangan saat panen. Penentuan kematangan secara manual melalui pengamatan warna kulit dan perabaan tekstur bersifat subjektif, tidak konsisten, dan rentan kelelahan. Penelitian ini bertujuan membangun sistem klasifikasi tingkat kematangan buah Carica ke dalam tiga kelas (Mentah, Mengkal, Matang) secara real-time menggunakan Convolutional Neural Network (CNN) berarsitektur MobileNetV2 melalui pendekatan transfer learning dan fine-tuning dua fase, dilengkapi visualisasi Explainable Artificial Intelligence (XAI) berbasis Gradient-weighted Class Activation Mapping (Grad-CAM) untuk mengatasi sifat black box model. Dataset berjumlah 1.800 citra hasil akuisisi mandiri (600 citra per kelas), dibagi menjadi 1.440 citra latih dan 360 citra validasi. Model diintegrasikan ke dalam aplikasi web berbasis Flask untuk klasifikasi real-time melalui kamera. Hasil evaluasi menunjukkan model TensorFlow Lite mencapai akurasi 90,56% pada data validasi, sementara pengujian dinamis real-time terhadap 90 sampel buah menghasilkan akurasi rata-rata 95,5% dengan kecepatan pemrosesan stabil 60 FPS, melampaui ambang kebutuhan real-time sebesar 24 FPS. Visualisasi Grad-CAM membuktikan model secara konsisten memfokuskan perhatian pada gradasi warna kulit buah sebagai fitur penentu kematangan, sehingga sistem tidak hanya akurat tetapi juga transparan dan dapat dipertanggungjawabkan secara visual kepada pengguna, khususnya petani dan pelaku UMKM pengolahan Carica.',
    citation:
      'Suhardiyono, W., Mardiyantoro, N., & Rohman, S. (2026). Klasifikasi Real-Time Tingkat Kematangan Buah Carica Menggunakan Convolutional Neural Network dan Grad-CAM. ANTHOR: Education and Learning Journal, 5(4), 664–671.',
    highlights: [
      { label: 'Akurasi Validasi', value: '90.56%' },
      { label: 'Akurasi Real-time', value: '95.5%' },
      { label: 'Kecepatan', value: '60 FPS' },
      { label: 'Dataset', value: '1.800 Citra' },
    ],
  },
]

export function getPublicationBySlug(slug: string) {
  return publications.find((publication) => publication.slug === slug)
}
