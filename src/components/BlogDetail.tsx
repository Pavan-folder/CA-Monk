import { useBlog } from '@/hooks/useBlog'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface BlogDetailProps {
  blogId: string | null
}

export const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const { data: blog, isLoading, error } = useBlog(blogId || undefined)

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-gray-400">
        <p className="text-lg">Select a blog to view details</p>
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading blog: {error.message}</div>
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

  if (!blog) {
    return <div className="p-4">Blog not found</div>
  }

  const readTime = Math.ceil(blog.content.split(' ').length / 200)

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="rounded-xl overflow-hidden">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-96 object-cover" />
      </div>

      {/* Title and Meta */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-sm font-semibold">
              {blog.category[0]}
            </Badge>
            <span className="text-sm text-gray-600">{readTime} mins read</span>
          </div>
          <span className="text-sm text-gray-600">{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Share Button */}
      <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">Share Article</Button>

      {/* Categories and Meta */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 uppercase">Category</p>
          <p className="font-semibold text-gray-900">{blog.category.join(', ')}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Read Time</p>
          <p className="font-semibold text-gray-900">{readTime} Mins</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase">Date</p>
          <p className="font-semibold text-gray-900">{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
        <p className="text-gray-700 leading-relaxed">{blog.description}</p>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        {blog.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.trim().startsWith('•')) {
            const items = paragraph.split('\n').filter((item) => item.trim().startsWith('•'))
            return (
              <ul key={index} className="list-disc list-inside space-y-2 text-gray-700">
                {items.map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {item.replace(/^•\s*/, '')}
                  </li>
                ))}
              </ul>
            )
          }
          return (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          )
        })}
      </div>

      {/* Author Section */}
      {blog.id === '1' && (
        <div className="border-t pt-6 mt-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-semibold text-gray-900">Written by Arjun Mehta</p>
              <p className="text-sm text-gray-600">Senior Financial Analyst</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button variant="outline" size="sm">👍</Button>
            <Button variant="outline" size="sm">💬</Button>
          </div>
        </div>
      )}
    </div>
  )
}
