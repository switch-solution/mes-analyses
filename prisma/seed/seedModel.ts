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
export class Seed {

    constructor(
        protected name: string,
        protected description: string,
        protected order: number,
        protected previousLabel: string,

    ) {
        name = this.name
        description = this.description
        order = this.order
        previousLabel = this.previousLabel
    }


    async seedIsComplete() {
        const seedExist = await prisma.prisma_Seed.findFirst({
            where: {
                name: this.name,
                status: "completed",
            }
        })
        if (!seedExist) return false
        return true
    }

    async updateError(error: string) {
        await prisma.prisma_Seed.update({
            where: {
                name: this.name,
                order: this.order
            },
            data: {
                error
            },

        })
    }

    async previousSeedIsComplete() {
        if (this.order === 1) return true
        const previous = await prisma.prisma_Seed.findFirst({
            where: {
                order: this.order - 1,
                status: "completed",
                name: this.previousLabel
            }
        })
        if (!previous) {
            throw new Error(`Seed ${this.name} order ${this.order} error because : ${this.previousLabel} is not completed seed order ${this.order - 1}`)
            return false
        }
        return true
    }


    async seedUpdateStatus(status: string) {
        await prisma.prisma_Seed.upsert({
            where: {
                name: this.name
            },
            update: {
                name: this.name,
                createdBy: "system",
                status,
                description: this.description,
                order: this.order,
                previousLabel: this.previousLabel
            },
            create: {
                name: this.name,
                createdBy: "system",
                status,
                description: this.description,
                order: this.order,
                previousLabel: this.previousLabel
            }
        })
    }
    async run() {
        return
    }

}