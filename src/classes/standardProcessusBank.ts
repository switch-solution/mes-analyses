import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { BankCreateSchema, BankEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusBank implements IProcessus {
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
        const bank = await prisma.project_Bank.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return bank as T

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
        const societyExist = await prisma.project_Bank.findFirst({
            where: {
                iban: value,
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
            const { id, label, iban, bic } = BankCreateSchema.parse(values)

            const bankExist = await prisma.project_Bank.findFirst({
                where: {
                    iban,
                    label,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (bankExist) {
                throw new Error("La banque existe déjà")
            }
            try {
                const count = await prisma.project_Bank.count()
                await prisma.project_Bank.create({
                    data: {
                        id,
                        label,
                        iban,
                        bic,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Bank-${count + 1}`)
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

        const bankList = await prisma.project_Bank.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const banks = bankList.map((bank) => {
            return {
                id: bank.iban,
                label: bank.label,
                slug: bank.slug,
                status: bank.status,
            }
        })
        return banks

    }
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const banks = await prisma.project_Bank.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_Bank_Archived: true
                }
            })
            const datas = banks.map((bank) => {
                return {
                    id: bank.iban,
                    label: bank.label,
                    bic: bank.bic,
                    status: bank.status,
                    createdAt: bank.createdAt,
                    updatedAt: bank.updatedAt
                }
            })

            const archived = banks.map((bank) => {
                return bank.Project_Bank_Archived.map((archived) => {
                    return {
                        id: archived.iban,
                        label: archived.label,
                        bic: archived.bic,
                        status: archived.status,
                        version: archived.version,
                        createdAt: archived.createdAt
                    }
                })

            }).flat(1)


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
                archived: archived,
                inputs: inputs
            }

            return extractions
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }

}