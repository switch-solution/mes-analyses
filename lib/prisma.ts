//https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@prisma/client'
import { env } from './env'
const prismaClientSingleton = () => {
    if (env.NODE_ENV === 'development') {
        return new PrismaClient({
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
        })
    } else {
        return new PrismaClient()
    }
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()


if (env.NODE_ENV !== 'production') globalThis.prisma = prisma