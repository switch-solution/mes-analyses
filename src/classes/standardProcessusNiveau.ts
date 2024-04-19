import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { CreateClassificationSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusNiveau implements IProcessus {
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
        const niveau = await prisma.project_Niveau.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return niveau as T

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
                const count = await prisma.project_Niveau.count()
                await prisma.project_Niveau.create({
                    data: {
                        idcc,
                        id,
                        label,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Niveau-${count + 1}`)
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

        const niveauList = await prisma.project_Niveau.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const niveau = niveauList.map((niveau) => {
            return {
                id: niveau.idcc,
                label: niveau.label,
                slug: niveau.slug,
                status: niveau.status,
            }
        })
        return niveau

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
                await prisma.project_Niveau.updateMany({
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
                                    Project_Niveau: true
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
                            idcc.Project_Niveau.map((niveau) => {
                                return {
                                    userId: user.userId,
                                    rowSlug: niveau.slug,
                                    clientId: projectExist.clientId,
                                    projectLabel: projectExist.label,
                                    softwareLabel: projectExist.softwareLabel,
                                    processusSlug: processusExist.slug,
                                    projectSlug: projectSlug,
                                    clientSlug: clientSlug,
                                    label: niveau.label,
                                    theme: 'Mutuelle',
                                    description: 'Validation de la mutuelle',
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
            const niveaux = await prisma.project_Niveau.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = niveaux.map((niveau) => {
                return {
                    id: niveau.id,
                    label: niveau.label,
                    status: niveau.status,
                    createdAt: niveau.createdAt
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