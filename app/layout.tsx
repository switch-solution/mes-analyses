import type { Metadata } from 'next'
export const dynamic = 'force-dynamic' // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import clsx from 'clsx'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import { Header } from '@/components/layout/header'
const inter = Inter({ subsets: ['latin'] })
import NavBar from '@/components/layout/navBar'
import { getAuthSession } from '@/lib/auth'
import { Toaster } from "@/components/ui/sonner"
import { User } from '@/src/classes/user'
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
    const user = new User(session?.user.id ?? '')
    const userIsSetup = await user.userIsSetup()
    console.log('userIsSetup', userIsSetup)
    return (
        <html lang="fr" className='h-full' suppressHydrationWarning>
            <body className={clsx(inter.className, 'flex min-h-screen w-full flex-col bg-muted/40')}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <Header>
                        {session && userIsSetup ? <NavBar /> : undefined}
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
