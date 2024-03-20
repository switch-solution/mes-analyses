//https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
//https://www.blocknotejs.org/docs/advanced/nextjs
import dynamic from 'next/dynamic'
// Server Component:
const BlokNote = dynamic(() => import('@/components/blocknote/blockNote'), { ssr: false })
import { getTextAreaByComponentSlug } from '@/src/query/software_textArea'
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const textarea = await getTextAreaByComponentSlug(params.componentSlug)
    return (
        <div className='flex w-full flex-col lg:w-1/2'>
            <BlokNote clientSlug={params.clientSlug} componentSlug={params.componentSlug} values={textarea?.value as string} />
        </div>
    )
}