import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusMutual implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const mutual = await prisma.project_Mutuelle.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return mutual

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

}