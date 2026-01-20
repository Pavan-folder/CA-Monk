import { useState } from 'react'
import { BlogList } from './components/BlogList'
import { BlogDetail } from './components/BlogDetail'
import { BlogForm } from './components/BlogForm'
import { Button } from './components/ui/button'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id)
    setShowForm(false)
  }

  const handleCreateBlog = () => {
    setShowForm(true)
    setSelectedBlogId(null)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
              <span className="text-sm font-bold text-gray-900">CA MONK</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Tools</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Practice</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Events</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Job Board</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Points</a>
            </nav>
            <Button onClick={handleCreateBlog} className="bg-purple-600 hover:bg-purple-700">Create Blog</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">CA Monk Blog</h1>
          <p className="text-lg text-gray-600">Stay updated with the latest trends in finance, accounting, and career growth</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
            <BlogList onSelectBlog={handleSelectBlog} />
          </div>
          <div className="col-span-3">
            {showForm ? (
              <BlogForm onClose={handleCloseForm} />
            ) : (
              <BlogDetail blogId={selectedBlogId} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-sm font-bold">C</div>
                <span className="font-bold">CA MONK</span>
              </div>
              <p className="text-sm">Empowering the next generation of financial leaders with tools, community, and knowledge.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Webinars</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">PLATFORM</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Job Board</a></li>
                <li><a href="#" className="hover:text-white">Practice Tests</a></li>
                <li><a href="#" className="hover:text-white">Mentorship</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>© 2024 CA Monk. All rights reserved. <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
