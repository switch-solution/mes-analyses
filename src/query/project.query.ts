import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";

export const getMyProjects = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const myProjects = await prisma.userProject.findMany({
            where: {
                userId: userId
            },
            include: {
                project: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return myProjects
    } catch (err) {
        console.log(err)
    }

}

export const copyBook = async (projectSlug: string) => {
    try {
        const project = await getProjectBySlug(projectSlug)
        if (!project) {
            throw new Error('Le projet n\'existe pas')
        }
        const softwareBooks = await prisma.software_Book.findMany({
            where: {
                softwareLabel: project.softwareLabel,
                clientId: project.clientId
            },
        })
        await prisma.project_Book.createMany({
            data: softwareBooks.map(book => {
                return {
                    label: book.label,
                    description: book.description,
                    clientId: book.clientId,
                    createdBy: project.createdBy,
                    projectLabel: project.label,
                    projectSoftwareLabel: project.softwareLabel,
                    slug: `${project.slug}-${book.slug}`,
                    isHold: true,
                    isStarted: false,
                    isValidate: false,
                    isModifiedAfertValidation: false,
                    isArchived: false,
                }
            })
        })
        const softwareChapters = await prisma.software_Chapter.findMany({
            where: {
                bookSoftwareLabel: {
                    in: softwareBooks.map(book => book.softwareLabel)
                },
                clientId: project.clientId
            }
        })
        await prisma.project_Chapter.createMany({
            data: softwareChapters.map(chapter => {
                return {
                    label: chapter.label,
                    level_1: chapter.level_1,
                    level_2: chapter.level_2,
                    level_3: chapter.level_3,
                    clientId: chapter.clientId,
                    bookLabel: chapter.bookLabel,
                    createdBy: project.createdBy,
                    projectLabel: project.label,
                    projectSoftwareLabel: project.softwareLabel,
                    slug: `${project.slug}-${chapter.bookLabel}-${chapter.slug}`,
                    parentId: chapter.parentId
                }
            })
        })

        const softwaresChapterComponent = await prisma.softwareChapterSoftwareComponent.findMany({
            where: {
                clientId: project.clientId,
                softwareLabel: project.softwareLabel,
                bookLabel: {
                    in: softwareBooks.map(book => book.label)
                }
            }
        })

        const softwaresComponent = await prisma.software_Component.findMany({
            where: {
                clientId: project.clientId,
                softwareLabel: project.softwareLabel,
                label: {
                    in: softwaresChapterComponent.map(chapterComponent => chapterComponent.componentLabel)
                }
            },
            include: {
                SoftwareChapterSoftwareComponent: true
            }
        })

        const softwaresInput = await prisma.software_Component_Input.findMany({
            where: {
                clientId: project.clientId,
                softwareLabel: project.softwareLabel,
                componentLabel: {
                    in: softwaresComponent.map(component => component.label)
                }
            },
            include: {
                Software_Component: {
                    include: {
                        SoftwareChapterSoftwareComponent: true
                    }

                }
            }
        })

        await prisma.projet_Component.createMany({
            data: softwaresComponent.map(component => {
                return {
                    label: component.label,
                    description: component.description,
                    type: component.type,
                    clientId: component.clientId,
                    bookLabel: component.SoftwareChapterSoftwareComponent[0].bookLabel,
                    chapterLevel_1: component.SoftwareChapterSoftwareComponent[0].level_1,
                    chapterLevel_2: component.SoftwareChapterSoftwareComponent[0].level_2,
                    chapterLevel_3: component.SoftwareChapterSoftwareComponent[0].level_3,
                    createdBy: project.createdBy,
                    projectSoftwareLabel: project.softwareLabel,
                    slug: `${project.slug}-${component.SoftwareChapterSoftwareComponent[0].bookLabel}-${component.SoftwareChapterSoftwareComponent[0].level_1}-${component.SoftwareChapterSoftwareComponent[0].level_2}-${component.SoftwareChapterSoftwareComponent[0].level_3}-${component.slug}`,
                    projectLabel: project.label
                }
            })
        })

        await prisma.project_Input.createMany({
            data: softwaresInput.map(input => {
                return {
                    type: input.type,
                    label: input.label,
                    dsnType: input.dsnType,
                    maxLength: input.maxLength,
                    minLength: input.minLength,
                    minValue: input.minValue,
                    maxValue: input.maxValue,
                    placeholder: input.placeholder,
                    order: input.order,
                    defaultValue: input.defaultValue,
                    required: input.required ? true : false,
                    readonly: input.readonly ? true : false,
                    inputSource: input.inputSource,
                    clientId: project.clientId,
                    multiple: input.multiple,
                    createdBy: project.createdBy,
                    projectLabel: project.label,
                    projectSoftwareLabel: project.softwareLabel,
                    bookLabel: input.Software_Component.SoftwareChapterSoftwareComponent[0].bookLabel,
                    chapterLevel_1: input.Software_Component.SoftwareChapterSoftwareComponent[0].level_1,
                    chapterLevel_2: input.Software_Component.SoftwareChapterSoftwareComponent[0].level_2,
                    chapterLevel_3: input.Software_Component.SoftwareChapterSoftwareComponent[0].level_3,
                }
            })
        })
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }

}


export const copyAttachment = async (projectSlug: string) => {
    try {
        const project = await getProjectBySlug(projectSlug)
        if (!project) {
            throw new Error('Le projet n\'existe pas')
        }
        const softwareAttachments = await prisma.software_Attachment.findMany({
            where: {
                softwareLabel: project.softwareLabel,
                clientId: project.clientId
            }
        })
        await prisma.project_Attachment.createMany({
            data: softwareAttachments.map(attachment => {
                return {
                    label: attachment.label,
                    description: attachment.description,
                    clientId: attachment.clientId,
                    createdBy: project.createdBy,
                    projectLabel: project.label,
                    projectSoftwareLabel: project.softwareLabel,
                    slug: `${project.slug}-${attachment.slug}`,
                    isObligatory: attachment.isObligatory,
                    isDelivered: false,
                    accept: attachment.accept,
                    multiple: attachment.multiple

                }
            })
        })

    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }
}

export const getProjectBySlug = async (projectSlug: string) => {
    try {
        const project = await prisma.project.findUniqueOrThrow({
            where: {
                slug: projectSlug
            }
        })
        return project
    } catch (err) {
        console.error(err)
        await prisma.logger.create({
            data: {
                level: "error",
                message: `L'utilisateur essaye d'accéder à un projet qui n'existe pas ${projectSlug}`,
                scope: "project",
                createdBy: "system"
            }
        })
        throw new Error('Une erreur est survenue lors de la récupération du projet')
    }
}

export const getCountMyProjects = async () => {
    try {
        const userId = await userIsValid()
        if (!userId) {
            throw new Error('Vous devez etre connecté')
        }
        const countMyProjects = await prisma.userProject.count({
            where: {
                userId: userId
            }
        })
        return countMyProjects
    } catch (err) {
        console.log(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }

}

export const getProjectsHome = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const countBook = await prisma.project_Book.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countUserProject = await prisma.userProject.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                projectClientId: projectExist.clientId
            }
        })
        const countAttachment = await prisma.project_Attachment.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId,
                isDelivered: false
            }
        })
        const countConstant = await prisma.project_Constant.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countItems = await prisma.project_Items.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        const countDsn = await prisma.dsn.count({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })

        return {
            countBook,
            countUserProject,
            countAttachment,
            countConstant,
            countItems,
            countDsn

        }
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }
}

export const getProjectBook = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const books = await prisma.project_Book.findMany({
            where: {
                projectLabel: projectExist.label,
                projectSoftwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }

        })
        return books
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }

}
