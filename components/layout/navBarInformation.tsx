import { LoginButton } from "@/src/features/auth/LoginButton"
import Link from "next/link"
export default function NavaBarInformation() {
    return (
        <div className="w-full">
            <ul className="flex w-full flex-row items-center justify-end">
                <li className="ml-2"><Link href={'/features'}>Fonctionnalités</Link></li>
                <li className="ml-2"><Link href={'https://github.com/switch-solution/mes-analyses'}>Github</Link></li>
                <li className="ml-2"><LoginButton label={'Se connecter'} /></li>
            </ul>
        </div>


    )

}