import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreateClassificationSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusQualification implements IProcessus {
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
        const qualification = await prisma.project_Qualification.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return qualification as T

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
        const coeffExist = await prisma.project_Niveau.findFirst({
            where: {
                id: value,
                softwareLabel,
                projectLabel,
                clientId
            }
        })
        if (coeffExist) {
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
            const { idcc, id, label, clientSlug, projectSlug, processusSlug } = CreateClassificationSchema.parse(values)

            const idccExist = await prisma.project_Idcc.findFirst({
                where: {
                    idcc,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (!idccExist) {
                throw new Error("L'idcc n'existe pas")
            }

            try {
                const count = await prisma.project_Qualification.count()
                await prisma.project_Qualification.create({
                    data: {
                        idcc,
                        id,
                        label,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Qualification-${count + 1}`)
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

        const qualificationList = await prisma.project_Qualification.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const qualifications = qualificationList.map((qualification) => {
            return {
                id: qualification.idcc,
                label: qualification.label,
                slug: qualification.slug,
                status: qualification.status,
            }
        })
        return qualifications

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
            const qualifs = await prisma.project_Qualification.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = qualifs.map((quali) => {
                return {
                    id: quali.id,
                    label: quali.label,
                    status: quali.status,
                    createdAt: quali.createdAt
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