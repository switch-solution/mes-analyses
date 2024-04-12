import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { OpsCreateSchema, OpsEditSchema } from "@/src/helpers/definition";
import { generateSlug } from "../helpers/generateSlug"
import { getDsnOpsById } from "@/src/query/dsn.query";

export class StandardProcessusAgircArrco implements IProcessus {
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
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }

}