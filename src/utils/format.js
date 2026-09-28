export const formatNumber = (value) => new Intl.NumberFormat('fa-IR').format(Number(value || 0))
export const formatPrice = (value) => `${formatNumber(value)} تومان`

export const stockMeta = (quantity) => {
  const qty = Number(quantity)
  if (qty <= 0) return { label: 'ناموجود', className: 'danger' }
  if (qty <= 10) return { label: 'رو به اتمام', className: 'warning' }
  return { label: 'موجود', className: 'success' }
}
