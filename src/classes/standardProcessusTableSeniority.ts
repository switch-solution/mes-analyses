import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { ProjectTableCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"

export class StandardProcessusTableSeniority implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    processusSlug: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string, processusSlug: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
        this.processusSlug = processusSlug
    }


    async read<T>(slug: string): Promise<T> {
        const tableSeniority = await prisma.project_Table_Seniority.findUniqueOrThrow({
            where: {
                slug: slug
            },
            include: {
                Project_Table_Seniority_Row: true
            }
        })
        return tableSeniority as T

    }
    async valueExist({ value, clientId, projectLabel, softwareLabel }: { value: string; clientId: string; projectLabel: string; softwareLabel: string; }): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
    async update({
        values,
        userId,
        projectLabel,
        softwareLabel,
        clientId
    }: {
        values: any,
        userId: string,
        projectLabel: string,
        softwareLabel: string,
        clientId: string

    }): Promise<void> {

        throw new Error("Method not implemented.")

    }
    async delete(slug: string): Promise<void> {
        try {
            await prisma.project_Table_Seniority.delete({
                where: {
                    slug
                }
            })
            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    async dataTable() {

        const tableSeniority = await prisma.project_Table_Seniority.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const tables = tableSeniority.map((table) => {
            return {
                id: table.id,
                label: table.label,
                slug: table.slug,
                status: table.status,
            }
        })
        return tables

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        throw new Error("Method not implemented.")
    }
    async approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string }): Promise<void> {
        throw new Error("Method not implemented.")

    }
    async insert({
        values,
        userId,
        projectLabel,
        softwareLabel,
        clientId
    }: {
        values: any,
        userId: string,
        projectLabel: string,
        softwareLabel: string,
        clientId: string

    }): Promise<void> {
        try {
            const { label, idcc, id } = ProjectTableCreateSchema.parse(values)


            const count = await prisma.project_Table_Seniority.count()
            await prisma.project_Table_Seniority.create({
                data: {
                    clientId,
                    idcc,
                    label,
                    id,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                    slug: generateSlug(`Table-anciennete-${count + 1}`)
                }

            })
            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }


    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const tableSeniorityList = await prisma.project_Table_Seniority.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = tableSeniorityList.map((table) => {
                return {
                    id: table.id,
                    label: table.label,
                }
            })

            const inputsList = await prisma.processus.findUniqueOrThrow({
                where: {
                    slug: this.processusSlug,
                },
                include: {
                    Form: {
                        where: {
                            isEdit: true,

                        },
                        include: {
                            Form_Input: {
                                select: {
                                    zodLabel: true,
                                    label: true
                                }
                            }
                        }
                    }
                }
            })
            const inputs = inputsList.Form.map((form) => {
                return form.Form_Input.map((input) => {
                    return {
                        zodLabel: input.zodLabel,
                        label: input.label
                    }
                })
            }).flat(1)
            const extractions = {
                datas: datas,
                archived: [],
                inputs: inputs
            }

            return extractions
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }


}