import {
    Cloud,
    Book,
    Github,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Home,
    User,
    Paperclip,
    UserPlus,
    Users,
    Menu,
    FolderKanban,
    FolderPlus,
    Cog,
    FormInput
} from "lucide-react"
import { LogoutButton } from "./LogoutButton";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { userRole } from '@/src/query/security.query';
import { getMyClientActive } from "@/src/query/client.query";
export const UserMenu = async () => {
    const role = await userRole()
    const slug = await getMyClientActive()
    return (
        <DropdownMenu aria-label="menu">
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><Menu /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mon menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Home className="mr-2 h-4 w-4" />
                        <span><Link href={`/home`}>Accueil</Link></span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span><Link href={`/profile`}>Profil</Link></span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <FolderKanban className="mr-2 h-4 w-4" />
                            <span>Mes projets</span>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <FolderKanban className="mr-2 h-4 w-4" />
                                        <span><Link href={`/client/${slug}/project`}>Voir mes projets</Link></span>
                                    </DropdownMenuItem>
                                    {role?.isEditorClient &&
                                        <DropdownMenuItem>
                                            <FolderPlus className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/project/create`}>Créer un nouveau projet</Link></span>
                                        </DropdownMenuItem>
                                    }
                                    <DropdownMenuSeparator />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSubTrigger>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <FolderKanban className="mr-2 h-4 w-4" />
                                <span>Client</span>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Cog className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}`}>Voir ma fiche</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Cog className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/administrator/edit`}>Editer ma fiche</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Cog className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/administrator`}>Gérer mon compte</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSubTrigger>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <FolderKanban className="mr-2 h-4 w-4" />
                                <span>Editeur</span>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Cog className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/editor`}>Ouvrir l&apos;editeur</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Book className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/editor/book/create`}>Créer un nouveau livre</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <FormInput className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/editor/component/create`}>Créer un nouveau composant</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <FormInput className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/editor/item/create`}>Créer une nouvelle rubrique</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <FormInput className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/editor/constant/create`}>Créer une nouvelle constante</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Paperclip className="mr-2 h-4 w-4" />
                                            <span><Link href={`/client/${slug}/editor/attachment/create`}>Créer une PJ à fournir</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSubTrigger>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            <Cloud className="mr-2 h-4 w-4" />
                            <span><Link href={`/administrator`}>Administrateur</Link></span>
                        </DropdownMenuItem>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span><Link href={`https://github.com/switch-solution/mes-analyses`}>Github</Link></span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span><Link href={`/support`}>Support</Link></span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span><LogoutButton /></span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}


