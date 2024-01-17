import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User2 } from "lucide-react";
import { LogoutButton } from "./LogoutButton";
export const UserProfil = async () => {
    const session = await getAuthSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                    {session?.user?.name ? session?.user?.name : ""}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href={'/profile'}>
                        <User2 className="mr-2 h-4 w-4" />
                        Mon profil
                    </Link>
                </DropdownMenuItem>
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}   