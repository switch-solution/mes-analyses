"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
export default function ButtonBack() {
    const router = useRouter()
    return (
        <Button variant="secondary" onClick={() => router.back()}>Retour</Button>
    )

}