'use client'

import { CheckCircle2, XCircle } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  const isSuccess = toast.type === 'success'

  return (
    <div
      className={`figma-toast ${isSuccess ? 'success' : 'error'}`}
      role="status"
    >
      <div className="figma-toast-icon">
        {isSuccess ? (
          <CheckCircle2 size={18} />
        ) : (
          <XCircle size={18} />
        )}
      </div>

      <span>{toast.message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="بستن"
      >
        ×
      </button>
    </div>
  )
}