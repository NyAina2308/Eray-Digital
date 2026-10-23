import { useEffect, useState, type FormEvent } from 'react'
import { useAdminAuth } from './AdminAuthContext'
import {
  createProject,
  deleteProject,
  fetchProjects,
  resolveImageUrl,
  updateProject,
  type AdminProject,
} from './adminApi'

const EMPTY_FORM = { name: '', category: '', description: '', url: '' }

/** Affiche « monsite.com » au lieu de « https://www.monsite.com/ ». */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

function AdminProjects() {
  const { token } = useAdminAuth()
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  function load() {
    setLoading(true)
    fetchProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  function openCreate() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  function openEdit(project: AdminProject) {
    setEditingId(project.id)
    setForm({ name: project.name, category: project.category, description: project.description, url: project.url ?? '' })
    setImageFile(null)
    setFormError('')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!token) return
    setFormError('')

    if (!editingId && !imageFile) {
      setFormError('Une image est requise pour un nouveau projet.')
      return
    }

    setSaving(true)
    try {
      const input = { ...form, imageFile }
      if (editingId) {
        const updated = await updateProject(token, editingId, input)
        setProjects((prev) => prev.map((p) => (p.id === editingId ? updated : p)))
      } else {
        const created = await createProject(token, input)
        setProjects((prev) => [...prev, created])
      }
      setShowForm(false)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erreur lors de l’enregistrement.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!token) return
    if (!confirm('Supprimer ce projet ?')) return
    await deleteProject(token, id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-sora text-[28px] font-bold tracking-[-0.02em] text-ink">Projets</h1>
          <p className="text-sm text-mute">{projects.length} projet{projects.length !== 1 ? 's' : ''} publié{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-blue inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-5 py-2.5 font-sora text-[13px] font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" onClick={openCreate}>
          + Nouveau projet
        </button>
      </header>

      {error && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{error}</p>}
      {loading && <p className="py-10 text-center text-sm text-mute">Chargement...</p>}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="overflow-hidden rounded-2xl border border-violet/10 bg-white shadow-[0_14px_40px_-30px_rgba(70,50,200,.5)]">
            <img src={resolveImageUrl(project.imageUrl)} alt={project.name} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
            <div className="grid gap-2 p-5">
              <h3 className="font-sora text-base font-semibold text-ink">{project.name}</h3>
              <span className="text-[11px] font-semibold text-[#3a4bff]">{project.category}</span>
              <p className="mb-2 line-clamp-3 text-[13px] leading-[1.6] text-body">{project.description}</p>
              {project.url ? (
                <a href={project.url} target="_blank" rel="noreferrer" className="mb-2 inline-flex w-fit max-w-full items-center gap-1.5 truncate text-[12.5px] font-medium text-[#2f3bb8] hover:underline">
                  🔗 {displayUrl(project.url)} ↗
                </a>
              ) : (
                <span className="mb-2 text-[12px] text-mute italic">Aucun lien de site</span>
              )}
              <div className="flex flex-wrap gap-2">
                <button className="cursor-pointer rounded-lg border border-violet/15 bg-white px-3 py-1.5 font-sora text-xs font-medium text-ink-2 transition hover:border-violet/40 hover:text-violet" onClick={() => openEdit(project)}>Modifier</button>
                <button className="cursor-pointer rounded-lg border border-[#f3c0cc] bg-white px-3 py-1.5 font-sora text-xs font-medium text-[#c2244a] transition hover:bg-[#ffe9ee]" onClick={() => handleDelete(project.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-night/60 p-6 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form className="grid max-h-[90vh] w-full max-w-[520px] gap-4 overflow-y-auto rounded-[24px] bg-white p-7 font-sora" onSubmit={handleSubmit}>
            <h2 className="font-sora text-xl font-bold text-ink">{editingId ? 'Modifier le projet' : 'Nouveau projet'}</h2>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Nom
              <input className="mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Catégorie
              <input className="mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50"
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Ex: Site vitrine"
              />
            </label>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Description
              <textarea className="mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Lien du site <span className="font-normal text-mute">(optionnel)</span>
              <input className="mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50"
                type="text"
                inputMode="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://monsite.com"
              />
              <span className="mt-1 block text-[11px] font-normal text-mute">Le bouton « Voir le projet » du site ouvrira ce lien.</span>
            </label>

            <label className="block text-[12.5px] font-semibold text-ink-2">
              Image {editingId ? '(laisser vide pour garder l’actuelle)' : ''}
              <input className="mt-1.5 w-full rounded-xl border border-violet/15 bg-white px-3.5 py-2.5 font-sora text-sm text-ink outline-none focus:border-violet/50"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {formError && <p className="rounded-xl bg-[#ffe9ee] px-4 py-3 text-[13px] text-[#c2244a]">{formError}</p>}

            <div className="mt-2 flex justify-end gap-3">
              <button type="button" className="inline-flex cursor-pointer items-center justify-center rounded-full border border-violet/25 bg-white px-5 py-2.5 font-sora text-[13px] font-semibold text-ink-2 transition hover:border-violet/50" onClick={closeForm}>
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

export default AdminProjects
