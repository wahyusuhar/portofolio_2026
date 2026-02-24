'use client'

import { useState, useEffect, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // CEK JIKA USER SUDAH LOGIN
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.replace('/admin')
      }
    }
    checkSession()
  }, [router])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert("Login Gagal: " + error.message)
      } else {
        router.push('/admin') 
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-96 border border-slate-100">
        <h1 className="text-2xl font-black mb-6 text-center text-slate-900 tracking-tight">Admin Login</h1>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Admin"
            className="w-full p-3 border border-slate-200 rounded-xl text-black bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-slate-200 rounded-xl text-black bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-slate-900 text-white p-3 rounded-xl font-bold hover:bg-black disabled:bg-slate-300 transition-all shadow-lg shadow-slate-200"
        >
          {loading ? 'Memverifikasi...' : 'Masuk ke Panel'}
        </button>
      </form>
    </div>
  )
}