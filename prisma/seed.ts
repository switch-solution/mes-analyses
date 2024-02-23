import { PrismaClient } from '@prisma/client'
import { formV0001Seed } from './seed/form.v0001.seed'
import { fakerSeed } from './seed/faker.seed'
import { idccV0001Seed } from './seed/idcc.v0001.seed'
import { settingV0001Seed } from './seed/setting.v0001.seed'
import { bookV0001Seed } from './seed/book.v0001.seed'
import { legalV0001Seed } from './seed/legal.v0001.seed'
import { chapterFormV0001Seed } from './seed/chapterForm.v0001.seed'
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

settingV0001Seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
formV0001Seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
idccV0001Seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
legalV0001Seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
bookV0001Seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
chapterFormV0001Seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })






if (NODE_ENV === 'development') {

    fakerSeed()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })


}


