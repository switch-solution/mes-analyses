import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from "@faker-js/faker"
import { generateSlug } from './../../src/helpers/generateSlug'
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

const NODE_ENV = process.env.NODE_ENV

export const fakerSeed = async () => {
    try {


        const SEED_NAME = "fakerSeed"
        const seedExist = await prisma.prisma_Seed.findFirst({
            where: {
                name: SEED_NAME,
                status: "completed"
            }
        })

        if (!seedExist) {
            await prisma.prisma_Seed.upsert({
                where: {
                    name: SEED_NAME
                },
                update: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                },
                create: {
                    name: SEED_NAME,
                    createdBy: "system",
                    status: "pending"
                }
            })
            await prisma.user.deleteMany()
            await prisma.client.deleteMany()

            const users = []

            for (let i = 0; i < 100; i++) {
                const user = {
                    username: faker.internet.userName(),
                    image: faker.image.avatar(),
                    name: faker.person.firstName(),
                    email: faker.internet.email(),
                } satisfies Prisma.UserCreateInput
                const dbUser = await prisma.user.create({
                    data: {
                        ...user,
                        UserOtherData: {
                            create: {
                                isBlocked: false,
                                firstname: faker.person.firstName(),
                                lastname: faker.person.lastName(),
                                civility: faker.person.prefix(),
                                cgv: true,
                                gdpr: true,
                            }
                        }
                    }
                })

                users.push(dbUser)
            }

            const clients = []

            for (let i = 0; i < 10; i++) {
                const client = {
                    slug: await generateSlug(faker.company.name()),
                    socialReason: faker.company.name(),
                    siren: faker.string.uuid(),
                    isBlocked: false,
                    createdBy: 'faker'
                } satisfies Prisma.ClientCreateInput
                const dbClient = await prisma.client.create({ data: client })
                clients.push(dbClient)
            }

            const usersClients = []

            for (let i = 0; i < 120; i++) {
                const randomUserIndex = faker.number.int({
                    min: 0,
                    max: users.length - 1
                })
                const randomClientIndex = faker.number.int({
                    min: 0,
                    max: clients.length - 1
                })
                const userId = users[randomUserIndex].id
                const clientId = clients[randomClientIndex].siren
                const userClient = {
                    userId,
                    clientId,
                    isAdministrator: faker.datatype.boolean(),
                    isActivated: faker.datatype.boolean(),
                    isBillable: faker.datatype.boolean(),
                    isBlocked: false,
                    isEditor: faker.datatype.boolean(),

                }
                const dbUserClient = await prisma.userClient.upsert({
                    where: {
                        userId_clientId: {
                            userId,
                            clientId
                        }
                    },
                    update: userClient,
                    create: userClient
                })
                usersClients.push(dbUserClient)
            }

            const softwares = []

            for (let i = 0; i < 20; i++) {
                const randomClientIndex = faker.number.int({
                    min: 0,
                    max: clients.length - 1
                })
                const software = {
                    label: faker.commerce.productName(),
                    slug: await generateSlug(faker.commerce.productName()),
                    clientId: clients[randomClientIndex].siren,
                    createdBy: 'faker'
                }
                const dbSoftware = await prisma.software.create({ data: software })
                softwares.push(dbSoftware)
            }

            for (let i = 0; i < 150; i++) {
                const randomUserIndex = faker.number.int({
                    min: 0,
                    max: users.length - 1
                })
                const randomSoftwareIndex = faker.number.int({
                    min: 0,
                    max: clients.length - 1
                })
                const userId = users[randomUserIndex].id
                const softwareClientId = softwares[randomSoftwareIndex].clientId
                const softwareLabel = softwares[randomSoftwareIndex].label
                const userSoftware = {
                    userId,
                    softwareClientId,
                    isEditor: faker.datatype.boolean(),
                    softwareLabel,
                    createdBy: 'faker'

                }
                const dbUserClient = await prisma.userSoftware.upsert({
                    where: {
                        userId_softwareLabel_softwareClientId: {
                            userId,
                            softwareClientId,
                            softwareLabel
                        }
                    },
                    update: userSoftware,
                    create: userSoftware
                })
                usersClients.push(dbUserClient)
            }


            await prisma.prisma_Seed.update({
                where: {
                    name: SEED_NAME
                },
                data: {

                    status: "completed"
                }
            })

        }
    } catch (e) {
        console.error(e)
        await prisma.prisma_Seed.update({
            where: {
                name: "fakerSeed"
            },
            data: {
                status: "error"
            }
        })
    }
}
