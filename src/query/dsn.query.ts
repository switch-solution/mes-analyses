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
        if (dsn.length === 0) throw new Error("Aucune donnée DSN n'a été trouvée pour ce projet.")

        await Promise.all([copyEstablishment(projectSlug), copyJob(projectSlug)]);

    } catch (error) {
        console.error(error)
        throw new Error("Une erreur est survenue lors de l'import des données DSN.")
    }

}

const copyJob = async (projectSlug: string) => {
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
        const jobs = await prisma.dsn_Job.findMany({
            where: {
                dsnSiren: {
                    in: dsn.map(d => d.siren)
                },
            }
        })
        const formJob = await prisma.project_Component.findFirst({
            where: {
                type: "DSN_EMPLOI",
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel
            },
            include: {
                Project_Input: true
            }
        })
        if (!formJob) throw new Error("Le formulaire DSN n'existe pas.")
        for (let job of jobs) {
            let recordId = crypto.randomUUID()
            formJob.Project_Input.map(async (input) => {
                switch (input.dsnType) {
                    case "DSN_Emploi_Libelle":
                        await prisma.project_Value.create({
                            data: {
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                textValue: job.label,
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
        }
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la copie des emplois.")
    }

}

const copyEstablishment = async (projectSlug: string) => {
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
                type: "DSN_ETABLISSEMENT",
                clientId: projectExist.clientId,
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel
            },
            include: {
                Project_Input: true
            }
        })

        if (!formDsnSociety) throw new Error("Le formulaire DSN n'existe pas.")
        //Gestion des établissements
        for (let establishment of establishments) {
            let recordId = crypto.randomUUID()

            formDsnSociety.Project_Input.map(async (input) => {
                switch (input.dsnType) {
                    case "DSN_Etablissement_SIRET":
                        await prisma.project_Value.create({
                            data: {
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                textValue: establishment?.siret,
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
                    case "DSN_Etablissement_Adresse_1":
                        await prisma.project_Value.create({
                            data: {
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                textValue: establishment?.address1,
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
                    case "DSN_Etablissement_Adresse_3":
                        await prisma.project_Value.create({
                            data: {
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                textValue: establishment?.address2,
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
                    case "DSN_Etablissement_Code_Postal":
                        await prisma.project_Value.create({
                            data: {
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                textValue: establishment?.codeZip,
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
                    case "DSN_Etablissement_Ville":
                        await prisma.project_Value.create({
                            data: {
                                clientId: projectExist.clientId,
                                projectLabel: projectExist.label,
                                projectSoftwareLabel: projectExist.softwareLabel,
                                textValue: establishment?.city,
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
        }



    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la copie des établissements.")
    }

}