import { UserMenu } from "@/src/features/auth/UserMenu";
export default async function NavBar() {
    return (
        <nav className="flex w-full flex-row items-center justify-between" aria-label="navbar">
            <UserMenu />
        </nav>
    )

}

