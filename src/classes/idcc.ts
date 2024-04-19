import { prisma } from "@/lib/prisma"
export class Idcc {

    idcc: string

    constructor(idcc: string) {
        this.idcc = idcc
    }

    async constant() {
        try {
            const constant = await prisma.constant_Legal.findMany({
                where: {
                    idccCode: this.idcc
                }
            })
            return constant
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }

    }

    async tableWage() {
        try {
            const tableWage = await prisma.table_Wage.findMany({
                where: {
                    idcc: this.idcc
                },
            })
            return tableWage
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async tableSeniority() {
        try {
            const tableSeniority = await prisma.table_Seniority.findMany({
                where: {
                    idcc: this.idcc
                },
            })
            return tableSeniority
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async tableKeeping() {
        try {
            const tableKeeping = await prisma.table_Keeping_Wage.findMany({
                where: {
                    idcc: this.idcc
                },
            })
            return tableKeeping
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }
    async classification(type: string) {
        try {
            const classification = await prisma.classification.findMany({
                where: {
                    idcc: this.idcc,
                    type: type
                }
            })
            return classification
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }

    }

    async tableKeepingRow(slug: string) {
        try {
            const tableKeepingRow = await prisma.table_Keeping_Wage.findMany({
                where: {
                    idcc: this.idcc,
                    slug: slug
                },
                include: {
                    Table_Keeping_Wage_Row: {
                        orderBy: {
                            minMonth: 'asc'
                        }
                    }
                }

            })
            const rows = tableKeepingRow.map((table) => {
                return table.Table_Keeping_Wage_Row.map((row) => {
                    return {
                        id: row.id,
                        label: row.label,
                        minMonth: row.minMonth,
                        maxMonth: row.maxMonth,
                        deficiency: row.deficiency,
                        pourcentage: row.pourcentage,
                        numberOfDay: row.numberOfDay
                    }
                })
            }).flat(2)
            return rows
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async tableWageRow(slug: string) {
        try {
            console.log('slug', slug)
            console.log('idcc', this.idcc)
            const tableWage = await prisma.table_Wage.findMany({
                where: {
                    idcc: this.idcc,
                    slug: slug
                },
                include: {
                    Table_Wage_Row: {
                        orderBy: {
                            value: 'asc'
                        }
                    }
                }

            })
            const rows = tableWage.map((table) => {
                return table.Table_Wage_Row.map((row) => {
                    return {
                        id: row.id,
                        label: row.label,
                        coefficient: row.coefficient,
                        position: row.position,
                        echelon: row.echelon,
                        value: row.value,
                        qualification: row.qualification,
                        indice: row.indice
                    }
                })
            }).flat(2)
            return rows
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async countElement() {
        try {
            const constant = await prisma.constant_Legal.count({
                where: {
                    idccCode: this.idcc
                }
            })
            const tableSeniority = await prisma.table_Seniority.count({
                where: {
                    idcc: this.idcc
                }
            })
            const tableWage = await prisma.table_Wage.count({
                where: {
                    idcc: this.idcc
                }
            })
            const tableKeeping = await prisma.table_Keeping_Wage.count({
                where: {
                    idcc: this.idcc
                }
            })
            const coefficient = await prisma.classification.count({
                where: {
                    idcc: this.idcc,
                    type: 'coefficient'
                }
            })
            const niveau = await prisma.classification.count({
                where: {
                    idcc: this.idcc,
                    type: 'niveau'
                }
            })
            const echelon = await prisma.classification.count({
                where: {
                    idcc: this.idcc,
                    type: 'echelon'
                }
            })
            const position = await prisma.classification.count({
                where: {
                    idcc: this.idcc,
                    type: 'position'
                }
            })
            const qualification = await prisma.classification.count({
                where: {
                    idcc: this.idcc,
                    type: 'qualification'
                }
            })
            return {
                constant,
                tableSeniority,
                tableWage,
                tableKeeping,
                coefficient,
                niveau,
                echelon,
                position,
                qualification

            }


        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }

    }
    async params() {
        try {
            const constant = await prisma.constant_Legal.findMany({
                where: {
                    idccCode: this.idcc
                }
            })
            const tableSeniority = await prisma.table_Seniority.findMany({
                where: {
                    idcc: this.idcc
                },
                include: {
                    Table_Seniority_Row: true
                }
            })
            const tableWage = await prisma.table_Wage.findMany({
                where: {
                    idcc: this.idcc
                },
                include: {
                    Table_Wage_Row: true
                }
            })
            const tableKeeping = await prisma.table_Keeping_Wage.findMany({
                where: {
                    idcc: this.idcc
                },
                include: {
                    Table_Keeping_Wage_Row: true
                }
            })
            const coefficient = await prisma.classification.findMany({
                where: {
                    idcc: this.idcc,
                    type: 'coefficient'
                }
            })
            const niveau = await prisma.classification.findMany({
                where: {
                    idcc: this.idcc,
                    type: 'niveau'
                }
            })
            const echelon = await prisma.classification.findMany({
                where: {
                    idcc: this.idcc,
                    type: 'echelon'
                }

            })
            const position = await prisma.classification.findMany({
                where: {
                    idcc: this.idcc,
                    type: 'position'
                }

            })
            const qualification = await prisma.classification.findMany({
                where: {
                    idcc: this.idcc,
                    type: 'qualification'
                }
            })
            return {
                constant,
                tableSeniority,
                tableWage,
                tableKeeping,
                coefficient,
                niveau,
                echelon,
                position,
                qualification
            }
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

}