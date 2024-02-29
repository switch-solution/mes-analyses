import { PrismaClient } from '@prisma/client'
import { formV0001Seed } from './seed/4_form.v0001.seed'
import { idccV0001Seed } from './seed/2_idcc.v0001.seed'
import { settingV0001 } from './seed/1_setting.v0001.seed'
import { bookV0001Seed } from './seed/3_book.v0001.seed'
import { formV0002Seed } from './seed/9_form.v0002.seed'
import { bookV0002Seed } from './seed/8_book.v0002.seed'
import { legalV0001Seed } from './seed/5_legal.v0001.seed'
import { chapterFormV0001Seed } from './seed/6_chapterForm.v0001.seed'
import { taskV0001Seed } from './seed/7_task.v0001.seed'
import { bookV0003Seed } from './seed/10_book.v0003.seed'
import { bookV0004Seed } from './seed/11_book.v0004.seed'
import { bookV0005Seed } from './seed/12_book.v0005.seed'
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

const main = async () => {
    console.log('Intégration settingV0001')
    await settingV0001.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration idccV0001Seed')
    await idccV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration bookV0001Seed')
    await bookV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration formV0001Seed')
    await formV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration legalV0001Seed')
    await legalV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration chapterFormV0001Seed')
    await chapterFormV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration taskV0001Seed')
    await taskV0001Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration bookV0002Seed')
    await bookV0002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration formV0002Seed')
    await formV0002Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration bookV0003Seed')
    await bookV0003Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration bookV0004Seed')
    await bookV0004Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    console.log('Intégration bookV0005Seed')
    await bookV0005Seed.run()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
}

main()