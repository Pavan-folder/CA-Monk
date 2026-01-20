import { useState } from 'react'
import { useCreateBlog } from '@/hooks/useCreateBlog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface BlogFormProps {
  onClose: () => void
}

export const BlogForm = ({ onClose }: BlogFormProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const createBlogMutation = useCreateBlog()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const categories = category.split(',').map(c => c.trim()).filter(c => c)
    createBlogMutation.mutate(
      {
        title,
        description,
        content,
        category: categories,
        coverImage,
      },
      {
        onSuccess: () => {
          toast.success('Blog created successfully!')
          onClose()
          // Reset form
          setTitle('')
          setDescription('')
          setContent('')
          setCategory('')
          setCoverImage('')
        },
        onError: (error) => {
          toast.error(`Failed to create blog: ${error.message}`)
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Categories (comma separated)</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. TECH, FINANCE"
              required
            />
          </div>
          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={createBlogMutation.isPending}>
              {createBlogMutation.isPending ? 'Creating...' : 'Create Blog'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
