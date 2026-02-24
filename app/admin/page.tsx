"use client"
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [tab, setTab] = useState<'profile' | 'projects' | 'certificates'>('profile')
  const [loading, setLoading] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const router = useRouter()

  // State Profile
  const [profile, setProfile] = useState({
    name: '', role: '', tagline: '', about_text: '', whatsapp: '', linkedin: '', image_url: ''
  })

  // State Projects
  const [projects, setProjects] = useState<any[]>([])
  const [newProject, setNewProject] = useState({ title: '', description: '', link_demo: '', image_url: '' })
  const [editingProject, setEditingProject] = useState<any>(null)

  // State Certificates
  const [certificates, setCertificates] = useState<any[]>([])
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', image_url: '', credential_link: '' })
  const [editingCert, setEditingCert] = useState<any>(null)

  const fetchData = useCallback(async () => {
    const { data: prof } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle()
    if (prof) setProfile(prof)

    const { data: proj } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (proj) setProjects(proj)

    const { data: cert } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
    if (cert) setCertificates(cert)
  }, [])

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const { data: { session } } = await supabase.auth.getSession()
  //     if (!session) router.push('/login')
  //     else fetchData()
  //   }
  //   checkUser()
  // }, 
  useEffect(() => {
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      // Gunakan replace agar user tidak bisa klik tombol "back" ke halaman admin
      router.replace('/login') 
    } else {
      await fetchData()
      setLoading(false) // Baru set loading false SETELAH data diambil & session terbukti ada
    }
  }
  checkUser()
}, [router, fetchData])

// 3. Tambahkan baris ini tepat SEBELUM baris 'return (' (Sekitar baris 150-an)
if (loading) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      {/* Container untuk Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Spinner Bulat Luar */}
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Icon di Tengah (Opsional, agar lebih keren) */}
        <div className="absolute">
          <svg 
            className="w-6 h-6 text-blue-600 animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* Teks Animasi */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <h2 className="text-slate-900 font-black text-sm uppercase tracking-[0.3em] animate-pulse">
          Authenticating
        </h2>
        <p className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">
          Mohon tunggu sebentar...
        </p>
      </div>

      {/* Efek Gradasi Halus di Background */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 overflow-hidden">
        <div className="w-full h-full bg-blue-600 origin-left animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}
  


  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // --- GENERIC UPLOAD FUNCTION ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, folder: string, callback: (url: string) => void) => {
    try {
      setUploadingImage(true)
      const file = e.target.files?.[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}-${Date.now()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage.from('portfolio_images').upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('portfolio_images').getPublicUrl(filePath)
      callback(publicUrl)
    } catch (error: any) {
      alert("Gagal upload: " + error.message)
    } finally {
      setUploadingImage(false)
    }
  }

  // --- ACTIONS ---
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('profile').update(profile).eq('id', 1)
    if (error) alert(error.message)
    else alert('Profile diperbarui!')
    setLoading(false)
  }

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('projects').insert([newProject])
    if (error) alert(error.message)
    else {
      alert('Project ditambah!')
      setNewProject({ title: '', description: '', link_demo: '', image_url: '' })
      fetchData()
    }
    setLoading(false)
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('projects').update(editingProject).eq('id', editingProject.id)
    if (error) alert(error.message)
    else {
      alert('Project diperbarui!')
      setEditingProject(null)
      fetchData()
    }
    setLoading(false)
  }

  const deleteProject = async (id: string) => {
    if (confirm('Hapus project?')) {
      await supabase.from('projects').delete().eq('id', id)
      fetchData()
    }
  }

  const addCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('certificates').insert([newCert])
    if (error) alert(error.message)
    else {
      alert('Sertifikat ditambah!')
      setNewCert({ title: '', issuer: '', date: '', image_url: '', credential_link: '' })
      fetchData()
    }
    setLoading(false)
  }

  const handleUpdateCert = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('certificates').update(editingCert).eq('id', editingCert.id)
    if (error) alert(error.message)
    else {
      alert('Sertifikat diperbarui!')
      setEditingCert(null)
      fetchData()
    }
    setLoading(false)
  }

  const deleteCert = async (id: string) => {
    if (confirm('Hapus sertifikat?')) {
      await supabase.from('certificates').delete().eq('id', id)
      fetchData()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-600">Admin Panel</h1>
          <button onClick={handleLogout} className="bg-red-50 text-red-500 px-6 py-2 rounded-xl font-semibold">Logout</button>
        </div>

        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          {['profile', 'projects', 'certificates'].map((t) => (
            <button key={t} onClick={() => setTab(t as any)} className={`pb-2 px-4 transition-all capitalize ${tab === t ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-400'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* --- TAB PROFILE --- */}
        {tab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4">
              <div className="relative group">
                <img src={profile.image_url || 'https://via.placeholder.com/150'} className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 shadow-md" alt="Profile" />
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition">
                  {uploadingImage ? '...' : 'Ganti Foto'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'profile', (url) => setProfile({...profile, image_url: url}))} />
                </label>
              </div>
            </div>
            <form onSubmit={updateProfile} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder="Nama" className="p-3 border rounded-xl" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                  <input placeholder="Role" className="p-3 border rounded-xl" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} />
                </div>
                <input placeholder="Tagline" className="w-full p-3 border rounded-xl" value={profile.tagline} onChange={e => setProfile({...profile, tagline: e.target.value})} />
                <textarea placeholder="About" rows={4} className="w-full p-3 border rounded-xl" value={profile.about_text} onChange={e => setProfile({...profile, about_text: e.target.value})} />
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold">Simpan Profile</button>
            </form>
          </div>
        )}

        {/* --- TAB PROJECTS --- */}
        {tab === 'projects' && (
          <div className="space-y-10">
            <form onSubmit={editingProject ? handleUpdateProject : addProject} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Tambah Project'}</h2>
              <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-2xl">
                <img src={(editingProject ? editingProject.image_url : newProject.image_url) || 'https://via.placeholder.com/150'} className="w-full h-48 object-cover rounded-xl" alt="Preview" />
                <label className="bg-gray-100 px-4 py-2 rounded-lg cursor-pointer text-xs font-bold">
                  {uploadingImage ? 'Mengupload...' : 'Pilih Gambar'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'projects', (url) => {
                    editingProject ? setEditingProject({...editingProject, image_url: url}) : setNewProject({...newProject, image_url: url})
                  })} />
                </label>
              </div>
              <input placeholder="Judul" className="w-full p-3 border rounded-xl" value={editingProject ? editingProject.title : newProject.title} onChange={e => editingProject ? setEditingProject({...editingProject, title: e.target.value}) : setNewProject({...newProject, title: e.target.value})} required />
              <textarea placeholder="Deskripsi" className="w-full p-3 border rounded-xl" value={editingProject ? editingProject.description : newProject.description} onChange={e => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})} />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">{editingProject ? 'Update' : 'Tambah'}</button>
                {editingProject && <button onClick={() => setEditingProject(null)} className="bg-gray-200 px-6 rounded-xl">Batal</button>}
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                  <img src={p.image_url} className="h-40 w-full object-cover" alt="" />
                  <div className="p-4 flex justify-between items-center">
                    <h3 className="font-bold">{p.title}</h3>
                    <div className="flex gap-3">
                      <button onClick={() => { setEditingProject(p); window.scrollTo({top: 0}) }} className="text-blue-600 text-xs font-bold">Edit</button>
                      <button onClick={() => deleteProject(p.id)} className="text-red-500 text-xs font-bold">Hapus</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB CERTIFICATES --- */}
        {tab === 'certificates' && (
          <div className="space-y-10">
            <form onSubmit={editingCert ? handleUpdateCert : addCertificate} className={`p-8 rounded-2xl border ${editingCert ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-100'} shadow-sm space-y-4`}>
              <h2 className="text-xl font-bold">{editingCert ? 'Edit Sertifikat' : 'Tambah Sertifikat'}</h2>
              <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
                <img src={(editingCert ? editingCert.image_url : newCert.image_url) || 'https://via.placeholder.com/150'} className="w-full max-w-sm h-40 object-cover rounded-xl shadow" alt="Preview" />
                <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer text-xs font-bold">
                  {uploadingImage ? 'Mengupload...' : 'Pilih Foto Sertifikat'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'certs', (url) => {
                    editingCert ? setEditingCert({...editingCert, image_url: url}) : setNewCert({...newCert, image_url: url})
                  })} />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Nama Sertifikat" className="p-3 border rounded-xl" value={editingCert ? editingCert.title : newCert.title} onChange={e => editingCert ? setEditingCert({...editingCert, title: e.target.value}) : setNewCert({...newCert, title: e.target.value})} required />
                <input placeholder="Penerbit" className="p-3 border rounded-xl" value={editingCert ? editingCert.issuer : newCert.issuer} onChange={e => editingCert ? setEditingCert({...editingCert, issuer: e.target.value}) : setNewCert({...newCert, issuer: e.target.value})} />
                <input placeholder="Tanggal" className="p-3 border rounded-xl" value={editingCert ? editingCert.date : newCert.date} onChange={e => editingCert ? setEditingCert({...editingCert, date: e.target.value}) : setNewCert({...newCert, date: e.target.value})} />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold">{editingCert ? 'Update' : 'Tambah'}</button>
                {editingCert && <button onClick={() => setEditingCert(null)} className="bg-gray-200 px-6 rounded-xl">Batal</button>}
              </div>
            </form>

            <div className="space-y-4">
              {certificates.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-2xl border flex items-center gap-4">
                  <img src={c.image_url} className="w-20 h-14 object-cover rounded-lg" alt="" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{c.title}</h3>
                    <p className="text-xs text-gray-500">{c.issuer}</p>
                  </div>
                  <button onClick={() => { setEditingCert(c); window.scrollTo({top: 0}) }} className="text-blue-600 text-xs font-bold">Edit</button>
                  <button onClick={() => deleteCert(c.id)} className="text-red-500 text-xs font-bold">Hapus</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}