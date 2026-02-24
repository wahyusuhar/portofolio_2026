"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

const skills = [
  { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'Bootstrap', logo: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
  { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/000000' },
  { name: 'Tailwind', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
];

export default function Home() {
  const [profile, setProfile] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [certificates, setCertificates] = useState<any[]>([])
  const [selectedImg, setSelectedImg] = useState<string | null>(null) // State untuk Lightbox

  useEffect(() => {
    async function fetchData() {
      const { data: prof } = await supabase.from('profile').select('*').eq('id', 1).single()
      const { data: proj } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      const { data: cert } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
      
      setProfile(prof)
      setProjects(proj || [])
      setCertificates(cert || [])
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white scroll-smooth font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-slate-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter">Portofolio<span className="text-emerald-500">.</span></span>
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#tentang" className="hover:text-slate-900 transition-colors">Tentang</a>
            <a href="#proyek" className="hover:text-slate-900 transition-colors">Proyek</a>
            <a href="#sertifikat" className="hover:text-slate-900 transition-colors">Sertifikat</a>
            <a href="#kontak" className="hover:text-slate-900 transition-colors">Kontak</a>
          </div>
          <a href="#kontak" className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-100">
            Hubungi Saya
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-widest mb-6 border border-emerald-100">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                Tersedia untuk proyek baru
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Halo, Saya <span className="text-black">{profile?.name || 'Wahyu'}</span>
              </h1>
              <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                {profile?.role} <span className="mx-2 text-slate-300">|</span> {profile?.tagline}
              </p>
              
              <div className="flex gap-4 justify-center md:justify-start mb-10">
                <a href="#proyek" className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all shadow-lg shadow-slate-200">
                  Lihat Proyek
                </a>
                <a href="#kontak" className="px-8 py-3.5 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                  Kontak
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-r border-slate-200 pr-6">
    Ikuti Saya
  </p>
  <div className="flex gap-5">
    {[
      { name: 'GitHub', icon: 'github', color: '181717', link: 'https://github.com/wahyusuhar' },
      { name: 'Instagram', icon: 'instagram', color: 'E4405F', link: 'https://www.instagram.com/wahyu.suhardiyono' },
      { name: 'TikTok', icon: 'tiktok', color: '000000', link: 'https://www.tiktok.com/@wahyu_suhardi' },
      { name: 'WhatsApp', icon: 'whatsapp', color: '25D366', link: 'https://wa.me/082142918053' },
      { name: 'Telegram', icon: 'telegram', color: '26A2E1', link: 'https://t.me/wahyusuhardiyono' },
    ].map((social) => (
      <a 
        key={social.name} 
        href={social.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group relative"
      >
        <img 
          src={`https://cdn.simpleicons.org/${social.icon}/${social.color}`} 
          alt={social.name} 
          className="w-5 h-5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6" 
        />
        {/* Tooltip Nama saat Hover (Bonus agar lebih UX-friendly) */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase font-bold tracking-widest">
          {social.name}
        </span>
      </a>
    ))}
  </div>
</div>
            </div>

            <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-slate-100/50 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
                {profile?.image_url ? (
                  <div className="relative group">
                    <img src={profile.image_url} className="w-64 h-64 md:w-[400px] md:h-[400px] rounded-3xl object-cover border-8 border-white shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-500" alt="Profile" />
                    <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:block border border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</p>
                          <p className="text-xs font-black text-slate-800">Mahasiswa Unsiq di Wonosobo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-64 h-64 md:w-[400px] md:h-[400px] bg-slate-100 rounded-3xl animate-pulse"></div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="tentang" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-slate-900"></span>
                <h2 className="text-slate-900 font-black tracking-[0.3em] uppercase text-xs">Profil Singkat</h2>
              </div>
              <h3 className="text-3xl md:text-4xl font-black leading-tight text-slate-900 mb-6">Mengenal Lebih Dekat</h3>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xl font-black text-slate-900">20+</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Proyek Selesai</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl text-white">
                  <p className="text-xl font-black tracking-tight">UNSIQ</p>
                  <p className="text-[9px] font-bold opacity-90 uppercase tracking-tighter">Teknik Informatika</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-12">
              <div className="text-slate-500 text-sm md:text-base leading-relaxed text-justify">
                {profile?.about_text?.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                )) || <p>Memuat profil...</p>}
              </div>

              <div className="pt-8 border-t border-slate-100 overflow-hidden">
                <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-900 rounded-full"></span> Tech Stack
                </h4>
                <div className="relative flex overflow-hidden group">
                  <motion.div className="flex gap-8 py-4" animate={{ x: [0, -1000] }} transition={{ duration: 25, ease: "linear", repeat: Infinity }}>
                    {[...skills, ...skills].map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white border border-slate-100 px-6 py-3 rounded-2xl shrink-0">
                        <img src={skill.logo} alt={skill.name} className="w-5 h-5" />
                        <span className="text-xs font-bold text-slate-600">{skill.name}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <div className="bg-slate-900 p-8 md:p-10 rounded-[40px] relative">
                <p className="text-white text-base italic leading-relaxed text-justify">
                     "Satu hari tanpa belajar adalah satu langkah menjauh dari impianmu. Jika hari ini kamu memilih nyaman, maka besok kamu akan dipaksa tertinggal.Setiap baris kode yang kamu pelajari adalah investasi masa depan.Setiap error yang kamu hadapi adalah latihan mental untuk jadi lebih kuat.Jangan tunggu motivasi datang — duduk, buka laptop, dan mulai.Karena mimpi tidak dikejar dengan alasan, tapi dengan aksi."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-slate-500"></div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Wahyu Suhardiyono</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PROYEK SECTION --- */}
      <section id="proyek" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-slate-900 font-bold tracking-[0.2em] uppercase text-[10px] mb-3">Portfolio</h2>
          <h3 className="text-3xl font-bold tracking-tight">Proyek Terbaru</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div key={project.id} whileHover={{ y: -10 }} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-video overflow-hidden bg-slate-100 relative">
                <img src={project.image_url || 'https://via.placeholder.com/600x400'} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold mb-2 text-slate-800">{project.title}</h4>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{project.description}</p>
                <a href={project.link_demo} target="_blank" className="inline-flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                  Kunjungi Proyek ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CERTIFICATE SECTION (PORTRAIT + LIGHTBOX) --- */}
  <section id="sertifikat" className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-[12px] mb-3">Achievements</h2>
            <h3 className="text-4xl font-bold tracking-tight">Sertifikasi & Penghargaan</h3>
          </div>

          {/* Grid tetap 3 kolom di desktop, tapi gambar sekarang Landscape */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <motion.div 
                  key={cert.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  className="group flex flex-col"
                >
                  {/* Container Sertifikat Landscape */}
                  <div 
                    onClick={() => setSelectedImg(cert.image_url)}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-200 border-4 border-white shadow-lg cursor-pointer transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl"
                  >
                    <img 
                      src={cert.image_url || 'https://via.placeholder.com/800x600'} 
                      alt={cert.title} 
                      className="w-full h-full object-contain bg-slate-100" // object-contain memastikan tidak terpotong
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                      <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100 shadow-xl">
                        <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Info Teks di bawah sertifikat */}
                  <div className="mt-5 text-center sm:text-left px-1">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{cert.issuer || 'Credential'}</p>
                    <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">{cert.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{cert.date}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Belum ada sertifikat</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- LIGHTBOX MODAL (Full View) --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full flex items-center justify-center"
            >
              <img 
                src={selectedImg} 
                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl shadow-emerald-500/10" 
                alt="Enlarged View"
              />
              <button className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 font-bold text-xs tracking-widest uppercase">
                Tutup <span className="text-2xl">&times;</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- KONTAK --- */}
      <section id="kontak" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden group">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Punya ide proyek <span className="text-emerald-400">luar biasa?</span></h2>
                <p className="text-slate-400 mb-8 max-w-md">Mari berdiskusi dan wujudkan menjadi solusi digital yang nyata.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* <a href={`mailto:${profile?.email}`} className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center gap-3">Kirim Email Sekarang</a> */}
                  <a href="https://wa.me/082142918053" className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center gap-3">Chat WhatsApp</a>
                </div>
              </div>
              <div className="hidden lg:block bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">📍</div>
                    <div><p className="text-xs font-bold text-slate-500 uppercase">Lokasi</p><p className="text-sm text-white">Wonosobo, Jawa Tengah</p></div>
                  </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                        ⚡
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase">Respon</p>
                        <p className="text-sm text-white font-medium">Kurang dari 24 Jam</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
       <footer className="pt-20 pb-10 px-6 border-t border-slate-100">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">

            <div>

              <span className="font-bold text-xl tracking-tighter">Portofolio<span className="text-emerald-500">.</span></span>

              <p className="mt-4 text-slate-500 text-sm leading-relaxed">

                Membangun pengalaman digital yang bermakna melalui kode dan desain yang presisi.

              </p>

            </div>

            <div>

              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6">Navigasi</h4>

              <ul className="space-y-4 text-sm font-bold text-slate-400">

                <li><a href="#tentang" className="hover:text-slate-900 transition-colors">Tentang</a></li>

                <li><a href="#proyek" className="hover:text-slate-900 transition-colors">Proyek</a></li>

                <li><a href="#kontak" className="hover:text-slate-900 transition-colors">Kontak</a></li>

              </ul>

            </div>

            <div>

              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6">Media Sosial</h4>

              <ul className="space-y-4 text-sm font-bold text-slate-400">

                <li><a href="#" className="hover:text-slate-900 transition-colors">Instagram</a></li>

                <li><a href="#" className="hover:text-slate-900 transition-colors">TikTok</a></li>

                <li><a href="#" className="hover:text-slate-900 transition-colors">GitHub</a></li>

              </ul>

            </div>

          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">

              © {new Date().getFullYear()} {profile?.name} — All Rights Reserved

            </p>

            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">

              Built with Next.js & Tailwind

            </p>

          </div>

        </div>

      </footer>
    </div>
  )
}