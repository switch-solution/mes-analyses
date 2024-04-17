import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { EstablishmentCreateSchema, EstablishmentEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
export class StandardProcessusEstablishment implements IProcessus {
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
        const society = await prisma.project_Establishment.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return society

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
            const { id, address1, nic, slug, socialReason, address2, societyId, city, address3, address4, clientSlug, legalStatus, projectSlug, processusSlug, country, postalCode, ape } = EstablishmentEditSchema.parse(values)

            const establishementExist = await prisma.project_Establishment.findUnique({
                where: {
                    slug
                }
            })
            if (!establishementExist) {
                throw new Error("L'établissement n'existe pas")
            }
            //Update the establishment
            await prisma.project_Establishment.update({
                where: {
                    slug
                },
                data: {
                    id,
                    nic,
                    societyId,
                    legalStatus,
                    address1,
                    address2,
                    clientId,
                    address3,
                    socialReason,
                    createdBy: userId,
                    city,
                    address4,
                    country,
                    postalCode,
                    ape,
                    projectLabel: projectLabel,
                    softwareLabel: softwareLabel,
                }

            })
            //Add history
            const countHistory = await prisma.project_Establishment_Archived.count({
                where: {
                    nic,
                    societyId,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            await prisma.project_Establishment_Archived.create({
                data: {
                    id: establishementExist.id,
                    nic: establishementExist.nic,
                    societyId: establishementExist.societyId,
                    address1: establishementExist.address1,
                    address2: establishementExist.address2,
                    legalStatus: establishementExist.legalStatus,
                    clientId: establishementExist.clientId,
                    address3: establishementExist.address3,
                    socialReason: establishementExist.socialReason,
                    createdBy: establishementExist.createdBy,
                    city: establishementExist.city,
                    address4: establishementExist.address4,
                    country: establishementExist.country,
                    postalCode: establishementExist.postalCode,
                    ape: establishementExist.ape,
                    status: establishementExist.status,
                    source: establishementExist.source,
                    projectLabel: establishementExist.projectLabel,
                    softwareLabel: establishementExist.softwareLabel,
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
        const societyExist = await prisma.project_Establishment.findFirst({
            where: {
                nic: value,
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
            console.log(values)
            const { id, address1, nic, socialReason, address2, societyId, city, legalStatus, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = EstablishmentCreateSchema.parse(values)

            const societyExist = await prisma.project_Establishment.findFirst({
                where: {
                    societyId,
                    clientId,
                    projectLabel,
                    softwareLabel,
                    nic
                }
            })
            if (societyExist) {
                throw new Error("L'établissement existe déjà")
            }
            try {
                const count = await prisma.project_Establishment.count()
                await prisma.project_Establishment.create({
                    data: {
                        id,
                        nic,
                        societyId,
                        address1,
                        address2,
                        legalStatus,
                        clientId,
                        address3,
                        socialReason,
                        createdBy: userId,
                        city,
                        address4,
                        country,
                        postalCode,
                        ape,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Etablissement-${count + 1}`)
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
    parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        throw new Error("Method not implemented.")
    }
    delete(slug: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async dataTable() {

        const establishmentList = await prisma.project_Establishment.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const establishment = establishmentList.map((establishment) => {
            return {
                id: establishment.nic,
                label: establishment.socialReason,
                slug: establishment.slug,
                status: establishment.status,
            }
        })
        return establishment

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
                await prisma.project_Establishment.updateMany({
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
                                        select: {
                                            slug: true,
                                            socialReason: true
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
                                return {
                                    userId: user.userId,
                                    rowSlug: establishment.slug,
                                    clientId: projectExist.clientId,
                                    projectLabel: projectExist.label,
                                    softwareLabel: projectExist.softwareLabel,
                                    processusSlug: processusExist.slug,
                                    projectSlug: projectSlug,
                                    clientSlug: clientSlug,
                                    label: establishment.socialReason,
                                    theme: 'Etablissement',
                                    description: 'Validation de l\'établissement',

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
            const establishments = await prisma.project_Establishment.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_Establishment_Archived: true
                }
            })
            const datas = establishments.map((establishment) => {
                return {
                    id: establishment.nic,
                    label: establishment.socialReason,
                    address1: establishment.address1,
                    address2: establishment.address2,
                    legalStatus: establishment.legalStatus,
                    address3: establishment.address3,
                    city: establishment.city,
                    address4: establishment.address4,
                    country: establishment.country,
                    postalCode: establishment.postalCode,
                    ape: establishment.ape,
                    status: establishment.status,
                    createdAt: establishment.createdAt,
                    updatedAt: establishment.updatedAt
                }
            })

            const archived = establishments.map((establishment) => {
                return establishment.Project_Establishment_Archived.map((archived) => {
                    return {
                        id: archived.nic,
                        label: archived.socialReason,
                        address1: archived.address1,
                        address2: archived.address2,
                        legalStatus: archived.legalStatus,
                        address3: archived.address3,
                        city: archived.city,
                        address4: archived.address4,
                        country: archived.country,
                        postalCode: archived.postalCode,
                        ape: archived.ape,
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