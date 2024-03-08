import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'stdout',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    }
)
import { Seed } from "./seedModel"

class TaskV0001 extends Seed {
    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string
    ) {
        super(name, description, order, previousLabel)
    }

    async run() {
        const seedExist = await this.seedIsComplete()
        const previousStatus = await this.previousSeedIsComplete()
        try {
            if (previousStatus && !seedExist) {
                await this.seedUpdateStatus("pending")
                await prisma.task.upsert({
                    where: {
                        label: "DSN"
                    },
                    update: {
                        label: "DSN",
                        level: "Obligatoire",
                        description: "Déclaration sociale nominative",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".dsn"
                    },
                    create: {
                        label: "DSN",
                        level: "Obligatoire",
                        description: "Déclaration sociale nominative",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".dsn"
                    },
                })
                await prisma.task.upsert({
                    where: {
                        label: "Journal de paie"
                    },
                    update: {
                        label: "Journal de paie",
                        level: "Obligatoire",
                        description: "Vos journaux de paie",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                    create: {
                        label: "Journal de paie",
                        level: "Obligatoire",
                        description: "Vos journaux de paie",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                })
                await prisma.task.upsert({
                    where: {
                        label: "Bulletin de paie"
                    },
                    update: {
                        label: "Bulletin de paie",
                        level: "Obligatoire",
                        description: "Exemple de bulletin de paie",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                    create: {
                        label: "Bulletin de paie",
                        level: "Obligatoire",
                        description: "Exemple de bulletin de paie",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                })
                await prisma.task.upsert({
                    where: {
                        label: "Fiche paramétrage DSN"
                    },
                    update: {
                        label: "Fiche paramétrage DSN",
                        level: "Obligatoire",
                        description: "Vos fiches de paramétrage prévoyance, mutuelle et retraite complémentaire",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                    create: {
                        label: "Fiche paramétrage DSN",
                        level: "Obligatoire",
                        description: "Vos fiches de paramétrage prévoyance, mutuelle et retraite complémentaire",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                })
                await prisma.task.upsert({
                    where: {
                        label: "Fiche paramétrage DSN"
                    },
                    update: {
                        label: "Fiche paramétrage DSN",
                        level: "Obligatoire",
                        description: "Vos fiches de paramétrage prévoyance, mutuelle et retraite complémentaire",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"

                    },
                    create: {
                        label: "Fiche paramétrage DSN",
                        level: "Obligatoire",
                        description: "Vos fiches de paramétrage prévoyance, mutuelle et retraite complémentaire",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                })
                await prisma.task.upsert({
                    where: {
                        label: "Convention collective"
                    },
                    update: {
                        label: "Convention collective",
                        level: "Facultatif",
                        description: "Vos convention collective",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"

                    },
                    create: {
                        label: "Convention collective",
                        level: "Facultatif",
                        description: "Vos convention collective",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                })
                await prisma.task.upsert({
                    where: {
                        label: "Accord d'entreprise"
                    },
                    update: {
                        label: "Accord d'entreprise",
                        level: "Obliatoire",
                        description: "Vos accord d'entreprise",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"

                    },
                    create: {
                        label: "Accord d'entreprise",
                        level: "Obliatoire",
                        description: "Vos accord d'entreprise",
                        createdBy: "system",
                        isUpload: true,
                        accept: ".pdf"
                    },
                })
                await this.seedUpdateStatus("completed")
            }
        } catch (e) {
            await this.seedUpdateStatus("error")
            throw e
        }
    }
}

export const taskV0001Seed = new TaskV0001("TASK_V0001", "Taches de bases", 7, "CHAPTER_FORM_V0001")