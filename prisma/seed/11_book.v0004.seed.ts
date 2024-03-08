
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

class BookV0004Seed extends Seed {
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

                //Create book
                await prisma.book.upsert({
                    where: {
                        slug: "classification",
                    },
                    update: {
                        label: "Cahier des codes classifications",
                        status: "actif",
                        slug: "classification",
                        description: "Cahier des codes classifications",
                    },
                    create: {
                        label: "Cahier des codes classifications",
                        status: "actif",
                        slug: "classification",
                        createdBy: "system",
                        description: "Cahier des codes classifications",
                    },
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Coefficient",
                    },
                    create: {
                        label: "Coefficient",
                        bookLabel: "Cahier des codes classifications",
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        slug: "1-0-0-coefficient",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Qualification",
                    },
                    create: {
                        label: "Qualification",
                        bookLabel: "Cahier des codes classifications",
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        slug: "2-0-0-qualification",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Niveau",
                    },
                    create: {
                        label: "Niveau",
                        bookLabel: "Cahier des codes classifications",
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        slug: "3-0-0-niveau",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 4,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Echelon",
                    },
                    create: {
                        label: "Echelon",
                        bookLabel: "Cahier des codes classifications",
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        slug: "4-0-0-niveau",
                        createdBy: "system"
                    }
                })
                await prisma.chapter.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0
                        }
                    },
                    update: {
                        label: "Indice",
                    },
                    create: {
                        label: "Indice",
                        bookLabel: "Cahier des codes classifications",
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        slug: "5-0-0-indice",
                        createdBy: "system"
                    }
                })
                //Associate with Form
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 1,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Coefficient",
                            formType: "DSN_COEFFICIENT",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Coefficient",
                        formType: "DSN_COEFFICIENT",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    },
                    create: {
                        formTitle: "Coefficient",
                        formType: "DSN_COEFFICIENT",
                        formVersion: 1,
                        level_1: 1,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 2,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Qualification",
                            formType: "STD_QUALIFICATION",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Qualification",
                        formType: "STD_QUALIFICATION",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    },
                    create: {
                        formTitle: "Qualification",
                        formType: "STD_QUALIFICATION",
                        formVersion: 1,
                        level_1: 2,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Niveau",
                            formType: "STD_NIVEAU",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Niveau",
                        formType: "STD_NIVEAU",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    },
                    create: {
                        formTitle: "Niveau",
                        formType: "STD_NIVEAU",
                        formVersion: 1,
                        level_1: 3,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 3,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Echelon",
                            formType: "STD_ECHELON",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Echelon",
                        formType: "STD_ECHELON",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    },
                    create: {
                        formTitle: "Echelon",
                        formType: "STD_ECHELON",
                        formVersion: 1,
                        level_1: 4,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    }
                })
                await prisma.chapterForm.upsert({
                    where: {
                        bookLabel_level_1_level_2_level_3_formTitle_formType_formVersion: {
                            bookLabel: "Cahier des codes classifications",
                            level_1: 5,
                            level_2: 0,
                            level_3: 0,
                            formTitle: "Indice",
                            formType: "STD_INDICE",
                            formVersion: 1
                        }
                    },
                    update: {
                        formTitle: "Indice",
                        formType: "STD_INDICE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    },
                    create: {
                        formTitle: "Indice",
                        formType: "STD_INDICE",
                        formVersion: 1,
                        level_1: 5,
                        level_2: 0,
                        level_3: 0,
                        bookLabel: "Cahier des codes classifications",
                    }
                })
                await this.seedUpdateStatus("completed")
            }

        } catch (err) {
            console.log(err)
            await this.seedUpdateStatus("error")
        }
    }
}
export const bookV0004Seed = new BookV0004Seed("BOOK_V0004", "Cahier des classifications", 11, "BOOK_V0003")