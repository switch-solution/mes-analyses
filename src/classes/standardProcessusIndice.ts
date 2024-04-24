import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreateClassificationSchema, ClassificationEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusIndice implements IProcessus {
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
        const indice = await prisma.project_Indice.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return indice as T

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
            const { clientSlug, processusSlug, projectSlug, slug, idcc, id, label } = ClassificationEditSchema.parse(values)
            const classifExist = await prisma.project_Indice.findUniqueOrThrow({
                where: {
                    slug
                }
            })
            await prisma.project_Indice.update({
                where: {
                    slug
                },
                data: {
                    id,
                    label,

                }
            })
            const count = await prisma.project_Indice_Archived.count({
                where: {
                    projectLabel: classifExist.projectLabel,
                    softwareLabel: classifExist.softwareLabel,
                    clientId: classifExist.clientId,
                    idcc: classifExist.idcc,
                    id: classifExist.id,
                }
            }
            )

            await prisma.project_Indice_Archived.create({
                data: {
                    id: classifExist.id,
                    idcc: classifExist.idcc,
                    isApproved: classifExist.isApproved,
                    isPending: classifExist.isPending,
                    isOpen: classifExist.isOpen,
                    label: classifExist.label,
                    clientId: classifExist.clientId,
                    createdBy: classifExist.createdBy,
                    projectLabel: classifExist.projectLabel,
                    softwareLabel: classifExist.softwareLabel,
                    status: classifExist.status,
                    createdAt: classifExist.createdAt,
                    updatedAt: classifExist.updatedAt,
                    version: count + 1
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
        const coeffExist = await prisma.project_Indice.findFirst({
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
                const count = await prisma.project_Indice.count()
                await prisma.project_Indice.create({
                    data: {
                        idcc,
                        id,
                        label,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Indice-${count + 1}`)
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

        const indiceList = await prisma.project_Indice.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const indices = indiceList.map((indice) => {
            return {
                id: indice.idcc,
                label: indice.label,
                slug: indice.slug,
                status: indice.status,
            }
        })
        return indices

    }
    parentElement(slug: string): Promise<{ id: string; label: string; slug: string; status: string; type: string; }[]> {
        throw new Error("Method not implemented.")
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
                await prisma.project_Indice.updateMany({
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
                            Project_Idcc: {
                                include: {
                                    Project_Indice: true
                                }
                            }
                        }
                    }
                }
            })


            const validationRow = userValidator.map((user) => {
                return (
                    user.project.Project_Idcc.map((idcc) => {
                        return (
                            idcc.Project_Indice.map((indice) => {
                                return {
                                    userId: user.userId,
                                    rowSlug: indice.slug,
                                    clientId: projectExist.clientId,
                                    projectLabel: projectExist.label,
                                    softwareLabel: projectExist.softwareLabel,
                                    processusSlug: processusExist.slug,
                                    projectSlug: projectSlug,
                                    clientSlug: clientSlug,
                                    label: indice.label,
                                    theme: 'Indice',
                                    description: 'Validation de l\'indice',
                                }
                            })
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
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const indices = await prisma.project_Indice.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = indices.map((indice) => {
                return {
                    id: indice.id,
                    label: indice.label,
                    status: indice.status,
                    createdAt: indice.createdAt
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