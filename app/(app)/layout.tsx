import type { Metadata } from 'next'
export const dynamic = 'force-dynamic' // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import clsx from 'clsx'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import { Header } from '@/components/layout/header'
const inter = Inter({ subsets: ['latin'] })
import NavBar from '@/components/layout/navBar'
import { Toaster } from "@/components/ui/sonner"
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
    return (
        <html lang="fr" className='h-full' suppressHydrationWarning>
            <body className={clsx(inter.className, 'flex size-full min-h-screen flex-col bg-muted/40')}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <Header>
                        <NavBar />
                    </Header>
                    <main className='flex size-full flex-col items-center'>
                        {children}
                        <Toaster />
                    </main>
                    {modal}
                </ThemeProvider>
            </body>
        </html>
    )
}
