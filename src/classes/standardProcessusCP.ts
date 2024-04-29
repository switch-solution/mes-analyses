import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreatePaidLeaveSchema, PaidLeaveEditSchema } from "@/src/helpers/definition";
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

    async read<T>(slug: string): Promise<T> {
        const paidLeave = await prisma.project_Paid_Leave.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return paidLeave as T

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
            const { label, method, valuation, valuationLeave, roudingMethod, roudingMethodLeave, slug } = PaidLeaveEditSchema.parse(values)
            const paidLeaveExist = await prisma.project_Paid_Leave.findUnique({
                where: {
                    slug
                }
            })
            if (!paidLeaveExist) {
                throw new Error("La banque n'existe pas")
            }
            //update bank
            await prisma.project_Paid_Leave.update({
                where: {
                    slug
                },
                data: {
                    label,
                    method,
                    valuation,
                    valuationLeave,
                    roudingMethod,
                    roudingMethodLeave,
                }
            })
            //add history
            const countHistory = await prisma.project_Paid_Leave_Archived.count({
                where: {
                    id: paidLeaveExist.id,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Paid_Leave_Archived.create({
                data: {
                    id: paidLeaveExist.id,
                    method: paidLeaveExist.method,
                    valuation: paidLeaveExist.valuation,
                    valuationLeave: paidLeaveExist.valuationLeave,
                    roudingMethod: paidLeaveExist.roudingMethod,
                    roudingMethodLeave: paidLeaveExist.roudingMethodLeave,
                    periodEndDate: paidLeaveExist.periodEndDate,
                    isApproved: paidLeaveExist.isApproved,
                    status: paidLeaveExist.status,
                    isPending: paidLeaveExist.isPending,
                    isOpen: paidLeaveExist.isOpen,
                    label: paidLeaveExist.label,
                    tableSeniority: paidLeaveExist.tableSeniority,
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
    async approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): Promise<void> {

        try {
            const projectExist = await prisma.project.findUniqueOrThrow({
                where: {
                    slug: projectSlug
                }
            })
            const processusExist = await prisma.processus.findUniqueOrThrow({
                where: {
                    slug: processusSlug
                }
            })
            try {
                await prisma.project_Processus.update({
                    where: {
                        clientId_projectLabel_softwareLabel_id_version: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            softwareLabel: projectExist.softwareLabel,
                            id: processusExist.id,
                            version: processusExist.version
                        }
                    },
                    data: {
                        isOpen: false,
                        isProgress: true
                    }
                })
            } catch (err) {
                console.error(err)
                throw new Error('Erreur lors du passage du processus sur isProgress')
            }
            try {
                //Update record to is pending
                await prisma.project_Paid_Leave.updateMany({
                    where: {
                        projectLabel: projectExist.label,
                        softwareLabel: projectExist.softwareLabel,
                        clientId: projectExist.clientId

                    },
                    data: {
                        isOpen: false,
                        isPending: true
                    }
                })
            } catch (err) {
                console.error(err)
                throw new Error('Erreur lors de la mise à jour des DSN')
            }


            const userValidator = await prisma.userProject.findMany({
                where: {
                    projectClientId: projectExist.clientId,
                    projectLabel: projectExist.label,
                    projectSoftwareLabel: projectExist.softwareLabel,
                    isValidator: true
                },
                include: {
                    project: {
                        include: {
                            Project_Paid_Leave: true
                        }
                    }
                }
            })


            const validationRow = userValidator.map((user) => {
                return (
                    user.project.Project_Paid_Leave.map((cp) => {
                        return (
                            {
                                userId: user.userId,
                                rowSlug: cp.slug,
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                softwareLabel: projectExist.softwareLabel,
                                processusSlug: processusExist.slug,
                                projectSlug: projectSlug,
                                clientSlug: clientSlug,
                                label: cp.label,
                                theme: 'Congés payés',
                                description: 'Validation des congés payés',
                            }


                        )
                    })
                )


            }).flat(2)
            await prisma.project_Approve.createMany({
                data: validationRow

            })

            const nextProcessus = processusExist.order + 1
            const nextProcessusExist = await prisma.project_Processus.findFirst({
                where: {
                    clientId: projectExist.clientId,
                    projectLabel: projectExist.label,
                    softwareLabel: projectExist.softwareLabel,
                    order: nextProcessus
                },
            })
            if (nextProcessusExist) {
                await prisma.project_Processus.update({
                    where: {
                        clientId_projectLabel_softwareLabel_id_version: {
                            clientId: nextProcessusExist.clientId,
                            projectLabel: nextProcessusExist.projectLabel,
                            softwareLabel: nextProcessusExist.softwareLabel,
                            id: nextProcessusExist.id,
                            version: nextProcessusExist.version
                        }

                    },
                    data: {
                        isOpen: true,
                        isPending: false
                    }
                })

            }

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la validation du processus')
        }



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