import { UserMenu } from "@/src/features/auth/UserMenu";
export default function NavBar() {
    return (
        <nav className="flex flex-row w-full justify-between items-center" aria-label="navbar">
            <UserMenu />
        </nav>
    )

}

