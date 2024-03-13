"use client";
import { dsnData } from "@/src/features/actions/dsn/dsn.actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import type { getInputDsnByProjectSlug } from "@/src/query/project_input.query";
export default function UploadFileDsn({ clientSlug, projectSlug, inputs }: { clientSlug: string, projectSlug: string, inputs: getInputDsnByProjectSlug }) {


    const dsnDataWithOption = dsnData.bind(null, projectSlug, clientSlug)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dsn = (e.target as HTMLFormElement).elements[0] as HTMLInputElement
        const files = dsn.files ? Array.from(dsn.files) : [] // Convert FileList to Array
        const dsnRows: any = []
        const dsnRowsObject: { code: string, value: string, dsnType: string, componentLabel: string, idRate?: number }[] = []
        for (let file of files) {
            const reader = new FileReader()
            reader.onload = async function (e) {
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
                //On vide le tableau dsnRowsObject
                dsnRowsObject.splice(0, dsnRowsObject.length)
                for (let row of dsnRows) {
                    //On split la structure et la donnée
                    let lineSplit = row.split(`,'`);
                    let code = lineSplit.at(0)
                    let value = lineSplit.at(1).replace(/'/g, "").replace(/\r/g, "")
                    //Test si code est dans inputs
                    let codeExist = inputs.find((input) => input.dsnItem === code)
                    let set = setRow.has(value)
                    if (codeExist && !set) {
                        if (code === "S21.G00.40.040") {
                            idRate += 1
                        }
                        let object = {
                            code: code,
                            value: value,
                            dsnType: codeExist.dsnType ? codeExist.dsnType : "",
                            componentLabel: codeExist.componentLabel ? codeExist.componentLabel : "",
                            idRate: codeExist.componentLabel === "Taux AT" ? idRate : 0
                        }
                        dsnRowsObject.push(object)
                        setRow.add(value)
                    }

                }
                await dsnDataWithOption(dsnRowsObject)
            }

            reader.readAsText(file, 'ISO-8859-1');
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="dsn">DSN</Label>
                <Input id="dsn" name="dsn" type="file" accept=".dsn" required multiple />
                <Button type="submit">Envoyer</Button>
            </form>
        </div>

    )

}