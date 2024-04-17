import { prisma } from "@/lib/prisma"
import type { IProcessus } from "@/src/classes/processus"
import { JobCreateSchema } from "@/src/helpers/definition";
import { generateSlug } from "@/src/helpers/generateSlug"
export class StandardProcessusJob implements IProcessus {
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
        const job = await prisma.project_Job.findUniqueOrThrow({
            where: {
                slug
            }
        })
        return job

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
        const societyExist = await prisma.project_Society.findFirst({
            where: {
                siren: value,
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
            const { id, clientSlug, projectSlug, processusSlug, label } = JobCreateSchema.parse(values)

            const jobExist = await prisma.project_Job.findFirst({
                where: {
                    id,
                    label,
                    clientId,
                    projectLabel,
                    softwareLabel,
                }
            })
            if (jobExist) {
                throw new Error("L'établissement existe déjà")
            }
            try {
                const count = await prisma.project_Job.count()
                await prisma.project_Job.create({
                    data: {
                        id,
                        label,
                        clientId,
                        createdBy: userId,
                        projectLabel: projectLabel,
                        softwareLabel: softwareLabel,
                        slug: generateSlug(`Job-${count + 1}`)
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
    parentElement(slug: string): Promise<{ id: string; label: string; slug: string; status: string; type: string; }[]> {
        throw new Error("Method not implemented.")
    }
    async delete(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async dataTable() {

        const jobList = await prisma.project_Job.findMany({
            where: {
                projectLabel: this.projectLabel,
                softwareLabel: this.softwareLabel,
                clientId: this.clientId
            }
        })
        const jobs = jobList.map((job) => {
            return {
                id: job.id,
                label: job.label,
                slug: job.slug,
                status: job.status,
            }
        })
        return jobs

    }
    approve({ processusSlug, clientSlug, projectSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    approveRecord({ processusSlug, clientSlug, projectSlug, recordSlug }: { processusSlug: string; clientSlug: string; projectSlug: string; recordSlug: string; }): void {
        throw new Error("Method not implemented.")
    }
    async extraction(): Promise<{ datas: {}[], archived: {}[], inputs: { zodLabel: string, label: string }[] }> {
        try {
            const jobs = await prisma.project_Job.findMany({
                where: {
                    projectLabel: this.projectLabel,
                    softwareLabel: this.softwareLabel,
                    clientId: this.clientId
                },
                include: {
                    Project_Job_Archived: true
                }
            })
            const datas = jobs.map((job) => {
                return {
                    id: job.id,
                    label: job.label,
                    status: job.status,
                    createdAt: job.createdAt
                }
            })

            const archived = jobs.map((job) => {
                return job.Project_Job_Archived.map((archived) => {
                    return {
                        id: archived.id,
                        label: archived.label,
                        status: archived.status,
                        version: archived.version,
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