import { prisma } from "@/lib/prisma"

export interface IProcessus {
    projectLabel: string
    softwareLabel: string
    clientId: string
    valueExist({
        value,
        clientId,
        projectLabel,
        softwareLabel
    }: {
        value: string,
        clientId: string,
        projectLabel: string,
        softwareLabel: string
    }): Promise<boolean>,
    read<T>(slug: string): Promise<T>,
    insert({
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

    }): void,
    update({
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

    }): void
    delete(slug: string): Promise<void>
    parentElement(slug: string): Promise<{
        id: string;
        label: string;
        slug: string;
        status: string;
        type: string;
    }[]>,
    approve({
        processusSlug,
        clientSlug,
        projectSlug
    }: {
        processusSlug: string,
        clientSlug: string,
        projectSlug: string
    }): void
    approveRecord({
        processusSlug,
        clientSlug,
        projectSlug,
        recordSlug,
        isApproved,
        isRefused
    }: {
        processusSlug: string,
        clientSlug: string,
        projectSlug: string,
        recordSlug: string,
        isApproved?: boolean,
        isRefused?: boolean

    }): void

    extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }>


}

export class Processus {
    processusSlug: string

    constructor(processusSlug: string) {
        this.processusSlug = processusSlug
    }

    async processusExist() {
        try {
            const processus = await prisma.processus.findUniqueOrThrow({
                where: {
                    slug: this.processusSlug
                }
            })
            return processus
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }

    }
    async createFormAndInput() {
        try {
            const form = await prisma.processus.findMany({
                where: {
                    slug: this.processusSlug
                },
                include: {
                    Form: {
                        where: {
                            isCreate: true
                        },
                        include: {
                            Form_Input: {
                                orderBy: {
                                    order: 'asc'
                                }
                            }
                        }

                    }
                }

            })
            return form
        } catch (err) {
            console.error(err)
            throw new Error("Erreur lors de la récupération du formulaire")
        }

    }
    async editFormAndInput() {
        try {
            const form = await prisma.processus.findMany({
                where: {
                    slug: this.processusSlug
                },
                include: {
                    Form: {
                        where: {
                            isEdit: true
                        },
                        include: {
                            Form_Input: {
                                orderBy: {
                                    order: 'asc'
                                }
                            }
                        }
                    }
                }

            })
            return form
        } catch (err) {
            console.error(err)
            throw new Error("Erreur lors de la récupération du formulaire")
        }

    }

    async getForm() {
        try {
            const formList = await prisma.processus.findMany({
                where: {
                    slug: this.processusSlug
                },
                include: {
                    Form: true
                }
            })
            const form = formList.map((processus) => {
                return processus.Form.map((form) => {
                    return {
                        id: form.id,
                        label: form.label,
                        slug: form.slug,
                        isCreate: form.isCreate,
                        isEdit: form.isEdit,
                    }
                })
            }).flat(1)
            return form
        } catch (err) {
            console.error(err)
            throw new Error("Erreur lors de la récupération du formulaire")
        }

    }

}



