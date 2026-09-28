'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '../../services/api'
import logo from '../../assets/logo.png'

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.username.trim() || !form.password) {
      setError('نام کاربری و رمز عبور را وارد کنید.')
      return
    }

    setLoading(true)

    try {
      const data = await authApi.login({
        username: form.username.trim(),
        password: form.password,
      })

      localStorage.setItem('warehouse_token', data.token)

      localStorage.setItem(
        'warehouse_user',
        JSON.stringify({
          username: form.username.trim(),
        })
      )

      router.replace('/')
    } catch (err) {
      setError(
        err.message || 'نام کاربری یا رمز عبور اشتباه است.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="figma-auth-page">
      <div className="figma-auth-card">

        <div className="figma-logo">
          <img src={logo} alt="logo" />
        </div>

        <h1>فرم ورود</h1>

        <form onSubmit={submit}>
          <input
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            placeholder="نام کاربری"
            autoComplete="username"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            placeholder="رمز عبور"
            autoComplete="current-password"
          />

          {error && (
            <div className="figma-auth-error">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>

          <button
            type="button"
            className="figma-auth-link"
            onClick={() => router.push('/register')}
          >
            حساب کاربری ندارید؟
          </button>
        </form>

      </div>
    </div>
  )
}