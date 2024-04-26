"use client";
import Link from "next/link"

export default function NavBarProfil({ menu }: { menu: 'Information' | 'Sécurité' | 'CGV' | 'Environnemment' }) {
    return (
        <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <Link href="/profile" className={menu === 'Information' ? "font-semibold text-primary" : ""} > Mes informations</Link>
            <Link href="/profile/security" className={menu === 'Sécurité' ? "font-semibold text-primary" : ""}>Securité</Link>
            <Link href="/profile/cgv" className={menu === 'CGV' ? "font-semibold text-primary" : ""}>CGV</Link>
            <Link href="/profile/default" className={menu === 'Environnemment' ? "font-semibold text-primary" : ""}>Environnement</Link>
        </nav>
    )

}