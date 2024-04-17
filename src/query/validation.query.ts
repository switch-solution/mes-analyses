import { prisma } from "@/lib/prisma"

export const getValidationStatus = async (clientSlug: string) => {
    try {
        const validationGroupBy = await prisma.project_Approve.groupBy({
            by: ["rowSlug"],
            where: {
                clientSlug: clientSlug
            }
        })


        const countPendingList: { rowSlug: string, count: number }[] = []
        const countApprovedList: { rowSlug: string, count: number }[] = []
        const countRefusedList: { rowSlug: string, count: number }[] = []
        const validationDetailList: { projectLabel: string, description: string, theme: string, rowSlug: string }[] = []
        for (const validation of validationGroupBy) {
            let detail = await prisma.project_Approve.findMany({
                where: {
                    clientSlug: clientSlug,
                    rowSlug: validation.rowSlug
                },
                select: {
                    projectLabel: true,
                    description: true,
                    theme: true,
                    rowSlug: true,

                }
            })
            validationDetailList.push(...detail)

            let countPending = await prisma.project_Approve.count({
                where: {
                    clientSlug: clientSlug,
                    isApproved: false,
                    isRefused: false,
                    rowSlug: validation.rowSlug
                },
            })
            countPendingList.push({
                rowSlug: validation.rowSlug,
                count: countPending
            })
            let countApproved = await prisma.project_Approve.count({
                where: {
                    clientSlug: clientSlug,
                    isApproved: true,
                    rowSlug: validation.rowSlug
                },

            })
            countApprovedList.push({
                rowSlug: validation.rowSlug,
                count: countApproved
            })
            let countRefused = await prisma.project_Approve.count({

                where: {
                    clientSlug: clientSlug,
                    isRefused: true,
                    rowSlug: validation.rowSlug
                },


            })
            countRefusedList.push({
                rowSlug: validation.rowSlug,
                count: countRefused
            })
        }


        return {
            validationGroupBy,
            countPendingList,
            countRefusedList,
            countApprovedList,
            validationDetailList
        }
    } catch (error) {
        console.error(error)
        throw new Error("Erreur lors de la récupération des données de validation")
    }

}

export const validationDetail = async (rowSlug: string) => {
    try {
        const detail = await prisma.project_Approve.findMany({
            where: {
                rowSlug: rowSlug
            },
            select: {
                isApproved: true,
                isRefused: true,
                User: {
                    include: {
                        UserOtherData: {
                            select: {
                                firstname: true,
                                lastname: true,
                            }
                        }
                    }
                }
            }
        })
        return detail
    } catch (error) {
        console.error(error)
        throw new Error("Erreur lors de la récupération des données de validation")
    }



}