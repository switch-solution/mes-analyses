import type { Metadata } from 'next'
export const dynamic = 'force-dynamic' // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import { Header } from '@/components/layout/header'
const inter = Inter({ subsets: ['latin'] })
import NavaBarInformation from '@/components/layout/navBarInformation'
import NavBar from '@/components/layout/navBar'
import { getAuthSession } from '@/lib/auth'
export const metadata: Metadata = {
  title: 'Mes analyses paie',
  description: 'Logiciel de rédaction des cahiers des charges de paie',
}

type LayoutProps = {
  children: React.ReactNode,
  modal?: React.ReactNode
}


export default async function RootLayout({
  children,
  modal
}: LayoutProps) {
  const session = await getAuthSession()
  return (
    <html lang="fr" className='h-full' suppressHydrationWarning>
      <body className={clsx(inter.className, 'bg-background h-full')}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header>
            {session ? <NavBar /> : <NavaBarInformation />}
          </Header>
          <main className='flex flex-col w-full h-full items-center'>
            {children}
          </main>
          {modal}
        </ThemeProvider>

      </body>
    </html>
  )
}
