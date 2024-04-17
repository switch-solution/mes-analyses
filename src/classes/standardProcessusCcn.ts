import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreateIdccSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusCcn implements IProcessus {
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

    async read(slug: string): Promise<{}> {
        const job = await prisma.idcc.findUniqueOrThrow({
            where: {
                code: slug
            }
        })
        return job

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
    async valueExist({
        value,
        clientId,
        projectLabel,
        softwareLabel
    }: {
        value: string,
        clientId: string,
        projectLabel: string,
        softwareLabel: string
    }) {
        const idccExist = await prisma.idcc.findFirst({
            where: {
                code: value,
            }
        })
        if (idccExist) {
            return true
        }
        return false
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
            const { idcc, clientSlug, projectSlug, processusSlug } = CreateIdccSchema.parse(values)

            const idccExist = await prisma.project_Idcc.findFirst({
                where: {
                    idcc,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (idccExist) {
                throw new Error("L'idcc existe déjà")
            }
            const idccDetail = await prisma.idcc.findUniqueOrThrow({
                where: {
                    code: idcc
                }
            })
            try {
                const count = await prisma.project_Idcc.count()
                await prisma.project_Idcc.create({
                    data: {
                        idcc,
                        label: idccDetail.label,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Idcc-${count + 1}`)
                    }

                })
            } catch (err: unknown) {
                console.error(err)
                throw new Error(err as string)
            }



            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }


    }
    async delete(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async dataTable() {

        const idccList = await prisma.project_Idcc.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const idcc = idccList.map((ccn) => {
            return {
                id: ccn.idcc,
                label: ccn.label,
                slug: ccn.slug,
                status: ccn.status,
            }
        })
        return idcc

    }
    parentElement(slug: string): Promise<{ id: string; label: string; slug: string; status: string; type: string; }[]> {

        throw new Error("Method not implemented.")
    }
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const idccs = await prisma.project_Idcc.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = idccs.map((idcc) => {
                return {
                    id: idcc.idcc,
                    label: idcc.label,
                    status: idcc.status,
                    createdAt: idcc.createdAt
                }
            })



            const inputsList = await prisma.processus.findUniqueOrThrow({
                where: {
                    slug: this.processusSlug,
                },
                include: {
                    Form: {
                        where: {
                            isCreate: true,

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