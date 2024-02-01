import React from 'react'
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
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { getRoleUser } from '@/src/query/user.query';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export const UserMenu = async () => {
    const session = await getAuthSession()
    const role = await getRoleUser()
    return (

        <DropdownMenu>
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
                                        <span><Link href={`/project`}>Voir mes projets</Link></span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <FolderPlus className="mr-2 h-4 w-4" />
                                        <span><Link href={`/project/create`}>Créer un nouveau projet</Link></span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSubTrigger>
                    </DropdownMenuSub>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span><Link href={`/client`}>Client</Link></span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <FolderKanban className="mr-2 h-4 w-4" />
                                <span>Editeur</span>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Cog className="mr-2 h-4 w-4" />
                                            <span><Link href={`/editor`}>Ouvrir l&apos;editeur</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Book className="mr-2 h-4 w-4" />
                                            <span><Link href={`/editor/book/create`}>Créer un nouveau livre</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <FormInput className="mr-2 h-4 w-4" />
                                            <span><Link href={`/editor/component/create`}>Créer un nouveau composant</Link></span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSubTrigger>
                        </DropdownMenuSub>
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
        </DropdownMenu>)
}


