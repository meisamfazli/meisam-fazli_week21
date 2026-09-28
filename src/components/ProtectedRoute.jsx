'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from './Layout'

export default function ProtectedRoute({ children }) {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('warehouse_token')

    if (!token) {
      router.replace('/login')
      return
    }

    const storedUser = localStorage.getItem('warehouse_user')

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('warehouse_user')
      }
    }

    setChecking(false)
  }, [router])

  if (checking) {
    return null
  }

  return (
    <Layout user={user}>
      {children}
    </Layout>
  )
}