'use client'

import { useEffect } from 'react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Layout({ children, user }) {
  const router = useRouter()

  useEffect(() => {
    const onExpired = () => {
      router.replace('/login')
    }

    window.addEventListener('auth-expired', onExpired)

    return () => {
      window.removeEventListener('auth-expired', onExpired)
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem('warehouse_token')
    localStorage.removeItem('warehouse_user')

    router.replace('/login')
  }

  return (
    <div className="figma-dashboard">
      <header className="figma-dashboard-header">
        <div className="figma-dashboard-brand">
          <strong>مدیریت محصولات</strong>
          <span>{user?.username || 'مدیر'}</span>
        </div>

        <button className="figma-logout" onClick={logout}>
          <LogOut size={16} />
          خروج
        </button>
      </header>

      <main className="figma-dashboard-content">
        {children}
      </main>
    </div>
  )
}