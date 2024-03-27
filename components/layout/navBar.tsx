import { UserMenu } from "@/src/features/auth/UserMenu";
import { userIsSetup } from "@/src/query/user.query";
import { getMyClientActive } from "@/src/query/user.query";
import { getMySoftwareActive } from "@/src/query/user.query";
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { Bell } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/src/features/auth/LogoutButton";

export default async function NavBar() {
    const isSetup = await userIsSetup()
    let clientSlug = null
    let softwareSlug = null
    if (isSetup) {
        clientSlug = await getMyClientActive()
        softwareSlug = await getMySoftwareActive()
    }

    return (
        <nav className="flex w-full flex-row items-center justify-between lg:justify-start" aria-label="navbar">
            <div className="w-full">
                {isSetup && clientSlug && softwareSlug ? <UserMenu clientSlug={clientSlug} softwareSlug={softwareSlug} /> : undefined}
            </div>
            <div className="flex flex-row items-center">
                <ThemeToggle />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline"><Bell /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Notification</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                <LogoutButton />
            </div>

        </nav>
    )

}

