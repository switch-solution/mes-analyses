import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusPrevoyance implements IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    constructor(projectLabel: string, softwareLabel: string, clientId: string) {
        this.projectLabel = projectLabel
        this.softwareLabel = softwareLabel
        this.clientId = clientId
    }

    async read(slug: string): Promise<{}> {
        const prevoyance = await prisma.project_Prevoyance.findUniqueOrThrow({
            where: {
                slug: slug
            }
        })
        return prevoyance

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
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }

}