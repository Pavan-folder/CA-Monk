export interface Blog {
  id: string
  title: string
  category: string[]
  description: string
  date: string
  coverImage: string
  content: string
}

export interface NewBlog {
  title: string
  description: string
  content: string
  category: string[]
  coverImage: string
}
