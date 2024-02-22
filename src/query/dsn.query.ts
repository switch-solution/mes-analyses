import { prisma } from "@/lib/prisma";
import { getProjectById } from "@/src/query/project.query"
export const getDsnByProjectId = async (projectId: string) => {
    try {
        const dsn = await prisma.dsn.findMany({
            where: {
                projectId: projectId
            }

        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des DSN')
    }

}

export const getDsnExist = async ({ projectId, siren, nic, month, fraction }: { projectId: string, siren: string, nic: string, month: string, fraction: string }) => {
    try {
        const dsn = await prisma.dsn.findFirst({
            where: {
                projectId: projectId,
                siren: siren,
                nic: nic,
                month: month,
                fraction: fraction
            }

        })
        return dsn
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des DSN')
    }
}

export const getDsnClientId = async ({ projectId, siren, nic, month, fraction }: { projectId: string, siren: string, nic: string, month: string, fraction: string }) => {
    try {
        const dsnExist = await getDsnExist({
            projectId, siren, nic, month, fraction
        })
        if (!dsnExist) {
            throw new Error('La DSN n\'existe pas')
        }
        const project = await getProjectById(projectId)
        if (!project) {
            throw new Error('Le projet n\'existe pas')
        }

        return project.clientId

    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des DSN')
    }

}

export const getDsnDatas = async ({ projectId, siren, nic, month, fraction }: { projectId: string, siren: string, nic: string, month: string, fraction: string }) => {
    try {
        const dsnExist = await getDsnExist({ projectId, siren, nic, month, fraction })
        if (!dsnExist) {
            throw new Error('La DSN n\'existe pas')
        }
        const datas = await prisma.dsn.findFirst({
            where: {
                projectId: projectId,
                siren: siren,
                nic: nic,
                month: month,
                fraction: fraction
            },
            include: {
                DsnEstablishment: {
                    include: {
                        DsnRateAt: true,
                        DsnContributionFund: true
                    }
                },
                DsnJob: true,
                DsnIdcc: true
            }

        })
        return datas
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des DSN')
    }

}