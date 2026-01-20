import { useState } from 'react'
import { useBlogs } from '@/hooks/useBlogs'
import { BlogCard } from './BlogCard'
import { Skeleton } from '@/components/ui/skeleton'

interface BlogListProps {
  onSelectBlog: (id: string) => void
}

export const BlogList = ({ onSelectBlog }: BlogListProps) => {
  const { data: blogs, isLoading, error } = useBlogs()
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id)
    onSelectBlog(id)
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading blogs: {error.message}</div>
  }

  return (
    <div className="space-y-0">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full mb-4" />
        ))
      ) : (
        blogs?.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={() => handleSelectBlog(blog.id)}
            isSelected={selectedBlogId === blog.id}
          />
        ))
      )}
    </div>
  )
}
