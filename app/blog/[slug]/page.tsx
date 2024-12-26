import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const res = await fetch(`/api/blog/${params.slug}`)  // API-Anfrage für den Blogpost anhand des Slugs
  const post = await res.json()

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-8">{post.date}</p>
      <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Button asChild variant="outline">
        <Link href="/blog">Back to Blog</Link>
      </Button>
    </div>
  )
}
