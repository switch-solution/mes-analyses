"use client";
import type { getMyClientType } from "@/src/helpers/type";
export default function ChangeClient({ client }: { client: getMyClientType }) {
    console.log(client)
    return (
        <div>
            <h1>ChangeClient</h1>
        </div>
    )
}