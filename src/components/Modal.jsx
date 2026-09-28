'use client'

export default function Modal({
  open,
  title,
  onClose,
  children,
  width = '520px',
}) {
  if (!open) return null

  return (
    <div
      className="figma-modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="figma-modal"
        style={{ maxWidth: width }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="figma-modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="figma-modal-close"
            onClick={onClose}
            aria-label="بستن"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}