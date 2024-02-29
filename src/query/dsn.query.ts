import { prisma } from "@/lib/prisma";
import { getProjectBySlug } from "./project.query";
import crypto from 'crypto'

export const importDataDsnInForm = async (projectSlug: string) => {
    try {

        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) throw new Error("Le projet n'existe pas.")
        const dsn = await prisma.dsn.findMany({
            where: {
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel
            }
        })
        const establishments = await prisma.dsn_Establishment.findMany({
            where: {
                dsnSiren: {
                    in: dsn.map(d => d.siren)
                },
            }
        })
        const formDsnSociety = await prisma.project_Component.findFirst({
            where: {
                type: "DSN_SOCIETE",
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel
            },
            include: {
                Project_Input: true
            }
        })
        const recordId = crypto.randomUUID()

        if (!formDsnSociety) throw new Error("Le formulaire DSN n'existe pas.")
        formDsnSociety.Project_Input.map(async (input) => {
            switch (input.dsnType) {
                case "dsnSocietySiren":
                    await prisma.project_Value.create({
                        data: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            textValue: establishments.at(0)?.dsnSiren,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            createdBy: "system",
                            inputLabel: input.label,
                            version: 1,
                            bookLabel: input.bookLabel,
                            recordId,
                            isCode: input.isCode,
                            isDescription: input.isDescription,
                            isLabel: input.isLabel,
                            label: input.label
                        }

                    })
                    break
                case "dsnSocietyAddress1":
                    await prisma.project_Value.create({
                        data: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            textValue: establishments.at(0)?.address1,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            createdBy: "system",
                            inputLabel: input.label,
                            version: 1,
                            bookLabel: input.bookLabel,
                            recordId,
                            isCode: input.isCode,
                            isDescription: input.isDescription,
                            isLabel: input.isLabel,
                            label: input.label,

                        }

                    })
                    break
                case "dsnSocietyAddress2":
                    await prisma.project_Value.create({
                        data: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            textValue: establishments.at(0)?.address2,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            createdBy: "system",
                            inputLabel: input.label,
                            version: 1,
                            bookLabel: input.bookLabel,
                            recordId,
                            isCode: input.isCode,
                            isDescription: input.isDescription,
                            isLabel: input.isLabel,
                            label: input.label

                        }

                    })
                    break
                case "dsnSocietyZipCode":
                    await prisma.project_Value.create({
                        data: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            textValue: establishments.at(0)?.codeZip,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            createdBy: "system",
                            inputLabel: input.label,
                            version: 1,
                            bookLabel: input.bookLabel,
                            recordId,
                            isCode: input.isCode,
                            isDescription: input.isDescription,
                            isLabel: input.isLabel,
                            label: input.label

                        }

                    })
                    break
                case "dsnSocietyCity":
                    await prisma.project_Value.create({
                        data: {
                            clientId: projectExist.clientId,
                            projectLabel: projectExist.label,
                            projectSoftwareLabel: projectExist.softwareLabel,
                            textValue: establishments.at(0)?.city,
                            chapterLevel_1: input.chapterLevel_1,
                            chapterLevel_2: input.chapterLevel_2,
                            chapterLevel_3: input.chapterLevel_3,
                            createdBy: "system",
                            inputLabel: input.label,
                            version: 1,
                            bookLabel: input.bookLabel,
                            recordId,
                            isCode: input.isCode,
                            isDescription: input.isDescription,
                            isLabel: input.isLabel,
                            label: input.label

                        }

                    })
                    break
            }
        })


    } catch (error) {
        console.error(error)
        throw new Error("Une erreur est survenue lors de l'import des données DSN.")
    }

}