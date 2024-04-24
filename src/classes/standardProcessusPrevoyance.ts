import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusPrevoyance implements IProcessus {
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
        const prevoyance = await prisma.project_Prevoyance.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return prevoyance as T

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
            const prevoyanceExist = await prisma.project_Prevoyance.findUnique({
                where: {
                    slug
                }
            })
            if (!prevoyanceExist) {
                throw new Error("La caisse prévoyance n'existe pas")
            }

            await prisma.project_Prevoyance.update({
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
            const countHistory = await prisma.project_Prevoyance_Archived.count({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Prevoyance_Archived.create({
                data: {
                    address1: prevoyanceExist.address1,
                    address2: prevoyanceExist.address2,
                    address3: prevoyanceExist.address3,
                    address4: prevoyanceExist.address4,
                    postalCode: prevoyanceExist.postalCode,
                    id: prevoyanceExist.id,
                    source: prevoyanceExist.source,
                    status: prevoyanceExist.status,
                    city: prevoyanceExist.city,
                    label: prevoyanceExist.label,
                    country: prevoyanceExist.country,
                    createdBy: prevoyanceExist.createdBy,
                    projectLabel: prevoyanceExist.projectLabel,
                    softwareLabel: prevoyanceExist.softwareLabel,
                    clientId: prevoyanceExist.clientId,
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
        const prevoyanceExist = await prisma.project_Prevoyance.findFirst({
            where: {
                id: value,
                clientId,
                projectLabel,
                softwareLabel,
            }
        })
        if (prevoyanceExist) {
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
            const prevoyance = await getDsnOpsById(ops)
            if (!prevoyance) {
                throw new Error("La prévoyance n'existe pas")
            }
            const prevoyanceExist = await prisma.project_Prevoyance.findFirst({
                where: {
                    clientId,
                    projectLabel,
                    softwareLabel,

                }

            })
            if (prevoyanceExist) {
                throw new Error('La prévoyance existe déjà')
            }
            const count = await prisma.project_Prevoyance.count()
            await prisma.project_Prevoyance.create({
                data: {
                    clientId,
                    address1: prevoyance.address1 ? prevoyance.address1 : '',
                    id: prevoyance.id,
                    postalCode: prevoyance.codeZip ? prevoyance.codeZip : '',
                    city: prevoyance.city ? prevoyance.city : '',
                    label: prevoyance.label ? prevoyance.label : '',
                    country: 'France',
                    createdBy: userId,
                    projectLabel,
                    softwareLabel,
                    slug: generateSlug(`Prévoyance-${count + 1}`)
                }
            })
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)

        }

    }
    async delete(slug: string): Promise<void> {
        try {
            await prisma.project_Prevoyance.delete({
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

        const prevoyanceList = await prisma.project_Prevoyance.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const prevoyances = prevoyanceList.map((prevoyance) => {
            return {
                id: prevoyance.id,
                label: prevoyance.label,
                slug: prevoyance.slug,
                status: prevoyance.status,
            }
        })
        return prevoyances

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {
            const urssaf = await prisma.project_URSSAF.findUniqueOrThrow({
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
            const urssafList = [{
                id: urssaf.id,
                label: urssaf.label,
                slug: urssaf.slug,
                status: urssaf.status,
                type: "URSSAF"
            }
            ]
            return urssafList
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
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
                await prisma.project_Prevoyance.updateMany({
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
                                            Project_Establishment_Prevoyance: {
                                                include: {
                                                    Project_Prevoyance: {
                                                        select: {
                                                            slug: true,
                                                            label: true,
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
                                return (establishment.Project_Establishment_Prevoyance.map((prev) => {
                                    return {
                                        userId: user.userId,
                                        rowSlug: prev.Project_Prevoyance.slug,
                                        clientId: projectExist.clientId,
                                        projectLabel: projectExist.label,
                                        softwareLabel: projectExist.softwareLabel,
                                        processusSlug: processusExist.slug,
                                        projectSlug: projectSlug,
                                        clientSlug: clientSlug,
                                        label: prev.Project_Prevoyance.label,
                                        theme: 'Prévoyance',
                                        description: 'Validation de la prévoyance',
                                    }
                                }))

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
            const prevList = await prisma.project_Prevoyance.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },

            })
            const datas = prevList.map((prev) => {
                return {
                    id: prev.id,
                    label: prev.label,
                    address1: prev.address1,
                    address2: prev.address2,
                    address3: prev.address3,
                    address4: prev.address4,
                    city: prev.city,
                    postalCode: prev.postalCode,
                    status: prev.status,
                    createdAt: prev.createdAt
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