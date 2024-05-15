"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Project } from '@/src/classes/project';
import { z } from 'zod';
import { generateUUID } from '@/src/helpers/generateUuid';
import { extractionsList } from "@fibre44/dsn-parser/lib/utils/extraction"
import { ActionError, authentifcationActionUserIsAuthorizeToProject } from '@/lib/safe-actions'
import { DynamicPage } from '@/src/classes/dynamicPage';
export type Row = {
    id: string, value: string, label: string, random: string
}

const dsnDataSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est requis" }),
    projectSlug: z.string({ required_error: "Le projet est requis" }),
    bankList: z.array(z.object({
        contributionFundBIC: z.string(),
        contributionFundIBAN: z.string(),
    })),
    societyList: z.array(z.object({
        siren: z.string({ required_error: "Le siren est requis" }),
        apen: z.string(),
        adress1: z.string(),
        zipCode: z.string(),
        city: z.string(),
    })),
    establishmentList: z.array(z.object({
        siren: z.string({ required_error: "Le siren est requis" }),
        nic: z.string(),
        ape: z.string(),
        address1: z.string(),
        postalCode: z.string().optional(),
        city: z.string(),
        legalStatus: z.string().optional(),

    })),
    jobList: z.array(z.object({
        label: z.string(),
    })),
    idccList: z.array(z.object({
        idcc: z.string(),
    }))

})

const inputs = async ({
    clientId,
    softwareLabel,
    dsnStructure
}: {
    clientId: string,
    softwareLabel: string,
    dsnStructure: string[]
}) => {
    try {
        const inputs = await prisma.page.findMany({
            where: {
                status: "Validé",
                level: "Logiciel",
                clientId,
                softwareLabel,
                Page_Block: {
                    some: {
                        sourceDsnId: {
                            in: dsnStructure
                        }
                    }
                }
            },
            include: {
                Page_Block: {
                    where: {
                        sourceDsnId: {
                            in: dsnStructure
                        }
                    }
                }
            }
        })
        return inputs

    } catch (err) {
        console.error(err)
        throw new ActionError(err as string)

    }
}

const projectPageExist = async ({
    clientId,
    softwareLabel,
    pageId
}: {
    clientId: string,
    softwareLabel: string,
    pageId: string
}) => {
    try {
        const page = await prisma.project_Page.count({
            where: {
                clientId,
                softwareLabel,
                pageId
            }
        })
        return page
    } catch (err) {
        console.error(err)
        throw new ActionError(err as string)
    }

}

export const dsnData = authentifcationActionUserIsAuthorizeToProject(dsnDataSchema, async (values: z.infer<typeof dsnDataSchema>, { userId, projectLabel, clientId, softwareLabel }) => {
    const { clientSlug, projectSlug, societyList, bankList, establishmentList, jobList, idccList } = dsnDataSchema.parse(values)
    const project = new Project(projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        throw new ActionError("Le projet n'existe pas")
    }
    try {
        //Save datas in forms

        const societyDsnId = extractionsList.filter((society) => society.collection === "Society")
        const establishmentDsnId = extractionsList.filter((establishment) => establishment.collection === "Establishment")
        const jobDsnId = extractionsList.filter((job) => job.collection === "Job")

        //Get inputs

        const societyInput = await inputs({
            clientId,
            softwareLabel,
            dsnStructure: societyDsnId.map((society) => society.dsnStructure)
        })
        const establishementsInput = await inputs({
            clientId,
            softwareLabel,
            dsnStructure: establishmentDsnId.map((establishment) => establishment.dsnStructure)
        })
        const jobsInput = await inputs({
            clientId,
            softwareLabel,
            dsnStructure: jobDsnId.map((job) => job.dsnStructure)
        })

        const allPages = [...societyInput, ...establishementsInput, ...jobsInput]
        //Check page exist
        for (const page of allPages) {
            const countSocietyPage = await projectPageExist({
                clientId,
                softwareLabel,
                pageId: page.id
            })
            //Create page if not exist
            if (!countSocietyPage) {
                const duplicate = new DynamicPage(page.slug)
                await duplicate.duplicatePage({
                    label: page.label,
                    projectLabel,
                    softwareLabel,
                    clientId
                })
            }
        }

        //Get project page

        const projectPage = await prisma.project_Page.findMany({
            where: {
                projectLabel,
                clientId,
                softwareLabel,
                pageId: {
                    in: allPages.map((page) => page.id)
                }
            }
        })

        const formWithSocietyInput = societyInput.map((society) =>
            society.Page_Block.map((block) => {
                return {
                    formId: block.blockMasterId
                }
            })
        ).flat(1)

        const formsSociety = await prisma.page_Block.findMany({
            where: {
                id: {
                    in: formWithSocietyInput
                        .map((form) => form.formId)
                        .filter((formId) => formId !== null) // Filter out null values
                        .map((formId) => formId as string) // Cast to string
                }
            }
        })

        const formWithEstablishementInput = establishementsInput.map((society) =>
            society.Page_Block.map((block) => {
                return {
                    formId: block.blockMasterId
                }
            })
        ).flat(1)

        const formsEstablishemnt = await prisma.page_Block.findMany({
            where: {
                id: {
                    in: formWithEstablishementInput
                        .map((form) => form.formId)
                        .filter((formId) => formId !== null) // Filter out null values
                        .map((formId) => formId as string) // Cast to string
                }
            }
        })


        //Add data in forms


        await saveDatas({
            datas: societyList,
            forms: formsSociety,
            projectPage,
            projectLabel,
            clientId,
            softwareLabel,
            userId
        })

        await saveDatas({
            datas: establishmentList,
            forms: formsEstablishemnt,
            projectPage,
            projectLabel,
            clientId,
            softwareLabel,
            userId
        })




    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }

    revalidatePath(`/client/${clientSlug}/project/${projectSlug}/`)
    redirect(`/client/${clientSlug}/project/${projectSlug}/`)

})


const saveDatas = async ({
    datas,
    forms,
    projectPage,
    projectLabel,
    clientId,
    softwareLabel,
    userId
}: {
    datas: any[],
    forms: any[],
    projectPage: any[],
    projectLabel: string,
    clientId: string,
    softwareLabel: string,
    userId: string
}) => {
    try {
        for (const data of datas) {
            for (const form of forms) {
                const formGroup = generateUUID()
                const inputs = await prisma.page_Block.findMany({
                    where: {
                        blockMasterId: form.id
                    }
                })
                for (const input of inputs) {
                    const projectPageId = projectPage.find((page) => page.pageId === input.pageId)?.id
                    if (input.sourceDsnId) {
                        const fields = extractionsList.find((field) => field.dsnStructure === input.sourceDsnId)
                        const value = data[fields?.field as keyof typeof data];
                        if (value) {
                            if (projectPageId) {
                                await prisma.project_Block_Value.create({
                                    data: {
                                        projectLabel,
                                        softwareLabel,
                                        pageVersion: input.pageVersion,
                                        clientId,
                                        label: input.label,
                                        order: input.order,
                                        createdBy: userId,
                                        value,
                                        blockId: input.id,
                                        formId: form.id,
                                        formGroup,
                                        projectPageId

                                    }
                                })
                            }
                        }
                    } else {
                        if (projectPageId) {
                            await prisma.project_Block_Value.create({
                                data: {
                                    projectLabel,
                                    softwareLabel,
                                    pageVersion: input.pageVersion,
                                    clientId,
                                    label: input.label,
                                    order: input.order,
                                    createdBy: userId,
                                    value: "",
                                    blockId: input.id,
                                    formId: form.id,
                                    formGroup,
                                    projectPageId
                                }
                            })
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error(err)
        throw new ActionError(err as string)
    }

}


