
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

export async function bookV0001Seed() {

    try {
        const SEED_NAME = "BOOK_V0001"
        const seedExist = await prisma.prisma_Seed.findFirst({
            where: {
                name: SEED_NAME,
                status: "completed"

            }
        })
        if (!seedExist) {
            await prisma.prisma_Seed.create({
                data: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                }
            })
            //Create book
            await prisma.book.upsert({
                where: {
                    slug: "structure-juridique",
                },
                update: {
                    label: "Structure juridique",
                    status: "actif",
                    slug: "structure-juridique",
                    description: "Cahier de rédaction de la structure juridique de l'entreprise",
                },
                create: {
                    label: "Structure juridique",
                    status: "actif",
                    slug: "structure-juridique",
                    createdBy: "system",
                    description: "Cahier de rédaction de la structure juridique de l'entreprise",
                },
            })
            await prisma.chapter.upsert({
                where: {
                    bookLabel_level_1_level_2_level_3: {
                        bookLabel: "Structure juridique",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0
                    }
                },
                update: {
                    label: "Liste des sociétés",
                },
                create: {
                    label: "Préambule",
                    bookLabel: "Structure juridique",
                    level_1: 1,
                    level_2: 0,
                    level_3: 0,
                    slug: "1-0-0-societes",
                    createdBy: "system"
                }
            })
            await prisma.chapter.upsert({
                where: {
                    bookLabel_level_1_level_2_level_3: {
                        bookLabel: "Structure juridique",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0

                    }
                },
                update: {
                    label: "Liste des établissements",
                },
                create: {
                    label: "Etablissements",
                    bookLabel: "Structure juridique",
                    level_1: 2,
                    level_2: 0,
                    level_3: 0,
                    slug: "2-0-0-etablissements",
                    createdBy: "system"
                }
            })
            await prisma.chapter.upsert({
                where: {
                    bookLabel_level_1_level_2_level_3: {
                        bookLabel: "Structure juridique",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0

                    }
                },
                update: {
                    label: "Liste des banques établissement",
                },
                create: {
                    label: "Liste des banques établissement",
                    bookLabel: "Structure juridique",
                    level_1: 3,
                    level_2: 0,
                    level_3: 0,
                    slug: "3-0-0-banques-etablissement",
                    createdBy: "system"
                }
            })
            await prisma.chapter.upsert({
                where: {
                    bookLabel_level_1_level_2_level_3: {
                        bookLabel: "Structure juridique",
                        level_1: 4,
                        level_2: 0,
                        level_3: 0

                    }
                },
                update: {
                    label: "Caisses de cotisation",
                },
                create: {
                    label: "Caisses de cotisation",
                    bookLabel: "Structure juridique",
                    level_1: 4,
                    level_2: 0,
                    level_3: 0,
                    slug: "4-0-0-caisses-cotisation",
                    createdBy: "system"
                }
            })
        }
        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "completed"
            }
        })
    } catch (err) {
        const SEED_NAME = "BOOK_V0001"

        await prisma.prisma_Seed.update({
            where: {
                name: SEED_NAME
            },
            data: {

                status: "error"
            }
        })
        console.error(err)
    }
}