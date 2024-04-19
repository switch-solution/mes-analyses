import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { RateAtCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"

export class StandardProcessusRateAt implements IProcessus {
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
        const rateAt = await prisma.project_Rate_AT.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return rateAt as T

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
            const { clientSlug, processusSlug, projectSlug, label, country, address1, address2, address3, address4, postalCode, city, slug } = OpsEditSchema.parse(values)
            const urssafExist = await prisma.project_URSSAF.findUnique({
                where: {
                    slug
                }
            })
            if (!urssafExist) {
                throw new Error("L'urssaf n'existe pas")
            }

            await prisma.project_URSSAF.update({
                where: {
                    slug

                },
                data: {
                    address1,
                    address2,
                    address3,
                    address4,
                    postalCode,
                    city,
                    label,
                    country,
                }
            })
            const countHistory = await prisma.project_URSSAF_Archived.count({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_URSSAF_Archived.create({
                data: {
                    address1: urssafExist.address1,
                    address2: urssafExist.address2,
                    address3: urssafExist.address3,
                    address4: urssafExist.address4,
                    postalCode: urssafExist.postalCode,
                    id: urssafExist.id,
                    source: urssafExist.source,
                    status: urssafExist.status,
                    city: urssafExist.city,
                    label: urssafExist.label,
                    country: urssafExist.country,
                    createdBy: urssafExist.createdBy,
                    projectLabel: urssafExist.projectLabel,
                    softwareLabel: urssafExist.softwareLabel,
                    clientId: urssafExist.clientId,
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
        const urssafExist = await prisma.project_Rate_AT.findFirst({
            where: {
                id: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (urssafExist) {
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
            const { clientSlug, processusSlug, projectSlug, label, id, order, rate, office } = RateAtCreateSchema.parse(values)

            const count = await prisma.project_Rate_AT.count()
            await prisma.project_Rate_AT.create({
                data: {
                    clientId,
                    id,
                    label,
                    office,
                    order,
                    rate,
                    createdBy: userId,
                    projectLabel,
                    softwareLabel,
                    slug: generateSlug(`rate-at-${count + 1}`)
                }
            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)

        }

    }
    async delete(slug: string): Promise<void> {
        try {
            await prisma.project_URSSAF.delete({
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

        const rateAtList = await prisma.project_Rate_AT.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const rateAt = rateAtList.map((at) => {
            return {
                id: at.id,
                label: at.label,
                slug: at.slug,
                status: at.status,
            }
        })
        return rateAt

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {
            const rateAt = await prisma.project_Rate_AT.findUniqueOrThrow({
                where: {
                    slug
                },
                select: {
                    id: true,
                    label: true,
                    status: true,
                    slug: true
                }
            })
            const rateAtList = [{
                id: rateAt.id,
                label: rateAt.label,
                slug: rateAt.slug,
                status: rateAt.status,
                type: "Taux AT"
            }
            ]
            return rateAtList
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    async approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string }): Promise<void> {
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
                await prisma.project_Rate_AT.updateMany({
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
                            Project_Society: {
                                include: {
                                    Project_Establishment: {
                                        include: {
                                            Project_Establishement_Rate_AT: {
                                                include: {
                                                    Project_Rate_AT: {
                                                        select: {
                                                            slug: true,
                                                            id: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            })


            const validationRow = userValidator.map((user) => {
                return (
                    user.project.Project_Society.map((society) => {
                        return (
                            society.Project_Establishment.map((establishment) => {
                                return establishment.Project_Establishement_Rate_AT.map((rateAt) => {
                                    return {
                                        userId: user.userId,
                                        rowSlug: rateAt.Project_Rate_AT.slug,
                                        clientId: projectExist.clientId,
                                        projectLabel: projectExist.label,
                                        softwareLabel: projectExist.softwareLabel,
                                        processusSlug: processusExist.slug,
                                        projectSlug: projectSlug,
                                        clientSlug: clientSlug,
                                        label: rateAt.Project_Rate_AT.slug,
                                        theme: 'Taux AT',
                                        description: 'Validation du taux AT',
                                    }
                                })

                            })
                        )

                    })

                )


            }).flat(3)
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
            const rateAtList = await prisma.project_Rate_AT.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = rateAtList.map((rateAt) => {
                return {
                    id: rateAt.id,
                    label: rateAt.label,
                    rate: rateAt.rate,
                    office: rateAt.office,
                    order: rateAt.order,
                    status: rateAt.status,
                    createdAt: rateAt.createdAt
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