import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { SocietyCreateSchema, SocietyEditSchema } from "@/src/helpers/definition"
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusDsn implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const society = await prisma.project_DSN.findUniqueOrThrow({
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
            const { id, siren, address1, socialReason, address2, slug, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyEditSchema.parse(values)

            const societyBySlug = await prisma.project_Society.findUnique({
                where: {
                    slug
                }
            })

            if (!societyBySlug) {
                throw new Error("La société n'existe pas")
            }
            if (siren !== societyBySlug.siren) {
                const sirenExist = await prisma.project_Society.findFirst({
                    where: {
                        siren: siren,
                        clientId,
                        projectLabel,
                        softwareLabel,
                    }
                })
                if (sirenExist) {
                    throw new Error("Le siren existe déjà")
                }

                const establishment = await prisma.project_Establishment.findFirst({
                    where: {
                        societyId: societyBySlug.siren,
                        clientId,
                        projectLabel,
                        softwareLabel,
                    },
                    select: {
                        socialReason: true
                    }
                })
                if (establishment) {
                    throw new Error(`La société est liée à un établissement.Supprimer d'abord établissement : ${establishment.socialReason}`)
                }
            }

            //Update society
            await prisma.project_Society.update({
                where: {
                    slug
                },
                data: {
                    id,
                    siren,
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
            const countHistory = await prisma.project_Society_Archived.count({
                where: {
                    siren: societyBySlug.siren,
                    projectLabel,
                    softwareLabel,
                    clientId
                }
            })
            await prisma.project_Society_Archived.create({
                data: {
                    id: societyBySlug.id,
                    siren: societyBySlug.siren,
                    address1: societyBySlug.address1,
                    address2: societyBySlug.address2,
                    clientId: societyBySlug.clientId,
                    address3: societyBySlug.address3,
                    socialReason: societyBySlug.socialReason,
                    createdBy: societyBySlug.createdBy,
                    city: societyBySlug.city,
                    status: societyBySlug.status,
                    source: societyBySlug.source,
                    address4: societyBySlug.address4,
                    country: societyBySlug.country,
                    postalCode: societyBySlug.postalCode,
                    ape: societyBySlug.ape,
                    projectLabel: societyBySlug.projectLabel,
                    softwareLabel: societyBySlug.softwareLabel,
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
        const societyExist = await prisma.project_DSN.findFirst({
            where: {
                random: value,
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
            const { id, siren, address1, socialReason, address2, city, address3, address4, clientSlug, projectSlug, processusSlug, country, postalCode, ape } = SocietyCreateSchema.parse(values)
            const societyExist = await prisma.project_Society.findFirst({
                where: {
                    siren: siren,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (societyExist) {
                throw new Error("La société existe déjà")
            }

            const count = await prisma.project_Society.count()
            await prisma.project_Society.create({
                data: {
                    id,
                    siren,
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
                    slug: generateSlug(`Societe-${count + 1}`)
                }

            })
            return
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }


    }
    async delete(slug: string): Promise<void> {
        try {
            await prisma.project_Society.delete({
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

        const dsnList = await prisma.project_DSN.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const dsn = dsnList.map((dsn) => {
            return {
                id: dsn.random,
                label: dsn.dsnSiret,
                slug: dsn.slug,
                status: 'Intégré',
            }
        })
        return dsn

    }

    async parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]> {
        try {
            const societyDatabase = await prisma.project_Society.findUniqueOrThrow({
                where: {
                    slug
                },
                select: {
                    siren: true,
                    socialReason: true,
                    status: true,
                    slug: true
                }
            })
            const establishmentsList = await prisma.project_Society.findUniqueOrThrow({
                where: {
                    slug
                },
                include: {
                    Project_Establishment: {
                        select: {
                            nic: true,
                            socialReason: true,
                            status: true,
                            slug: true

                        }
                    }
                }

            })
            const society = {
                id: societyDatabase.siren,
                label: societyDatabase.socialReason,
                slug: societyDatabase.slug,
                status: societyDatabase.status,
                type: 'Société'
            }

            const establishments = establishmentsList.Project_Establishment.map((establishment) => {
                return {
                    id: establishment.nic,
                    label: establishment.socialReason,
                    slug: establishment.slug,
                    status: establishment.status,
                    type: 'Etablissement'
                }
            })
            const elements = []
            elements.push(society)
            elements.push(...establishments)

            return elements
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

}