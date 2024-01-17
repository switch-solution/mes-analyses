import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import { Header } from '@/src/features/layout/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className='h-full'>
      <body className={clsx(inter.className, 'bg-background h-full')}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Header />
          <div className='flex flex-col'>
            {children}

          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
