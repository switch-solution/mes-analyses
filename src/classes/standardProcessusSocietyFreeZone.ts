import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { SocietyFreeZoneCreateSchema, BankEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusSocietyFreeZone implements IProcessus {
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
        const free = await prisma.project_Society_Free_Zone.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return free as T

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
        try {
            const { id, iban, label, slug } = BankEditSchema.parse(values)
            const bankBySlug = await prisma.project_Bank.findUnique({
                where: {
                    slug
                }
            })
            if (!bankBySlug) {
                throw new Error("La banque n'existe pas")
            }
            //update bank
            await prisma.project_Bank.update({
                where: {
                    slug
                },
                data: {
                    iban,
                    label,
                }
            })
            //add history
            const countHistory = await prisma.project_Bank_Archived.count({
                where: {
                    iban: bankBySlug.iban,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Bank_Archived.create({
                data: {
                    id: bankBySlug.id,
                    label: bankBySlug.label,
                    iban: bankBySlug.iban,
                    bic: bankBySlug.bic,
                    status: bankBySlug.status,
                    version: countHistory + 1,
                    clientId,
                    createdBy: userId,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                }

            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }

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
        const societyExist = await prisma.project_Society_Free_Zone.findFirst({
            where: {
                societyId: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (societyExist) {
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
            const { clientSlug, processusSlug, zoneId, societyId } = SocietyFreeZoneCreateSchema.parse(values)

            try {
                const count = await prisma.project_Society_Free_Zone.count()
                await prisma.project_Society_Free_Zone.create({
                    data: {
                        societyId,
                        zoneId,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Society-free-zone-${count + 1}`)
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
    parentElement(slug: string): Promise<{ id: string; label: string; slug: string; status: string; type: string; }[]> {
        throw new Error("Method not implemented.")
    }
    async delete(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async dataTable() {

        const freeZoneList = await prisma.project_Society_Free_Zone.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const free = freeZoneList.map((free) => {
            return {
                id: free.societyId,
                label: free.zoneId,
                slug: free.slug,
                status: free.status,
            }
        })
        return free

    }
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const freeZone = await prisma.project_Society_Free_Zone.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = freeZone.map((free) => {
                return {
                    zoneId: free.zoneId,
                    societyId: free.societyId,
                    status: free.status,
                    createdAt: free.createdAt,
                    updatedAt: free.updatedAt
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