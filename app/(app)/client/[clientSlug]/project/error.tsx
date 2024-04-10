'use client' // Error components must be Client Components
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Frown } from 'lucide-react'
export default function Error({
    error,
}: {
    error: Error & { digest?: string }
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    const router = useRouter()
    return (
        <div className='flex h-3/4 w-full flex-col items-center justify-center'>

            <h2 className='flex flex-row'>Oups tout est cassé! <Frown className='ml-2' /></h2>
            <Button
                onClick={() => router.push('/home')}>
                Revenir au menu principal
            </Button>
        </div>
    )
}