import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusMutual implements IProcessus {
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
        const mutual = await prisma.project_Mutuelle.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return mutual as T

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
            const mutalExist = await prisma.project_Mutuelle.findUnique({
                where: {
                    slug
                }
            })
            if (!mutalExist) {
                throw new Error("La caisse mutuelle n'existe pas")
            }

            await prisma.project_Mutuelle.update({
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
            const countHistory = await prisma.project_Mutuelle_Archived.count({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Mutuelle_Archived.create({
                data: {
                    address1: mutalExist.address1,
                    address2: mutalExist.address2,
                    address3: mutalExist.address3,
                    address4: mutalExist.address4,
                    postalCode: mutalExist.postalCode,
                    id: mutalExist.id,
                    source: mutalExist.source,
                    status: mutalExist.status,
                    city: mutalExist.city,
                    label: mutalExist.label,
                    country: mutalExist.country,
                    createdBy: mutalExist.createdBy,
                    projectLabel: mutalExist.projectLabel,
                    softwareLabel: mutalExist.softwareLabel,
                    clientId: mutalExist.clientId,
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
        const mutualExist = await prisma.project_Mutuelle.findFirst({
            where: {
                id: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (mutualExist) {
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
            const { clientSlug, processusSlug, projectSlug, ops } = OpsCreateSchema.parse(values)
            const mutual = await getDsnOpsById(ops)
            if (!mutual) {
                throw new Error("La mutuelle n'existe pas")
            }
            const mutualExist = await prisma.project_Mutuelle.findFirst({
                where: {
                    clientId,
                    projectLabel,
                    softwareLabel,

                }

            })
            if (mutualExist) {
                throw new Error('La mutuelle existe déjà')
            }
            const count = await prisma.project_Mutuelle.count()
            await prisma.project_Mutuelle.create({
                data: {
                    clientId,
                    address1: mutual.address1 ? mutual.address1 : '',
                    id: mutual.id,
                    postalCode: mutual.codeZip ? mutual.codeZip : '',
                    city: mutual.city ? mutual.city : '',
                    label: mutual.label ? mutual.label : '',
                    country: 'France',
                    createdBy: userId,
                    projectLabel,
                    softwareLabel,
                    slug: generateSlug(`Mutuelle-${count + 1}`)
                }
            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)

        }

    }
    async delete(slug: string): Promise<void> {
        try {
            await prisma.project_Mutuelle.delete({
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

        const mutualList = await prisma.project_Mutuelle.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const mutuals = mutualList.map((mutual) => {
            return {
                id: mutual.id,
                label: mutual.label,
                slug: mutual.slug,
                status: mutual.status,
            }
        })
        return mutuals

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {
            const mutual = await prisma.project_Mutuelle.findUniqueOrThrow({
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
            const mutualList = [{
                id: mutual.id,
                label: mutual.label,
                slug: mutual.slug,
                status: mutual.status,
                type: "Mutuelle"
            }
            ]
            return mutualList
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
                await prisma.project_Mutuelle.updateMany({
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
                                            Project_Establishment_Mutuelle: {
                                                include: {
                                                    Project_Mutuelle: true

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
                        return (society.Project_Establishment.map((establishment) => {
                            return establishment.Project_Establishment_Mutuelle.map((mutuelle) => {

                                return {
                                    userId: user.userId,
                                    rowSlug: mutuelle.Project_Mutuelle.slug,
                                    clientId: projectExist.clientId,
                                    projectLabel: projectExist.label,
                                    softwareLabel: projectExist.softwareLabel,
                                    processusSlug: processusExist.slug,
                                    projectSlug: projectSlug,
                                    clientSlug: clientSlug,
                                    label: mutuelle.Project_Mutuelle.label,
                                    theme: 'Mutuelle',
                                    description: 'Validation de la mutuelle',
                                }
                            })
                        }))

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
            const mutuelleList = await prisma.project_Mutuelle.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = mutuelleList.map((mutuelle) => {
                return {
                    id: mutuelle.id,
                    label: mutuelle.label,
                    address1: mutuelle.address1,
                    address2: mutuelle.address2,
                    address3: mutuelle.address3,
                    address4: mutuelle.address4,
                    city: mutuelle.city,
                    postalCode: mutuelle.postalCode,
                    status: mutuelle.status,
                    createdAt: mutuelle.createdAt
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