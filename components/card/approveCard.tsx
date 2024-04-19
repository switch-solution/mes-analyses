"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { approveRecord } from "@/src/features/actions/project_data/project_approve_record.actions"
type DataProps = {
    projectLabel: string,
    label: string,
    clientSlug: string,
    rowSlug: string,
    processusSlug: string,
    projectSlug: string,
    slug: string,
    description: string,
    theme: string,
}
import { toast } from "sonner"

export default function ApproveCard({ datas }: { datas: DataProps[] }) {

    return (
        <div className="flex flex-col items-center justify-center">
            {
                datas.length > 0 ? datas.map((data) => {
                    return (
                        <Card key={data.rowSlug}>
                            <CardHeader>
                                <CardTitle>Projet : {data.projectLabel}</CardTitle>
                                <CardDescription>{data.label}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    <li>Thême : {data.theme}.</li>
                                    <li>Description : {data.description}</li>
                                </ul>
                                <Link href={`/client/${data.clientSlug}/project/${data.projectSlug}/processus/${data.processusSlug}/data/${data.rowSlug}/view`}>Consulter l&apos;enregistrement.</Link>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="destructive" onClick={async () => {
                                    const action = await approveRecord({
                                        processusSlug: data.processusSlug,
                                        clientSlug: data.clientSlug,
                                        projectSlug: data.projectSlug,
                                        recordSlug: data.rowSlug,
                                        slug: data.slug,
                                        isApproved: false,
                                        isRefused: true
                                    })
                                    if (action?.serverError) {
                                        toast(`${action.serverError}`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    } else {
                                        toast('Votre refus est enregistrée', {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    }
                                }}>Refuser</Button>
                                <Button onClick={async () => {
                                    const action = await approveRecord({
                                        processusSlug: data.processusSlug,
                                        clientSlug: data.clientSlug,
                                        projectSlug: data.projectSlug,
                                        recordSlug: data.rowSlug,
                                        slug: data.slug,
                                        isApproved: true,
                                        isRefused: false
                                    })
                                    if (action?.serverError) {
                                        toast(`${action.serverError}`, {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    } else {
                                        toast('Votre validation est enregistrée', {
                                            description: new Date().toLocaleDateString(),
                                            action: {
                                                label: "fermer",
                                                onClick: () => console.log("fermeture"),
                                            },
                                        })
                                    }
                                }}>Valider</Button>
                            </CardFooter>
                        </Card>
                    )
                }) : <p>Aucune donnée à valider</p>
            }
        </div>


    )

}