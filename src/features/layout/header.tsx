import { getAuthSession } from "@/lib/auth";
import { NavBar, NavBarInformation } from "./navBar";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import UserAvatar from "./userAvatar";
export const Header = async () => {
    const session = await getAuthSession()
    return (
        <header className="border-bg border-b-accent flex flex-row items-center justify-end w-full border-b-2 z-10">
            {session ? <><NavBar />
                <UserAvatar />
                <ThemeToggle />
            </> : <NavBarInformation />}

        </header >
    )
}