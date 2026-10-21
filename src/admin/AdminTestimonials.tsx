import { useEffect, useState, type FormEvent } from 'react'
import { useAdminAuth } from './AdminAuthContext'
import {
  createTestimonial,
  deleteTestimonial,
  fetchAllTestimonials,
  updateTestimonial,
  type Testimonial,
  type TestimonialInput,
} from './adminApi'

const EMPTY_FORM: TestimonialInput = { name: '', role: '', text: '', rating: 5, published: true }

const field = 'mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50'

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={`border-0 bg-transparent p-0 text-lg leading-none ${onChange ? 'cursor-pointer' : 'cursor-default'} ${n <= value ? 'text-[#ffb800]' : 'text-[#d9d6ee]'}`}
          aria-label={onChange ? `${n} étoile${n > 1 ? 's' : ''}` : undefined}
        >
          ★
        </button>
      ))}
    </span>
  )
}

function AdminTestimonials() {
  const { token } = useAdminAuth()
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<TestimonialInput>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!token) return
    fetchAllTestimonials(token)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  function openCreate() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setFormError('')
    setShowForm(true)
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id)
    setForm({ name: t.name, role: t.role, text: t.text, rating: t.rating, published: t.published })
    setFormError('')
    setShowForm(true)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) return
    setFormError('')
    setSaving(true)
    try {
      if (editingId) {
        const updated = await updateTestimonial(token, editingId, form)
        setItems((prev) => prev.map((t) => (t.id === editingId ? updated : t)))
      } else {
        const created = await createTestimonial(token, form)
        setItems((prev) => [created, ...prev])
      }
      setShowForm(false)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erreur lors de l’enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  async function togglePublished(t: Testimonial) {
    if (!token) return
    const updated = await updateTestimonial(token, t.id, { published: !t.published })
    setItems((prev) => prev.map((x) => (x.id === t.id ? updated : x)))
  }

  async function handleDelete(id: string) {
    if (!token) return
    if (!confirm('Supprimer cet avis ?')) return
    await deleteTestimonial(token, id)
    setItems((prev) => prev.filter((t) => t.id !== id))
  }

  const publishedCount = items.filter((t) => t.published).length

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-sora text-[28px] font-bold tracking-[-0.02em] text-ink">Avis clients</h1>
          <p className="text-sm text-mute">
            {items.length} avis · {publishedCount} publié{publishedCount !== 1 ? 's' : ''} sur le site
          </p>
        </div>
        <button className="btn-blue inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-2.5 font-sora text-[13px] font-semibold transition hover:-translate-y-0.5" onClick={openCreate}>
          + Nouvel avis
        </button>
      </header>

      {error && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{error}</p>}
      {loading && <p className="py-10 text-center text-sm text-mute">Chargement...</p>}
      {!loading && items.length === 0 && !error && <p className="py-10 text-center text-sm text-mute">Aucun avis pour l&apos;instant.</p>}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((t) => (
          <article key={t.id} className={`grid content-start gap-3 rounded-2xl border bg-white p-5 shadow-[0_14px_40px_-30px_rgba(70,50,200,.5)] ${t.published ? 'border-violet/10' : 'border-dashed border-violet/30 opacity-75'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(120deg,#7b3cff,#5a4bff_45%,#2f5bff)] font-semibold text-white">{t.name.charAt(0).toUpperCase()}</span>
                <div>
                  <h3 className="font-sora text-sm font-semibold text-ink">{t.name}</h3>
                  {t.role && <p className="text-xs text-mute">{t.role}</p>}
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${t.published ? 'bg-[#e6f8ef] text-[#17844f]' : 'bg-violet/8 text-[#3a2bd8]'}`}>
                {t.published ? 'Publié' : 'Brouillon'}
              </span>
            </div>
            <Stars value={t.rating} />
            <p className="text-[13px] leading-[1.65] text-body">“{t.text}”</p>
            <div className="flex flex-wrap gap-2">
              <button className="cursor-pointer rounded-lg border border-violet/15 bg-white px-3 py-1.5 font-sora text-xs font-medium text-ink-2 transition hover:border-violet/40 hover:text-violet" onClick={() => openEdit(t)}>Modifier</button>
              <button className="cursor-pointer rounded-lg border border-violet/15 bg-white px-3 py-1.5 font-sora text-xs font-medium text-ink-2 transition hover:border-violet/40 hover:text-violet" onClick={() => togglePublished(t)}>
                {t.published ? 'Masquer' : 'Publier'}
              </button>
              <button className="cursor-pointer rounded-lg border border-[#f3c0cc] bg-white px-3 py-1.5 font-sora text-xs font-medium text-[#c2244a] transition hover:bg-[#ffe9ee]" onClick={() => handleDelete(t.id)}>
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-night/60 p-6 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form className="grid max-h-[90vh] w-full max-w-[520px] gap-4 overflow-y-auto rounded-[24px] bg-white p-7 font-sora" onSubmit={handleSubmit}>
            <h2 className="font-sora text-xl font-bold text-ink">{editingId ? "Modifier l'avis" : 'Nouvel avis'}</h2>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Nom du client
              <input className={field} type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex : Miora R." />
            </label>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Fonction / entreprise
              <input className={field} type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Ex : Directrice, CGA AVEMA" />
            </label>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Avis
              <textarea className={field} rows={4} required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-4 text-[12.5px] font-semibold text-ink-2">
              <span className="flex items-center gap-3">Note <Stars value={form.rating} onChange={(rating) => setForm({ ...form, rating })} /></span>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" className="size-4 accent-[#5a3cff]" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Publier sur le site
              </label>
            </div>

            {formError && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{formError}</p>}

            <div className="mt-2 flex justify-end gap-3">
              <button type="button" className="inline-flex cursor-pointer items-center justify-center rounded-full border border-violet/25 bg-white px-5 py-2.5 font-sora text-[13px] font-semibold text-ink-2 transition hover:border-violet/50" onClick={() => setShowForm(false)}>
                Annuler
              </button>
              <button type="submit" className="btn-blue inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-2.5 font-sora text-[13px] font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminTestimonials
