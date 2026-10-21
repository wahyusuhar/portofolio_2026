'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- three.js dimuat dari CDN tanpa tipe
    THREE: any
  }
}

export default function ParticleField({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- three.js dimuat dari CDN tanpa tipe
    let renderer: any = null
    let animationId = 0
    let disposed = false
    let removeResize = () => {}

    function trySetup() {
      if (disposed) return
      const container = containerRef.current
      if (!container || !window.THREE) {
        requestAnimationFrame(trySetup)
        return
      }

      const THREE = window.THREE
      const width = container.clientWidth || window.innerWidth
      const height = container.clientHeight || window.innerHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 5

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.appendChild(renderer.domElement)

      const particlesCount = 2000
      const positions = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount; i++) {
        const ix = (i % 50) - 25
        const iy = (Math.floor(i / 50) % 40) - 20
        const iz = (Math.sin(ix * 0.2) + Math.cos(iy * 0.2)) * 2

        positions[i * 3] = ix * 0.4
        positions[i * 3 + 1] = iy * 0.4
        positions[i * 3 + 2] = iz
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const material = new THREE.PointsMaterial({
        size: 0.05,
        transparent: true,
        opacity: 0.5,
      })

      // Partikel mengikuti warna --foreground, termasuk saat tema diganti
      const syncColor = () => {
        const foreground = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim()
        material.color.set(foreground || '#171717')
      }
      syncColor()
      const themeObserver = new MutationObserver(syncColor)
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      const points = new THREE.Points(geometry, material)
      scene.add(points)

      function animate() {
        animationId = requestAnimationFrame(animate)

        const time = Date.now() * 0.001
        const pos = geometry.attributes.position.array

        for (let i = 0; i < particlesCount; i++) {
          const x = pos[i * 3]
          const y = pos[i * 3 + 1]
          pos[i * 3 + 2] = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time) * 1.5
        }
        geometry.attributes.position.needsUpdate = true

        points.rotation.y += 0.001
        renderer.render(scene, camera)
      }

      function onResize() {
        if (!container) return
        const w = container.clientWidth || window.innerWidth
        const h = container.clientHeight || window.innerHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }

      window.addEventListener('resize', onResize)
      removeResize = () => {
        window.removeEventListener('resize', onResize)
        themeObserver.disconnect()
      }

      animate()
    }

    trySetup()

    return () => {
      disposed = true
      if (animationId) cancelAnimationFrame(animationId)
      removeResize()
      if (renderer) {
        renderer.dispose()
        renderer.domElement?.remove()
      }
    }
  }, [])

  return (
    <>
      <Script src="https://unpkg.com/three@0.125.0/build/three.min.js" strategy="afterInteractive" />
      <div ref={containerRef} className={`w-full h-full ${className}`} />
    </>
  )
}
