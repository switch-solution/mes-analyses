"use client";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loader";
import type { getDsnStructure } from "@/src/query/dsn.query";
import { DsnParser } from "@fibre44/dsn-parser";
import { toast } from "sonner"
import { dsnData } from "@/src/features/actions/dsn/dsn.actions"
type Dsn = {
    dsnId: string,
    dsnRows: {
        id: string,
        value: string,

    }[],

}

export default function UploadFileDsn({ clientSlug, projectSlug, dsnStructure, processusSlug }: { clientSlug: string, projectSlug: string, dsnStructure: getDsnStructure, processusSlug: string }) {

    const addDSnData: Dsn[] = []

    const [loading, setLoading] = useState(false)

    const parseFile = async (file: File, random: string) => {
        return new Promise((resolve, reject) => {
            const dsnRows: any = []
            const dsnRowsObject: { id: string, value: string }[] = []
            const reader = new FileReader()
            reader.readAsText(file, 'ISO-8859-1');
            reader.onload = function (e: any) {
                // Le contenu du fichier est dans e.target.result
                dsnRows.splice(0, dsnRows.length)
                //On récupère le texte dans la variable dsnRows
                if (e.target && e.target.result) {
                    const text = e.target.result as string; //Une structure DSN ressemble à ca S10.G00.00.003,'11.0.9.0.2'
                    const lines = text.split('\n'); //On split le texte en lignes
                    dsnRows.push(...lines);
                    for (const row of dsnRows) {
                        let lineSplit = row.split(`,'`) //On split chaque ligne en colonnes
                        let id = lineSplit.at(0)
                        let value = lineSplit.at(1).replace(/'/g, "").replace(/\r/g, "")
                        dsnRowsObject.push({
                            id,
                            value
                        });
                    }
                }
                resolve(dsnRowsObject);

            }//Fin boucle lecture
            reader.onerror = function (e) {
                reject(new Error("Erreur de lecture du fichier : " + e));
            };
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const dsn = (e.target as HTMLFormElement).elements[0] as HTMLInputElement
        const files = dsn.files ? Array.from(dsn.files) : []

        for (let file of files) {
            const random = Math.random().toString(36).substring(7)
            const dsnRows = await parseFile(file, random) as { id: string, value: string }[]
            addDSnData.push({ dsnId: random, dsnRows: dsnRows })
        }

        try {
            const extraction = await extractionData(addDSnData)
            const datas = {
                processusSlug: processusSlug,
                clientSlug: clientSlug,
                projectSlug: projectSlug,
                ...extraction
            }
            const societyList = extraction.societyList.map((society) => ({
                siren: society.siren,
                apen: society.apen,
                address1: society.adress1,
                zipCode: society.zipCode,
                city: society.city,
            }))
            const establishmentList = extraction.establishmentList.map((establishment) => ({
                siren: establishment.siren,
                nic: establishment.establishment.nic,
                ape: establishment.establishment.apet,
                address1: establishment.establishment.adress1,
                postalCode: establishment.establishment.zipCode,
                city: establishment.establishment.city,
                legalStatus: establishment.establishment.legalStatus
            }))
            const bankList = extraction.bankList.map((bank) => ({
                contributionFundBIC: bank.contributionFundBIC,
                contributionFundIBAN: bank.contributionFundIBAN
            }))

            const action = await dsnData({
                clientSlug: clientSlug,
                projectSlug: projectSlug,
                processusSlug: processusSlug,
                societyList,
                establishmentList,
                bankList
            });
            if (action?.serverError) {
                setLoading(false);
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                });
            }

        } catch (err) {
            setLoading(false);
            toast(`${err}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            });
            console.error(err);
        }
        setLoading(false);

    }

    const extractionData = async (dsnData: Dsn[]) => {
        const societySet = new Set<string>()
        const establishmentSet = new Set<string>()
        const bankSet = new Set<string>()
        const societyList = []
        const establishmentList = []
        const bankList = []
        for (const dsn of dsnData) {
            const parser = new DsnParser(dsn.dsnRows)
            const society = parser.society
            const establishment = parser.establishment
            const bank = parser.bank
            if (!societySet.has(society.siren)) {
                societySet.add(society.siren)
                societyList.push(society)
            }
            if (!establishmentSet.has(establishment.nic)) {
                establishmentSet.add(establishment.nic)
                establishmentList.push({
                    siren: society.siren,
                    establishment
                })
            }

            for (const bankObject of bank) {
                if (!bankSet.has(bankObject.contributionFundIBAN)) {
                    bankSet.add(bankObject.contributionFundIBAN)
                    bankList.push(bankObject)
                }
            }

        }

        return {
            societyList,
            establishmentList,
            bankList
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="dsn">DSN</Label>
            <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
            {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
        </form>
    )
}