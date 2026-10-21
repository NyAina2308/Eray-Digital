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
  /** Lien du site en ligne ('' s'il n'y en a pas) */
  url: string
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
  url: string
  imageFile?: File | null
}

function toFormData(input: ProjectInput) {
  const fd = new FormData()
  fd.set('name', input.name)
  fd.set('category', input.category)
  fd.set('description', input.description)
  fd.set('url', input.url)
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

// ---- Testimonials ----

export type Testimonial = {
  id: string
  name: string
  role: string
  text: string
  rating: number
  published: boolean
  createdAt: string
}

export type TestimonialInput = Pick<Testimonial, 'name' | 'role' | 'text' | 'rating' | 'published'>

export function fetchAllTestimonials(token: string): Promise<Testimonial[]> {
  return fetch(`${API_URL}/api/testimonials/all`, { headers: authHeaders(token) }).then(parseOrThrow)
}

export function createTestimonial(token: string, input: TestimonialInput): Promise<Testimonial> {
  return fetch(`${API_URL}/api/testimonials`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then(parseOrThrow)
}

export function updateTestimonial(token: string, id: string, input: Partial<TestimonialInput>): Promise<Testimonial> {
  return fetch(`${API_URL}/api/testimonials/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).then(parseOrThrow)
}

export function deleteTestimonial(token: string, id: string): Promise<null> {
  return fetch(`${API_URL}/api/testimonials/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(parseOrThrow)
}

export function resolveImageUrl(imageUrl: string) {
  return imageUrl.startsWith('http') ? imageUrl : `${API_URL}${imageUrl}`
}
