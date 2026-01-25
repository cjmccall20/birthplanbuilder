import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { EditorPageClient } from './EditorPageClient'

export const metadata: Metadata = {
  title: 'Birth Plan Editor | Birth Plan Builder',
  description: 'Create and customize your personalized birth plan',
}

export default function EditorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <EditorPageClient />
      </main>
    </div>
  )
}
