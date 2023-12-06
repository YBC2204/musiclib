import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/Supabaseprovider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Harmony Hub',
  description: 'An app to listen to music adfree',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
        <UserProvider>
           <ModalProvider/>
        <Sidebar songs={userSongs}>
        {children}
        </Sidebar>
        </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
