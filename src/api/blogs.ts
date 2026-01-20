import type { Blog, NewBlog } from '@/types/blog'

const API_BASE = 'http://localhost:3001'

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${API_BASE}/blogs`)
  if (!response.ok) {
    throw new Error('Failed to fetch blogs')
  }
  return response.json()
}

export const getBlog = async (id: string): Promise<Blog> => {
  const response = await fetch(`${API_BASE}/blogs/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch blog')
  }
  return response.json()
}

export const createBlog = async (newBlog: NewBlog): Promise<Blog> => {
  const response = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newBlog,
      id: Date.now().toString(), // simple id generation
      date: new Date().toISOString(),
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create blog')
  }
  return response.json()
}
