import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusAgircArrco implements IProcessus {
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
        const urssaf = await prisma.project_URSSAF.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return urssaf as T

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
            const agircArrco = await prisma.project_AGIRC_ARRCO.findUnique({
                where: {
                    slug
                }
            })
            if (!agircArrco) {
                throw new Error("La caisse AGIRC-ARRCO n'existe pas")
            }

            await prisma.project_AGIRC_ARRCO.update({
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
            const countHistory = await prisma.project_AGIRC_ARRCO_Archived.count({
                where: {
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_AGIRC_ARRCO_Archived.create({
                data: {
                    address1: agircArrco.address1,
                    address2: agircArrco.address2,
                    address3: agircArrco.address3,
                    address4: agircArrco.address4,
                    postalCode: agircArrco.postalCode,
                    id: agircArrco.id,
                    source: agircArrco.source,
                    status: agircArrco.status,
                    city: agircArrco.city,
                    label: agircArrco.label,
                    country: agircArrco.country,
                    createdBy: agircArrco.createdBy,
                    projectLabel: agircArrco.projectLabel,
                    softwareLabel: agircArrco.softwareLabel,
                    clientId: agircArrco.clientId,
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
            const agircArrco = await getDsnOpsById(ops)
            if (!agircArrco) {
                throw new Error("La caisse Agirc-Arrco n'existe pas")
            }
            const agircArrcoExist = await prisma.project_AGIRC_ARRCO.findFirst({
                where: {
                    clientId,
                    projectLabel,
                    softwareLabel,

                }

            })
            if (agircArrcoExist) {
                throw new Error('L\'agirc arrco existe déjà')
            }
            const count = await prisma.project_AGIRC_ARRCO.count()
            await prisma.project_AGIRC_ARRCO.create({
                data: {
                    clientId,
                    address1: agircArrco.address1 ? agircArrco.address1 : '',
                    id: agircArrco.id,
                    postalCode: agircArrco.codeZip ? agircArrco.codeZip : '',
                    city: agircArrco.city ? agircArrco.city : '',
                    label: agircArrco.label ? agircArrco.label : '',
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
            await prisma.project_AGIRC_ARRCO.delete({
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

        const agircArrcoList = await prisma.project_AGIRC_ARRCO.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const agircArrco = agircArrcoList.map((ops) => {
            return {
                id: ops.id,
                label: ops.label,
                slug: ops.slug,
                status: ops.status,
            }
        })
        return agircArrco

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {
            const agircArrco = await prisma.project_AGIRC_ARRCO.findUniqueOrThrow({
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
            const agircArrcoList = [{
                id: agircArrco.id,
                label: agircArrco.label,
                slug: agircArrco.slug,
                status: agircArrco.status,
                type: "AGIRC-ARRCO"
            }
            ]
            return agircArrcoList
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
                await prisma.project_AGIRC_ARRCO.updateMany({
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
                                            Project_Establishment_AGIRC_ARRCO: {
                                                include: {
                                                    Project_AGIRC_ARRCO: {
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
                                return (establishment.Project_Establishment_AGIRC_ARRCO.map((retraite) => {
                                    return {
                                        userId: user.userId,
                                        rowSlug: retraite.Project_AGIRC_ARRCO.slug,
                                        clientId: projectExist.clientId,
                                        projectLabel: projectExist.label,
                                        softwareLabel: projectExist.softwareLabel,
                                        processusSlug: processusExist.slug,
                                        projectSlug: projectSlug,
                                        clientSlug: clientSlug,
                                        label: retraite.Project_AGIRC_ARRCO.label,
                                        theme: 'Retraite complémentaire',
                                        description: 'Validation retraite complémentaire',
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
            const agircArrco = await prisma.project_AGIRC_ARRCO.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_AGIRC_ARRCO_Archived: true
                }
            })
            const datas = agircArrco.map((agirc) => {
                return {
                    id: agirc.id,
                    label: agirc.label,
                    address1: agirc.address1,
                    address2: agirc.address2,
                    address3: agirc.address3,
                    address4: agirc.address4,
                    postalCode: agirc.postalCode,
                    city: agirc.city,
                    country: agirc.country,
                    status: agirc.status,
                    createdAt: agirc.createdAt,
                    updatedAt: agirc.updatedAt
                }
            })

            const archived = agircArrco.map((agirc) => {
                return agirc.Project_AGIRC_ARRCO_Archived.map((archived) => {
                    return {
                        id: archived.id,
                        label: archived.label,
                        address1: archived.address1,
                        address2: archived.address2,
                        address3: archived.address3,
                        address4: archived.address4,
                        postalCode: archived.postalCode,
                        city: archived.city,
                        country: archived.country,
                        status: archived.status,
                        createdAt: archived.createdAt,
                        updatedAt: archived.updatedAt
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