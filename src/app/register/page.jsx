'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '../../services/api'
import logo from '../../assets/logo.png'

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (
      !form.username.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError('لطفاً همه فیلدها را پر کنید.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('رمز عبور و تکرار رمز عبور یکسان نیستند.')
      return
    }

    setLoading(true)

    try {
      await authApi.register({
        username: form.username.trim(),
        password: form.password,
      })

      router.replace('/login')
    } catch (err) {
      setError(err.message || 'ثبت نام انجام نشد.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="figma-auth-page">
      <div className="figma-auth-card register-card">
        <div className="figma-logo">
          <img src={logo} alt="logo" />
        </div>

        <h1>فرم ثبت نام</h1>

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
            autoComplete="new-password"
          />

          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            placeholder="تکرار رمز عبور"
            autoComplete="new-password"
          />

          {error && (
            <div className="figma-auth-error">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'در حال ثبت نام...' : 'ثبت نام'}
          </button>

          <button
            type="button"
            className="figma-auth-link"
            onClick={() => router.push('/login')}
          >
            حساب کاربری دارید؟
          </button>
        </form>
      </div>
    </div>
  )
}