import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { RateAtCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusRateAt implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const urssaf = await prisma.project_Rate_AT.findUniqueOrThrow({
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

}