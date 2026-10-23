export type Project = {
  id: string
  name: string
  category: string
  description: string
  imageUrl: string
  /** Live website of the project ('' when there is none) */
  url: string
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

export type Testimonial = {
  id: string
  name: string
  role: string
  text: string
  rating: number
  published: boolean
  createdAt: string
}

export type Database = {
  projects: Project[]
  messages: ContactMessage[]
  testimonials: Testimonial[]
}
