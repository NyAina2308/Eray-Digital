import { API_URL } from '../lib/api'

export type ContactMessage = {
  id: string
  name: string
  email: string
  service: string
  delay: string
  message: string
  createdAt: string
  read: boolean
}

export type AdminProject = {
  id: string
  name: string
  category: string
  description: string
  imageUrl: string
  createdAt: string
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

async function parseOrThrow(res: Response) {
  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.error || `Erreur ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

// ---- Messages ----

export function fetchMessages(token: string): Promise<ContactMessage[]> {
  return fetch(`${API_URL}/api/contact`, { headers: authHeaders(token) }).then(parseOrThrow)
}

export function setMessageRead(token: string, id: string, read: boolean): Promise<ContactMessage> {
  return fetch(`${API_URL}/api/contact/${id}`, {
    method: 'PATCH',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ read }),
  }).then(parseOrThrow)
}

export function deleteMessage(token: string, id: string): Promise<null> {
  return fetch(`${API_URL}/api/contact/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(parseOrThrow)
}

// ---- Projects ----

export function fetchProjects(): Promise<AdminProject[]> {
  return fetch(`${API_URL}/api/projects`).then(parseOrThrow)
}

export type ProjectInput = {
  name: string
  category: string
  description: string
  imageFile?: File | null
}

function toFormData(input: ProjectInput) {
  const fd = new FormData()
  fd.set('name', input.name)
  fd.set('category', input.category)
  fd.set('description', input.description)
  if (input.imageFile) fd.set('image', input.imageFile)
  return fd
}

export function createProject(token: string, input: ProjectInput): Promise<AdminProject> {
  return fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: authHeaders(token),
    body: toFormData(input),
  }).then(parseOrThrow)
}

export function updateProject(token: string, id: string, input: ProjectInput): Promise<AdminProject> {
  return fetch(`${API_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: toFormData(input),
  }).then(parseOrThrow)
}

export function deleteProject(token: string, id: string): Promise<null> {
  return fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(parseOrThrow)
}

export function resolveImageUrl(imageUrl: string) {
  return imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`
}
