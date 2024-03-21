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
    Rows4,
    Kanban
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
                        <MenubarItem><Link href={`/client/${clientSlug}/administrator/software`}>Logiciels</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/administrator/user`}>Utilisateur</Link></MenubarItem>
                        <MenubarItem><Link href={`/client/${clientSlug}/administrator/invoice`}>Facture</Link></MenubarItem>

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
                    <Button variant="outline" className=" rounded-none border-none sm:hidden">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Mes options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPlus className="mr-2 size-4" />
                                <span>Client</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <Rows4 className="mr-2 size-4" />
                                        <span><Link href={`/client/${clientSlug}/`}>Ma fiche</Link></span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Kanban className="mr-2 size-4" />
                                <span>Projets</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <Rows4 className="mr-2 size-4" />
                                        <span><Link href={`/client/${clientSlug}/project`}>Mes projets</Link></span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <MessageSquare className="mr-2 size-4" />
                                        <span><Link href={`/client/${clientSlug}/project/create`}>Créer un projet</Link></span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>



        </>

    )
}


