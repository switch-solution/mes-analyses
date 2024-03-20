"use client";
import { useState } from "react"
import { dsnData } from "@/src/features/actions/dsn/dsn.actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loader";
import type { getInputDsnByProjectSlug } from "@/src/query/project_input.query";
import type { Row } from "@/src/features/actions/dsn/dsn.actions";
import { toast } from "sonner"

export default function UploadFileDsn({ clientSlug, projectSlug, inputs }: { clientSlug: string, projectSlug: string, inputs: getInputDsnByProjectSlug }) {
    const [loading, setLoading] = useState(false)
    const dsnDataWithOption = dsnData.bind(null, projectSlug, clientSlug)
    const parseFile = async (file: File, establishmentId: number) => {
        return new Promise((resolve, reject) => {
            const dsnRows: any = []
            const dsnRowsObject: { code: string, value: string, dsnType: string, componentLabel: string, idRate?: number, date: string, siret: string }[] = []
            let date: string | null = null
            let siren: string | null = null
            let nic: string | null = null
            const reader = new FileReader()
            reader.readAsText(file, 'ISO-8859-1');
            reader.onload = function (e: any) {
                // Le contenu du fichier est dans e.target.result
                let idRate = 0
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
                    //Test si code est dans inputs
                    if (code === "S20.G00.05.005") {
                        date = value
                    }
                    if (code === "S10.G00.01.001") {
                        siren = value
                    }
                    if (code === "S10.G00.01.002") {
                        nic = value
                    }
                    let codeExist = inputs.find((input) => input.dsnItem === code)
                    let set = setRow.has(value)
                    if (codeExist && !set && date && siren && nic) {
                        if (code === "S21.G00.40.040") {
                            idRate += 1
                        }
                        let object = {
                            date,
                            siret: siren + nic,
                            code: code,
                            value: value,
                            dsnType: codeExist.dsnType ? codeExist.dsnType : "",
                            componentLabel: codeExist.componentLabel ? codeExist.componentLabel : "",
                            idRate: codeExist.componentLabel === "Taux AT" ? idRate : 0,
                            establishmentId
                        }
                        dsnRowsObject.push(object)
                        setRow.add(value)
                    }
                }//Fin boucle du fiichier
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
        let establishmentId = 1
        for (let file of files) {
            dsnParse.push(await parseFile(file, establishmentId))
            establishmentId += 1

        }
        //Suppression des doublons
        const flatArray: unknown = dsnParse.flat(1);

        const set = new Set();
        const dsnUnique = []
        for (let row of flatArray as Row[]) {
            if (!set.has(row.value)) {
                dsnUnique.push(row)
                set.add(row.value)
            }
        }
        try {
            await dsnDataWithOption(dsnUnique as Row[]);
        } catch (err) {
            setLoading(false);
            toast(`${err}`, {
                description: new Date().toLocaleDateString(),
                action: {
                    label: "fermer",
                    onClick: () => console.log("fermeture"),
                },
            })
            console.error(err);
        }
        setLoading(false);

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="dsn">DSN</Label>
                <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
                {loading ? <ButtonLoading /> : <Button type="submit">Envoyer</Button>}
            </form>
        </div>

    )

}