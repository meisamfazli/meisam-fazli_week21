'use client'

import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'

export default function ConfirmModal({
  open,
  count = 1,
  loading,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="تأیید حذف"
      width="430px"
    >
      <div className="figma-confirm">
        <div className="figma-confirm-icon">
          <AlertTriangle size={25} />
        </div>

        <h3>حذف محصول</h3>

        <p>
          آیا از حذف <strong>{count} محصول</strong> مطمئن هستید؟
        </p>

        <span>این عملیات قابل بازگشت نیست.</span>

        <div className="figma-confirm-actions">
          <button
            type="button"
            className="figma-confirm-cancel"
            onClick={onClose}
          >
            انصراف
          </button>

          <button
            type="button"
            className="figma-confirm-delete"
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? 'در حال حذف...' : 'بله، حذف کن'}
          </button>
        </div>
      </div>
    </Modal>
  )
}