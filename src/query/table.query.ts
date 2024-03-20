import { prisma } from "@/lib/prisma";
import { getCountAllSoftwareComponent } from "./software_component.query";
import { getSoftwareBySlug } from "./software.query";
import { syncGenerateSlug } from "../helpers/generateSlug";
export const copyTable = async (softwareSlug: string) => {
    try {
        const softwareExist = await getSoftwareBySlug(softwareSlug)
        const countComponentTable = await getCountAllSoftwareComponent()
        let countTable = countComponentTable
        const tableList = await prisma.table.findMany({
            include: {
                Table_Column: {
                    include: {
                        Table_Column_Value: true
                    }
                }
            }
        })
        const tables = tableList.map(table => {
            countTable = countTable + 1
            return {
                id: table.id,
                status: "actif",
                description: table.description ? table.description : "",
                version: 1,
                type: table.type,
                label: table.label,
                isTable: true,
                createdBy: table.createdBy,
                softwareLabel: softwareExist.label,
                clientId: softwareExist.clientId,
                slug: syncGenerateSlug(`Table-${countTable}-${table.label}`),
            }

        })
        await prisma.software_Component.createMany({
            data: tables
        })
        let countColumn = await prisma.software_Table_Column.count()
        const columns = tableList.map(table => {
            return (
                table.Table_Column.map(column => {
                    countColumn = countColumn + 1
                    return {
                        id: column.id,
                        label: table.label,
                        tableId: table.id,
                        componentLabel: table.label,
                        componentType: table.type,
                        softwareLabel: softwareExist.label,
                        clientId: softwareExist.clientId,
                        slug: syncGenerateSlug(`Column-${countColumn}-${column.label}`)
                    }

                })
            )

        }).flat(1)
        await prisma.software_Table_Column.createMany({
            data: columns
        });
        let countValue = await prisma.software_Table_Value.count()

        const values = tableList.map(table => {
            return (
                table.Table_Column.map(column => {
                    return (
                        column.Table_Column_Value.map(value => {
                            countValue = countValue + 1
                            return {
                                id: value.id,
                                tableId: table.id,
                                row: value.row,
                                value: value.value,
                                columnId: column.id,
                                componentLabel: table.label,
                                componentType: table.type,
                                softwareLabel: softwareExist.label,
                                clientId: softwareExist.clientId,
                                slug: syncGenerateSlug(`Value-${countValue}-${value.value}`)
                            }
                        })
                    )
                }

                )
            )
        }).flat(2)
        await prisma.software_Table_Value.createMany({
            data: values
        })
        return

    } catch (err) {
        console.error(err)
        throw new Error('Erreur de recopie des tables')
    }

}
