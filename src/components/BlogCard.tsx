import type { Blog } from '@/types/blog'
import { Badge } from '@/components/ui/badge'

interface BlogCardProps {
  blog: Blog
  onClick: () => void
  isSelected?: boolean
}

export const BlogCard = ({ blog, onClick, isSelected }: BlogCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`pb-4 mb-4 border-l-4 pl-4 cursor-pointer transition-all ${
        isSelected ? 'border-l-purple-600 bg-purple-50' : 'border-l-gray-200 hover:border-l-gray-400'
      }`}
    >
      <div className="flex items-start gap-2 mb-2">
        {blog.category.length > 0 && (
          <Badge variant="outline" className="text-xs font-semibold text-purple-600 border-purple-200 bg-purple-50">
            {blog.category[0]}
          </Badge>
        )}
        <span className="text-xs text-gray-500">{new Date(blog.date).toLocaleDateString()}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 text-sm hover:text-purple-600">{blog.title}</h3>
      <p className="text-xs text-gray-600 line-clamp-2">{blog.description}</p>
    </div>
  )
}
