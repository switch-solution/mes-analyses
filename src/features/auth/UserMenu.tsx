//Explication scroll={false} https://github.com/shadcn-ui/ui/issues/1355
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
import Link from "next/link";
import { getMyClientActive } from "@/src/query/user.query";
import { getMySoftwareActive } from "@/src/query/user.query";
export const UserMenu = async () => {
    const clientSlug = await getMyClientActive()
    const softwareSlug = await getMySoftwareActive()
    return (
        <Menubar className="max-w-full">
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

    )
}


