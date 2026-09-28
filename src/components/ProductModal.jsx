'use client'

import { useEffect, useState } from 'react'
import Modal from './Modal'

const empty = {
  name: '',
  price: '',
  quantity: '',
}

export default function ProductModal({
  open,
  product,
  loading,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(
      product
        ? {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          }
        : empty
    )

    setErrors({})
  }, [product, open])

  const change = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const submit = (e) => {
    e.preventDefault()

    const next = {}

    if (!form.name.trim()) {
      next.name = 'نام محصول الزامی است.'
    }

    if (form.price === '' || Number(form.price) < 0) {
      next.price = 'قیمت معتبر وارد کنید.'
    }

    if (
      form.quantity === '' ||
      !Number.isInteger(Number(form.quantity)) ||
      Number(form.quantity) < 0
    ) {
      next.quantity = 'موجودی معتبر وارد کنید.'
    }

    setErrors(next)

    if (Object.keys(next).length) {
      return
    }

    onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
    })
  }

  const isEdit = Boolean(product)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'ویرایش اطلاعات' : 'افزودن محصول'}
    >
      <form className="figma-product-form" onSubmit={submit}>
        <label>
          نام محصول

          <input
            autoFocus
            value={form.name}
            onChange={(e) => change('name', e.target.value)}
            placeholder="نام محصول"
          />

          {errors.name && <small>{errors.name}</small>}
        </label>

        <label>
          قیمت

          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => change('price', e.target.value)}
            placeholder="قیمت محصول"
          />

          {errors.price && <small>{errors.price}</small>}
        </label>

        <label>
          موجودی

          <input
            type="number"
            min="0"
            step="1"
            value={form.quantity}
            onChange={(e) => change('quantity', e.target.value)}
            placeholder="تعداد موجودی"
          />

          {errors.quantity && <small>{errors.quantity}</small>}
        </label>

        <div className="figma-product-actions">
          <button
            type="button"
            className="figma-cancel-button"
            onClick={onClose}
          >
            انصراف
          </button>

          <button
            type="submit"
            className="figma-submit-button"
            disabled={loading}
          >
            {loading
              ? 'در حال ذخیره...'
              : isEdit
                ? 'ثبت اطلاعات جدید'
                : 'افزودن محصول'}
          </button>
        </div>
      </form>
    </Modal>
  )
}