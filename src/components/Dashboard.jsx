'use client'

import { useCallback, useEffect, useState } from 'react'
import { Edit3, Plus, Search, Trash2 } from 'lucide-react'
import ProductModal from './ProductModal'
import ConfirmModal from './ConfirmModal'
import Toast from './Toast'
import { productsApi } from '../services/api'
import { formatNumber, formatPrice } from '../utils/format'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState({
    totalProducts: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
  })

  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
  })

  const [draft, setDraft] = useState(filters)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const [modal, setModal] = useState({
    open: false,
    product: null,
  })

  const [confirm, setConfirm] = useState({
    open: false,
    ids: [],
  })

  const [toast, setToast] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(
    async (page = 1, currentFilters = filters) => {
      setLoading(true)
      setError('')

      try {
        const data = await productsApi.list({
          page,
          limit: meta.limit,
          ...currentFilters,
        })

        setProducts(data.data || [])
        setMeta(data)
      } catch (e) {
        setProducts([])
        setError(e.message)
      } finally {
        setLoading(false)
      }
    },
    [filters, meta.limit]
  )

  useEffect(() => {
    load(1)
  }, [])

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      setToast(null)
    }, 3500)

    return () => clearTimeout(timer)
  }, [toast])

  const apply = () => {
    setFilters(draft)
    load(1, draft)
  }

  const clear = () => {
    const emptyFilters = {
      name: '',
      minPrice: '',
      maxPrice: '',
    }

    setDraft(emptyFilters)
    setFilters(emptyFilters)
    load(1, emptyFilters)
  }

  const save = async (payload) => {
    setActionLoading(true)

    try {
      if (modal.product) {
        await productsApi.update(modal.product.id, payload)

        setToast({
          type: 'success',
          message: 'محصول با موفقیت ویرایش شد.',
        })
      } else {
        await productsApi.create(payload)

        setToast({
          type: 'success',
          message: 'محصول با موفقیت اضافه شد.',
        })
      }

      setModal({
        open: false,
        product: null,
      })

      await load(meta.page)
    } catch (e) {
      setToast({
        type: 'error',
        message: e.message,
      })
    } finally {
      setActionLoading(false)
    }
  }

  const remove = async () => {
    setActionLoading(true)

    try {
      if (confirm.ids.length === 1) {
        await productsApi.remove(confirm.ids[0])
      } else {
        await productsApi.removeMany(confirm.ids)
      }

      setToast({
        type: 'success',
        message: 'محصول با موفقیت حذف شد.',
      })

      setConfirm({
        open: false,
        ids: [],
      })

      const nextPage =
        products.length === 1 && meta.page > 1
          ? meta.page - 1
          : meta.page

      await load(nextPage)
    } catch (e) {
      setToast({
        type: 'error',
        message: e.message,
      })
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <>
      <section className="figma-products">
        <div className="figma-products-top">
          <div>
            <h1>لیست محصولات</h1>
            <span>
              {formatNumber(meta.totalProducts)} محصول
            </span>
          </div>

          <button
            className="figma-add-button"
            onClick={() =>
              setModal({
                open: true,
                product: null,
              })
            }
          >
            <Plus size={17} />
            افزودن محصول
          </button>
        </div>

        <div className="figma-products-filters">
          <div className="figma-search">
            <Search size={17} />

            <input
              value={draft.name}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  name: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  apply()
                }
              }}
              placeholder="جستجوی محصول"
            />
          </div>

          <input
            className="figma-price-filter"
            type="number"
            min="0"
            value={draft.minPrice}
            onChange={(e) =>
              setDraft({
                ...draft,
                minPrice: e.target.value,
              })
            }
            placeholder="حداقل قیمت"
          />

          <input
            className="figma-price-filter"
            type="number"
            min="0"
            value={draft.maxPrice}
            onChange={(e) =>
              setDraft({
                ...draft,
                maxPrice: e.target.value,
              })
            }
            placeholder="حداکثر قیمت"
          />

          <button
            className="figma-filter-button"
            onClick={apply}
          >
            جستجو
          </button>

          {(draft.name || draft.minPrice || draft.maxPrice) && (
            <button
              className="figma-clear-button"
              onClick={clear}
            >
              پاک کردن
            </button>
          )}
        </div>

        {error ? (
          <div className="figma-state">
            <strong>دریافت اطلاعات ناموفق بود</strong>
            <span>{error}</span>

            <button onClick={() => load(meta.page)}>
              تلاش دوباره
            </button>
          </div>
        ) : loading ? (
          <div className="figma-state">
            <span>در حال دریافت محصولات...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="figma-state">
            <strong>محصولی پیدا نشد</strong>
            <span>
              فیلترها را تغییر دهید یا یک محصول جدید اضافه کنید.
            </span>
          </div>
        ) : (
          <div className="figma-table-wrapper">
            <table className="figma-products-table">
              <thead>
                <tr>
                  <th>نام محصول</th>
                  <th>قیمت</th>
                  <th>موجودی</th>
                  <th>شناسه</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>

                    <td>{formatPrice(product.price)}</td>

                    <td>
                      {formatNumber(product.quantity)}
                    </td>

                    <td>{product.id.slice(0, 8)}</td>

                    <td>
                      <div className="figma-row-actions">
                        <button
                          onClick={() =>
                            setModal({
                              open: true,
                              product,
                            })
                          }
                        >
                          <Edit3 size={15} />
                          ویرایش
                        </button>

                        <button
                          className="delete-action"
                          onClick={() =>
                            setConfirm({
                              open: true,
                              ids: [product.id],
                            })
                          }
                        >
                          <Trash2 size={15} />
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="figma-pagination">
          <button
            disabled={meta.page <= 1 || loading}
            onClick={() => load(meta.page - 1)}
          >
            قبلی
          </button>

          {Array.from(
            {
              length: Math.min(meta.totalPages, 5),
            },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              className={page === meta.page ? 'active' : ''}
              onClick={() => load(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={
              meta.page >= meta.totalPages || loading
            }
            onClick={() => load(meta.page + 1)}
          >
            بعدی
          </button>
        </div>
      </section>

      <ProductModal
        open={modal.open}
        product={modal.product}
        loading={actionLoading}
        onClose={() =>
          setModal({
            open: false,
            product: null,
          })
        }
        onSubmit={save}
      />

      <ConfirmModal
        open={confirm.open}
        count={confirm.ids.length}
        loading={actionLoading}
        onClose={() =>
          setConfirm({
            open: false,
            ids: [],
          })
        }
        onConfirm={remove}
      />

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </>
  )
}