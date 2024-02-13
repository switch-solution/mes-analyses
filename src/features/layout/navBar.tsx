import { LoginButton } from "../auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import { UserMenu } from "@/src/features/auth/UserMenu";
import Link from "next/link";
import { getMyClient } from "@/src/query/user.query";
import ChangeClient from "@/src/features/layout/changeClient";
export const NavBar = async () => {
    const session = await getAuthSession()
    const client = await getMyClient()
    return (
        <nav className="w-full">
            {session?.user ?
                <>
                    <UserMenu />
                </> : undefined
            }
        </nav>
    )

}

export const NavBarInformation = () => {
    return (
        <div className="w-full">
            <ul className="flex flex-row justify-end items-center w-full">
                <li className="ml-2"><Link href={'/features'}>Fonctionnalités</Link></li>
                <li className="ml-2"><Link href={'https://github.com/switch-solution/mes-analyses'}>Github</Link></li>
                <li className="ml-2"><LoginButton label={'Se connecter'} /></li>
            </ul>
        </div>


    )

}