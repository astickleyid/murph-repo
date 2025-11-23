import { redirect } from 'next/navigation'

import { getBookmarks } from '@/lib/bookmarks'
import { createClient } from '@/lib/supabase/server'

import { BookmarksList } from '@/components/bookmarks-list'

export default async function BookmarksPage() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const bookmarks = await getBookmarks(user.id)

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bookmarked Messages</h1>
        <p className="text-muted-foreground">
          Your saved messages from conversations
        </p>
      </div>
      <BookmarksList bookmarks={bookmarks} />
    </div>
  )
}
