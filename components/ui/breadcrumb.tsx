
"use client";
import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
    const pathname = usePathname()
    const splitPathname = pathname.split("/")
    const clientSlug = splitPathname[2]
    const projectSlug = splitPathname[4]
    console.log(splitPathname)
    return (
        <div className="flex flex-row w-full">
            {clientSlug && !projectSlug && <Link href={`/client/${clientSlug}`}><span className="flex flex-row"><Home /> Client /</span></Link>}
            {clientSlug && projectSlug && <Link href={`/client/${clientSlug}/project/${projectSlug}`}><span className="flex flex-row"><Home /> Projet /</span></Link>}



        </div>
    )

}