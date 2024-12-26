import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'

export default function CreateBlogPost() {
  const [title, setTitle] = useState({ de: '', en: '' })
  const [content, setContent] = useState({ de: '', en: '' })
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/blog', {
        title,
        content,
        author
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log('Post Created:', response.data)
      // Hier kannst du den Benutzer weiterleiten oder eine Erfolgsmeldung anzeigen
    } catch (err) {
      setError('Fehler beim Erstellen des Blogposts')
      console.error(err)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title-de" className="block mb-2">Title (DE)</label>
          <input
            type="text"
            id="title-de"
            value={title.de}
            onChange={(e) => setTitle({ ...title, de: e.target.value })}
            className="p-2 border border-gray-300 mb-4 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="title-en" className="block mb-2">Title (EN)</label>
          <input
            type="text"
            id="title-en"
            value={title.en}
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
            className="p-2 border border-gray-300 mb-4 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="content-de" className="block mb-2">Content (DE)</label>
          <textarea
            id="content-de"
            value={content.de}
            onChange={(e) => setContent({ ...content, de: e.target.value })}
            className="p-2 border border-gray-300 mb-4 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="content-en" className="block mb-2">Content (EN)</label>
          <textarea
            id="content-en"
            value={content.en}
            onChange={(e) => setContent({ ...content, en: e.target.value })}
            className="p-2 border border-gray-300 mb-4 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block mb-2">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 border border-gray-300 mb-4 w-full"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" variant="primary">Create Post</Button>
      </form>
    </div>
  )
}
