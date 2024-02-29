import { UserMenu } from "@/src/features/auth/UserMenu";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import UserAvatar from "@/components/layout/userAvatar";
export default function NavBar() {
    return (
        <nav className="flex flex-row w-full justify-between items-center" aria-label="navbar">
            <UserMenu />
            <div className="flex justify-end space-x-4">
                <ThemeToggle />
                <UserAvatar />
            </div>

        </nav>
    )

}

