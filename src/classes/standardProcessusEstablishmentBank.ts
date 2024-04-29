import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { EstablishmentBankCreateSchema, EstablishmentBankEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusEstablishmentBank implements IProcessus {
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
        const bank = await prisma.project_Establishment_Bank.findUniqueOrThrow({
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
            const { slug, salary, expsense, contribution, deposit } = EstablishmentBankEditSchema.parse(values)
            const bankBySlug = await prisma.project_Establishment_Bank.findUnique({
                where: {
                    slug
                }
            })
            if (!bankBySlug) {
                throw new Error("La banque n'existe pas")
            }
            //update bank
            await prisma.project_Establishment_Bank.update({
                where: {
                    slug
                },
                data: {
                    salary,
                    expsense,
                    contribution,
                    deposit
                }
            })
            //add history
            const countHistory = await prisma.project_Establishment_Bank_Archived.count({
                where: {
                    iban: bankBySlug.iban,
                    establishmentNic: bankBySlug.establishmentNic,
                    societyId: bankBySlug.societyId,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Establishment_Bank_Archived.create({
                data: {
                    iban: bankBySlug.iban,
                    establishmentNic: bankBySlug.establishmentNic,
                    societyId: bankBySlug.societyId,
                    salary: bankBySlug.salary,
                    expsense: bankBySlug.expsense,
                    deposit: bankBySlug.deposit,
                    contribution: bankBySlug.contribution,
                    version: countHistory + 1,
                    createdAt: bankBySlug.createdAt,
                    updatedAt: bankBySlug.updatedAt,
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
        const bankExist = await prisma.project_Establishment_Bank.findFirst({
            where: {
                iban: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (bankExist) {
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
            const { iban, nic, salary, expsense, deposit, contribution } = EstablishmentBankCreateSchema.parse(values)

            const bankExist = await prisma.project_Bank.findFirst({
                where: {
                    iban,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (!bankExist) {
                throw new Error("La banque n'existe pas")
            }
            const establishment = await prisma.project_Establishment.findFirst({
                where: {
                    clientId,
                    projectLabel,
                    softwareLabel,
                    nic
                }
            })
            if (!establishment) {
                throw new Error("L'établissement n'existe pas")
            }
            try {
                const count = await prisma.project_Establishment_Bank.count()
                await prisma.project_Establishment_Bank.create({
                    data: {
                        establishmentNic: nic,
                        salary,
                        expsense,
                        deposit,
                        contribution,
                        societyId: establishment.societyId,
                        iban,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Establishment-Bank-${count + 1}`)
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

        const bankList = await prisma.project_Establishment_Bank.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const banks = bankList.map((bank) => {
            return {
                id: bank.iban,
                label: bank.establishmentNic,
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
    async extraction(): Promise<{ datas: {}[]; archived: {}[]; inputs: { zodLabel: string; label: string }[] }> {
        try {
            return { datas: [], archived: [], inputs: [] }
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'extraction')
        }
    }

}