import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'

export const getIdccByCode = async (code: string) => {
    try {
        const idcc = await prisma.idcc.findFirstOrThrow({
            where: {
                code: code
            }
        })
        return idcc
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de l'IDCC")
    }

}


export const getConstantByIdcc = async (idcc: string) => {
    try {
        const idccExist = getIdccByCode(idcc)
        if (!idccExist) {
            throw new Error("IDCC non trouvé")
        }
        const constants = await prisma.idcc.findMany({
            where: {
                code: idcc
            },
            include: {
                ConstantLegal: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                },
                Client_Constant_Legal: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                },
                Software_Constant_Legal: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                }
            },
        })
        return constants
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des constantes")
    }

}

export const getTableAgeByIdcc = async (idcc: string) => {
    try {
        const idccExist = getIdccByCode(idcc)
        if (!idccExist) {
            throw new Error("IDCC non trouvé")
        }
        const tables = await prisma.idcc.findMany({
            where: {
                code: idcc
            },
            include: {
                Table_Age: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                },
                Client_Table_Age: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                },
                Software_Table_Age: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                }
            },
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des tables des ages")
    }

}

export const getTableWageByIdcc = async (idcc: string) => {
    try {
        const idccExist = getIdccByCode(idcc)
        if (!idccExist) {
            throw new Error("IDCC non trouvé")
        }
        const tables = await prisma.idcc.findMany({
            where: {
                code: idcc
            },
            include: {
                Table_Wage: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                },
                Client_Table_Wage: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                },
                Software_Table_Wage: {
                    orderBy: [
                        {
                            id: 'asc'
                        }
                    ]
                }
            },
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des salaires")
    }

}

export const getTableSeniorityByIdcc = async (idcc: string) => {
    try {
        const idccExist = getIdccByCode(idcc)
        if (!idccExist) {
            throw new Error("IDCC non trouvé")
        }
        const tables = await prisma.idcc.findMany({
            where: {
                code: idcc
            },
            include: {
                Table_Seniority: {
                    orderBy: [

                        {
                            id: 'asc'
                        }
                    ]
                },
                Client_Table_Seniority: {
                    orderBy: [

                        {
                            id: 'asc'
                        }
                    ]
                },
                Software_Table_Seniority: {
                    orderBy: [

                        {
                            id: 'asc'
                        }
                    ]
                }
            },
        })
        return tables
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération des anciennetés")
    }

}

export const getClassificationByIdcc = async (idcc: string) => {
    try {
        const idccExist = getIdccByCode(idcc)
        if (!idccExist) {
            throw new Error("IDCC non trouvé")
        }
        const classification = await prisma.idcc.findMany({
            where: {
                code: idcc
            },
            include: {
                Classification: {
                    orderBy: [
                        {
                            type: 'asc'
                        },
                        {
                            id: 'asc'
                        }
                    ]
                },
                Client_Classification: {
                    orderBy: [
                        {
                            type: 'asc'
                        },
                        {
                            id: 'asc'
                        }
                    ]
                },
                Software_Classification: {
                    orderBy: [
                        {
                            type: 'asc'
                        },
                        {
                            id: 'asc'
                        }
                    ]
                }
            },
        })
        return classification
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de l'IDCC")

    }
}

export const getIdcc = async () => {
    try {
        const idcc = await prisma.idcc.findMany()
        return idcc
    } catch (err) {
        console.error(err)
        throw new Error("Erreur lors de la récupération de l'IDCC")
    }
}

export type getIdcc = Prisma.PromiseReturnType<typeof getIdcc>;


