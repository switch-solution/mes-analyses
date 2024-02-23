import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/src/helpers/generateSlug'
import { getSoftwareBySlug } from './software.query'
import { getMySoftware } from './user.query'
import { getClientBySlug } from './client.query'
import { Prisma } from '@prisma/client'

export const createTypeRubrique = async (softwareSlug: string) => {
    try {
        const software = await getSoftwareBySlug(softwareSlug)
        if (!software) throw new Error("Ce logiciel n'existe pas.")
        await prisma.software_Setting.createMany({
            data: [
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Rémunération",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Rémunération`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Primes",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Primes`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "URSSAF",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-URSSAF`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Retraite",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Retraite`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Prévoyance",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Prévoyance`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Mutuelle",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Mutuelle`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Retraite supplémentaire",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Retraie supplémentaire"`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
                {
                    id: "RUBRIQUE_TYPE",
                    label: "Type de rubrique",
                    description: "Ce champ permet de définir le type de rubrique",
                    value: "Rubrique de net",
                    softwareLabel: software.label,
                    clientId: software.clientId,
                    slug: await generateSlug(`${software.clientId}-${software.label}-Rubrique de net"`),
                    createdBy: software.createdBy,
                    dateStart: new Date(),
                    dateEnd: new Date("4000-01-01"),
                    comment: "Valeur généré par le système"
                },
            ]
        })
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la création du type de rubrique")
    }

}

export const getSoftwareSettingFilterByUserSoftware = async (clientSlug: string) => {
    try {
        const softwares = await getMySoftware()
        const clientId = await getClientBySlug(clientSlug)
        const softwareSetting = await prisma.software_Setting.findMany({
            where: {
                softwareLabel: {
                    in: softwares.map(software => software.softwareLabel)
                },
                clientId: clientId.siren
            }
        })
        return softwareSetting
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des paramètres du logiciel.")
    }

}

export const getTypeRubrique = async (clientSlug: string) => {
    try {
        const clientId = await getClientBySlug(clientSlug)
        const type = await prisma.software_Setting.findMany({
            where: {
                clientId: clientId.siren,
                id: "RUBRIQUE_TYPE"
            }
        })
        return type
    } catch (err) {
        console.error(err)
        throw new Error("Une erreur est survenue lors de la récupération des types de rubriques.")
    }
}

export type getTypeRubrique = Prisma.PromiseReturnType<typeof getTypeRubrique>;

