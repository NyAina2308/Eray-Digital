export type Project = {
  id: string
  name: string
  category: string
  description: string
  imageUrl: string
  createdAt: string
}

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

export type Database = {
  projects: Project[]
  messages: ContactMessage[]
}
