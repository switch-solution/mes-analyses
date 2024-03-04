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
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/src/theme/ThemeToggle";
import UserAvatar from "@/components/layout/userAvatar";
import Link from "next/link";
import { userRole } from '@/src/query/security.query';
import { getMyClientActive } from "@/src/query/client.query";
export const UserMenu = async () => {
    const clientSlug = await getMyClientActive()
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger> <Link href={`/home`}>Accueil</Link></MenubarTrigger>
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
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Créer</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><Link href={`/client/${clientSlug}/administrator/software`}>Logiciels</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/administrator/user`}>Utilisateur</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/administrator/invoice`}>Facture</Link></MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Editeur</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem><Link href={`/client/${clientSlug}/editor/`}>Consulter</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/editor/book`}>Livres</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/editor/attachment`}>PJ</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/editor/constant`}>Constante</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/editor/item`}>Rubriques</Link></MenubarItem>
                            <MenubarItem><Link href={`/client/${clientSlug}/editor/component`}>Composant</Link></MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Projets</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href={`/client/${clientSlug}/project`}>Ouvrir</Link>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href={`/client/${clientSlug}/project/create`}>Ajouter</Link>
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
                        <MenubarItem><Link href={`/profil/edit`}>Editer</Link></MenubarItem>
                    </MenubarItem>
                    <MenubarItem>
                        <MenubarItem><ThemeToggle /></MenubarItem>
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
                        <MenubarItem><Link href={`/profil/`}>A propos</Link></MenubarItem>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>

    )
}


