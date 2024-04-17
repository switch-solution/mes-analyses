import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreatePaidLeaveSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusPaidLeave implements IProcessus {
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
        const paidLeave = await prisma.project_Paid_Leave.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return paidLeave

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
        const paidLeaveExit = await prisma.project_Paid_Leave.findFirst({
            where: {
                id: value,
                softwareLabel,
                projectLabel,
                clientId
            }
        })
        if (paidLeaveExit) {
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
            const { clientSlug, projectSlug, processusSlug, id, method, valuation, label, roudingMethod, roudingMethodLeave, valuationLeave, periodEndDate, tableSeniority } = CreatePaidLeaveSchema.parse(values)

            try {
                const count = await prisma.project_Paid_Leave.count()

                await prisma.project_Paid_Leave.create({
                    data: {
                        method,
                        id,
                        valuation,
                        roudingMethod,
                        roudingMethodLeave,
                        valuationLeave,
                        periodEndDate,
                        label,
                        tableSeniority,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`CP-${count + 1}`)
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

        const paidLeaveList = await prisma.project_Paid_Leave.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const coefficient = paidLeaveList.map((paidLeave) => {
            return {
                id: paidLeave.id,
                label: paidLeave.label,
                slug: paidLeave.slug,
                status: paidLeave.status,
            }
        })
        return coefficient

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
    async extraction(): Promise<{ datas: {}[]; archived: {}[]; inputs: { zodLabel: string; label: string }[] }> {
        try {
            throw new Error("Method not implemented.")
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de l\'extraction')
        }
    }

}