import { ThemeToggle } from "@/src/theme/ThemeToggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { LogoutButton } from "@/src/features/auth/LogoutButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Home,
    LineChart,
    Settings,
    Building2,
    Users2,
    PanelLeft,
    MessageCircle,
    Pencil,
    Workflow,
    Check
} from "lucide-react"
import { User } from "@/src/classes/user"
import { getAuthSession } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function NavBar() {
    const session = await getAuthSession()
    if (!session) {
        redirect("/api/auth/signin")
    }
    const userId = session.user.id
    if (!userId) {
        throw new Error("ID utilisateur manquant")
    }
    const user = new User(userId)
    const userIsSetup = await user.userIsSetup()
    if (!userIsSetup) {
        redirect("/setup/cgv")
    }
    const client = await user.getMyClientActive()
    if (!client) {
        throw new Error("Client manquant")
    }

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <TooltipProvider>
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/home"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Home className="size-5" />
                                    <span className="sr-only">Accueil</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Accueil</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`/client/${client.clientSlug}/administration`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Building2 className="size-5" />
                                    <span className="sr-only">Client</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Client</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`/client/${client.clientSlug}/editor`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Pencil className="size-5" />
                                    <span className="sr-only">Editeur</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Editeur</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`/client/${client.clientSlug}/workflow`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Workflow className="size-5" />
                                    <span className="sr-only">Validation</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Validation</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`/client/${client.clientSlug}/administration/invitation`}
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Users2 className="size-5" />
                                    <span className="sr-only">Inviter des utilisateurs</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Inviter des utilisateurs</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    scroll={false}
                                    href="/feedback"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <MessageCircle className="size-5" />
                                    <span className="sr-only">Demande amélioration</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Demande amélioration</TooltipContent>
                        </Tooltip>
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        <ThemeToggle />
                                        <span className="sr-only">Thême</span>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="right">Thême</TooltipContent>
                            </Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/profile/"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Settings className="size-5" />
                                    <span className="sr-only">Paramétre</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Paramétre</TooltipContent>
                        </Tooltip>
                        <LogoutButton />

                    </nav>
                </TooltipProvider>
            </aside>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="size-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/home"
                            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Home className="size-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Accueil</span>
                        </Link>
                        <Link
                            href={`/client/${client.clientSlug}/administration`}
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <Building2 className="size-5" />
                            Client
                        </Link>
                        <Link
                            href="/profile/"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="size-5" />
                            Profil
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )

}

