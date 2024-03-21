//Explication scroll={false} https://github.com/shadcn-ui/ui/issues/1355
"use client";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

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
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export const UserMenu = ({ clientSlug, softwareSlug }: { clientSlug: string, softwareSlug: string }) => {


    return (
        <>

            <Menubar className="hidden max-w-full lg:flex">
                <MenubarMenu>
                    <MenubarTrigger> <Link href={`/feedback`} scroll={false}>Feedback</Link></MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Client</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <Link href={`/client/${clientSlug}`}>Ouvrir</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href={`/client/${clientSlug}/administrator/edit`}>Editer</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href={`/client/${clientSlug}/administrator/user/create`}>Inviter un utilisateur</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href={`/client/${clientSlug}/administrator/user/create`}>S&apos;abonner</Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Créer</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem><Link href={`/client/${clientSlug}/administrator/software`}>Logiciels</Link></MenubarItem>
                                <MenubarItem><Link href={`/client/${clientSlug}/administrator/user`}>Utilisateur</Link></MenubarItem>
                                <MenubarItem><Link href={`/client/${clientSlug}/administrator/invoice`}>Facture</Link></MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSub>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Editeur</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}`}>Ouvrir</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/form`}>Formulaire</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/textarea`}>Zone de texte</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/image`}>Image</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/table`}>Table</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/book`}>Livres</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/attachment`}>PJ</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/constant`}>Constante</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/item`}>Rubriques</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/component`}>Composant</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/table`}>Table</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/compensation`}>Maintien des salaires</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/absence`}>Absences</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/editor/${softwareSlug}/accumulation`}>Cumul de paie</Link></MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Projets</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <Link href={`/client/${clientSlug}/project`}>Voir mes projets</Link>
                        </MenubarItem>
                        <MenubarItem>
                            <Link href={`/client/${clientSlug}/project/create`} scroll={false}>Créer un nouveau projet</Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Profil</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <MenubarItem><Link href={`/profil/`}>Ouvrir</Link></MenubarItem>
                        </MenubarItem>
                        <MenubarItem>
                            <MenubarItem><Link href={`/profil/edit`} scroll={false}>Editer</Link></MenubarItem>
                        </MenubarItem>
                        <MenubarItem>
                            <MenubarItem><Link href={`/profil/default`} scroll={false}>Environnement</Link></MenubarItem>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Aide</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <MenubarItem><Link href={`/profil/`}>Documentation</Link></MenubarItem>
                        </MenubarItem>
                        <MenubarItem>
                            <MenubarItem><Link href={`/about/`} scroll={false} >A propos</Link></MenubarItem>
                        </MenubarItem>
                        <MenubarItem>
                            <MenubarItem><Link href={`/about/indicator`} scroll={false} >Statistique de la base de donnéees</Link></MenubarItem>
                        </MenubarItem>
                        <MenubarItem>
                            <MenubarItem><Link href={`https://github.com/switch-solution/mes-analyses`} scroll={false} >Github</Link></MenubarItem>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="sm:hidden">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User className="mr-2 size-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard className="mr-2 size-4" />
                            <span>Billing</span>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 size-4" />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Keyboard className="mr-2 size-4" />
                            <span>Keyboard shortcuts</span>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Users className="mr-2 size-4" />
                            <span>Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPlus className="mr-2 size-4" />
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
                        <span>GitHub</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>



        </>

    )
}


