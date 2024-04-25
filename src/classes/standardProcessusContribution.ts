import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { ContributionCreateSchema, ContributionEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusContribution implements IProcessus {
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
        const bank = await prisma.project_Contribution.findUniqueOrThrow({
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
            const { slug, clientSlug, processusSlug, projectSlug, id, label, description, base, baseType, rateEmployee, rateTypeEmployer, rateEmployer, rateTypeEmployee } = ContributionEditSchema.parse(values)

            const contributionSlug = await prisma.project_Contribution.findUnique({
                where: {
                    slug
                }
            })

            if (!contributionSlug) {
                throw new Error("La rubrique n'existe pas")
            }


            await prisma.project_Contribution.update({
                where: {
                    slug
                },
                data: {
                    id,
                    label,
                    description,
                    base,
                    baseType,
                    rateTypeEmployee,
                    rateTypeEmployer,
                    rateEmployer,
                    rateEmployee,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                }
            })

            //Add history
            const countHistory = await prisma.project_Contribution_Archived.count({
                where: {
                    id: contributionSlug.id,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Contribution_Archived.create({
                data: {
                    id: contributionSlug.id,
                    label: contributionSlug.label,
                    description: contributionSlug.description,
                    base: contributionSlug.base,
                    baseType: contributionSlug.baseType,
                    rateTypeEmployee: contributionSlug.rateTypeEmployee,
                    rateTypeEmployer: contributionSlug.rateTypeEmployer,
                    rateEmployer: contributionSlug.rateEmployer,
                    rateEmployee: contributionSlug.rateEmployee,
                    isApproved: contributionSlug.isApproved,
                    status: contributionSlug.status,
                    isOpen: contributionSlug.isOpen,
                    isPending: contributionSlug.isPending,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                    createdBy: contributionSlug.createdBy,
                    clientId: clientId,
                    version: countHistory + 1
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
        const societyExist = await prisma.project_Contribution.findFirst({
            where: {
                id: value,
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
            const { id, label, description, clientSlug, processusSlug, rateEmployee, rateEmployer, rateTypeEmployee, rateTypeEmployer, base, baseType } = ContributionCreateSchema.parse(values)
            try {
                const count = await prisma.project_Contribution.count()
                await prisma.project_Contribution.create({
                    data: {
                        id,
                        label,
                        rateEmployee,
                        rateEmployer,
                        rateTypeEmployee,
                        rateTypeEmployer,
                        base,
                        baseType,
                        description,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Salary-${count + 1}`)
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

        const contributionList = await prisma.project_Contribution.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const salarys = contributionList.map((contribution) => {
            return {
                id: contribution.id,
                label: contribution.label,
                slug: contribution.slug,
                status: contribution.status,
            }
        })
        return salarys

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
                await prisma.project_Contribution.updateMany({
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
                throw new Error('Erreur lors de la mise à jour des rubriques de cotisation')
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
                            Project_Contribution: true
                        }
                    }
                }
            })


            const validationRow = userValidator.map((user) => {
                return (
                    user.project.Project_Contribution.map((contribution) => {
                        return {
                            userId: user.userId,
                            rowSlug: contribution.slug,
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            softwareLabel: projectExist.softwareLabel,
                            processusSlug: processusExist.slug,
                            projectSlug: projectSlug,
                            clientSlug: clientSlug,
                            label: contribution.label,
                            theme: 'Rubrique de cotisation',
                            description: 'Validation des rubriques de cotisation',
                        }
                    }))


            }).flat(1)

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
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const salaryList = await prisma.project_Contribution.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_Contribution_Archived: true
                }
            })
            const datas = salaryList.map((contribution) => {
                return {
                    id: contribution.id,
                    label: contribution.label,
                    rateEmployee: contribution.rateEmployee,
                    rateEmployer: contribution.rateEmployer,
                    rateTypeEmployee: contribution.rateTypeEmployee,
                    rateTypeEmployer: contribution.rateTypeEmployer,
                    base: contribution.base,
                    baseType: contribution.baseType,
                    description: contribution.description,
                    status: contribution.status,

                }
            })

            const archived = salaryList.map((salary) => {
                return salary.Project_Contribution_Archived.map((archived) => {
                    return {
                        id: archived.id,
                        label: archived.label,
                        rateEmployee: archived.rateEmployee,
                        rateEmployer: archived.rateEmployer,
                        rateTypeEmployee: archived.rateTypeEmployee,
                        rateTypeEmployer: archived.rateTypeEmployer,
                        base: archived.base,
                        baseType: archived.baseType,
                        description: archived.description,
                        status: archived.status,
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