import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusUrssaf implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const urssaf = await prisma.project_URSSAF.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return urssaf

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
        const urssafExist = await prisma.project_URSSAF.findFirst({
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
            const { clientSlug, processusSlug, projectSlug, ops } = OpsCreateSchema.parse(values)
            const urssaf = await getDsnOpsById(ops)
            if (!urssaf) {
                throw new Error("L'urssaf n'existe pas")
            }
            const urssafExist = await prisma.project_URSSAF.findFirst({
                where: {
                    clientId,
                    projectLabel,
                    softwareLabel,

                }

            })
            if (urssafExist) {
                throw new Error('L\'urssaf existe déjà')
            }
            const count = await prisma.project_URSSAF.count()
            await prisma.project_URSSAF.create({
                data: {
                    clientId,
                    address1: urssaf.address1 ? urssaf.address1 : '',
                    id: urssaf.id,
                    postalCode: urssaf.codeZip ? urssaf.codeZip : '',
                    city: urssaf.city ? urssaf.city : '',
                    label: urssaf.label ? urssaf.label : '',
                    country: 'France',
                    createdBy: userId,
                    projectLabel,
                    softwareLabel,
                    slug: generateSlug(`URSSAF-${count + 1}`)
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

        const urssafList = await prisma.project_URSSAF.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const urssaf = urssafList.map((urssaf) => {
            return {
                id: urssaf.id,
                label: urssaf.label,
                slug: urssaf.slug,
                status: urssaf.status,
            }
        })
        return urssaf

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
                await prisma.project_URSSAF.updateMany({
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
                                            Project_Establishment_URSSAF: {
                                                include: {
                                                    Project_URSSAF: {
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
                                return (establishment.Project_Establishment_URSSAF.map((urssaf) => {
                                    return {
                                        userId: user.userId,
                                        rowSlug: urssaf.Project_URSSAF.slug,
                                        clientId: projectExist.clientId,
                                        projectLabel: projectExist.label,
                                        softwareLabel: projectExist.softwareLabel,
                                        processusSlug: processusExist.slug,
                                        projectSlug: projectSlug,
                                        clientSlug: clientSlug,
                                        label: urssaf.Project_URSSAF.label
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

}