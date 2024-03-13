import { UserMenu } from "@/src/features/auth/UserMenu";
export default function NavBar() {
    return (
        <nav className="flex w-full flex-row items-center justify-between" aria-label="navbar">
            <UserMenu />
        </nav>
    )

}

