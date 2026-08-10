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

const EMPTY_FORM = { name: '', category: '', description: '' }

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
    setForm({ name: project.name, category: project.category, description: project.description })
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
    <div className="admin-page">
      <header className="admin-page__header">
        <div>
          <h1>Projets</h1>
          <p>{projects.length} projet{projects.length !== 1 ? 's' : ''} publié{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          + Nouveau projet
        </button>
      </header>

      {error && <p className="contact-form__error">{error}</p>}
      {loading && <p className="admin-empty">Chargement...</p>}

      <div className="admin-projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="admin-project-card">
            <img src={resolveImageUrl(project.imageUrl)} alt={project.name} loading="lazy" />
            <div className="admin-project-card__body">
              <h3>{project.name}</h3>
              <span>{project.category}</span>
              <p>{project.description}</p>
              <div className="admin-message__actions">
                <button onClick={() => openEdit(project)}>Modifier</button>
                <button className="admin-message__delete" onClick={() => handleDelete(project.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="admin-modal" role="dialog" aria-modal="true">
          <form className="admin-modal__card" onSubmit={handleSubmit}>
            <h2>{editingId ? 'Modifier le projet' : 'Nouveau projet'}</h2>

            <label>
              Nom
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label>
              Catégorie
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Ex: Site vitrine"
              />
            </label>

            <label>
              Description
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>

            <label>
              Image {editingId ? '(laisser vide pour garder l’actuelle)' : ''}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </label>

            {formError && <p className="contact-form__error">{formError}</p>}

            <div className="admin-modal__actions">
              <button type="button" className="btn btn-outline" onClick={closeForm}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
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
