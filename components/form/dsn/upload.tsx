"use client";
import { useState } from "react"
import { dsnData } from "@/src/features/actions/dsn/dsn.actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loader";
import type { getDsnStructure } from "@/src/query/dsn.query";
import type { Row } from "@/src/features/actions/dsn/dsn.actions";
import { toast } from "sonner"
const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default function UploadFileDsn({ clientSlug, projectSlug, dsnStructure, processusSlug }: { clientSlug: string, projectSlug: string, dsnStructure: getDsnStructure, processusSlug: string }) {
    const [loading, setLoading] = useState(false)
    const dsnDataWithOption = dsnData.bind(null, projectSlug, clientSlug, processusSlug)
    const parseFile = async (file: File, random: string) => {
        return new Promise((resolve, reject) => {
            const dsnRows: any = []
            const dsnRowsObject: { id: string, value: string, label: string }[] = []
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
                }
                //On utilisera un set pour éviter les doublons
                const setRow = new Set();
                for (let row of dsnRows) {
                    //On split la structure et la donnée
                    let lineSplit = row.split(`,'`);
                    let code = lineSplit.at(0)
                    let value = lineSplit.at(1).replace(/'/g, "").replace(/\r/g, "")
                    let codeExist = dsnStructure.find((input) => input.id === code)
                    let set = setRow.has(value)
                    if (codeExist && !set) {
                        let object = {
                            id: codeExist.id,
                            label: codeExist.label,
                            value: value,
                            random
                        }
                        dsnRowsObject.push(object)
                        setRow.add(value)
                    }
                }//Fin boucle du fichier
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
        const dsnParse = []

        for (let file of files) {
            let random = getRandomInt(1, 99999999999999)
            let parse = await parseFile(file, random.toString())
            dsnParse.push(parse)
        }
        //Suppression des doublons
        const flatArray = dsnParse.flat(1);
        const set = new Set();
        const dsnUnique: Row[] = [...flatArray] as Row[];

        try {
            await dsnDataWithOption(dsnUnique);
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
    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="dsn">DSN</Label>
            <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
            {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
        </form>

    )

}