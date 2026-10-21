import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Wahyu Suhardiyono, S.Kom | Full Stack Laravel Developer',
  description:
    'Portfolio Wahyu Suhardiyono, S.Kom — full stack developer Laravel dari Wonosobo yang membangun sistem keuangan BUMDes dan desa, website biro wisata Dieng, dan platform belajar untuk siswa SD.',
}

const themeInitScript = `
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
