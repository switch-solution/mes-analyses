import { prisma } from "@/lib/prisma";
import { userIsValid } from "./security.query";
import { syncGenerateSlug } from "@/src/helpers/generateSlug";
import { getCountComponent } from "@/src/query/project_component.query";
import { Prisma } from '@prisma/client'
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

export const getProjectTasks = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const tasks = await prisma.project_Task.findMany({
            where: {
                projectLabel: projectExist.label,
                softwareLabel: projectExist.softwareLabel,
                clientId: projectExist.clientId
            }
        })
        return tasks
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }
}

export const getUsersProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const userProjects = await prisma.userProject.findMany({
            where: {
                projectLabel: projectExist.label,
                projectClientId: projectExist.clientId
            },
            include: {
                user: {
                    include: {
                        UserOtherData: true
                    }
                }
            }
        })
        return userProjects
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des tâches')
    }

}

export type getUsersProject = Prisma.PromiseReturnType<typeof getUsersProject>;



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
        const countBook = await prisma.project_Book.count()
        const bookNumber = `00000000000000000000${countBook ? countBook + 1 : 1}`
        const bookSlug = `${bookNumber.slice(-10)}`
        await prisma.project_Book.createMany({
            data: softwareBooks.map(book => {
                let slug = syncGenerateSlug(`${bookSlug}-${book.label}`)
                return {
                    label: book.label,
                    description: book.description,
                    clientId: book.clientId,
                    createdBy: project.createdBy,
                    projectLabel: project.label,
                    projectSoftwareLabel: project.softwareLabel,
                    slug,
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
        const incrementInputSlug = await getCountComponent()
        let count = incrementInputSlug
        const datas = softwaresComponent.map(component => {
            count += 1
            let slug = syncGenerateSlug(`00000000000000000000${count}`)
            return {
                label: component.label,
                description: component.description,
                type: component.type,
                buttonLabel: component.buttonLabel,
                clientId: component.clientId,
                bookLabel: component.SoftwareChapterSoftwareComponent[0].bookLabel,
                chapterLevel_1: component.SoftwareChapterSoftwareComponent[0].level_1,
                chapterLevel_2: component.SoftwareChapterSoftwareComponent[0].level_2,
                chapterLevel_3: component.SoftwareChapterSoftwareComponent[0].level_3,
                createdBy: project.createdBy,
                isForm: component.isForm,
                isImage: component.isImage,
                isTextArea: component.isTextArea,
                projectSoftwareLabel: project.softwareLabel,
                slug: slug.slice(-10),
                projectLabel: project.label
            }
        })

        await prisma.project_Component.createMany({
            data: datas
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
                    otherData: input.otherData,
                    placeholder: input.placeholder,
                    order: input.order,
                    componentLabel: input.componentLabel,
                    isCode: input.isCode,
                    isLabel: input.isLabel,
                    isDescription: input.isDescription,
                    defaultValue: input.defaultValue,
                    required: input.required ? true : false,
                    readonly: input.readonly ? true : false,
                    inputSource: input.inputSource,
                    clientId: project.clientId,
                    multiple: input.multiple,
                    createdBy: project.createdBy,
                    projectLabel: project.label,
                    projectSoftwareLabel: project.softwareLabel,
                    formSource: input.formSource,
                    dsnItem: input.dsnItem,
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

export const copyTask = async (projectSlug: string) => {
    try {
        //add task
        const project = await getProjectBySlug(projectSlug)
        if (!project) {
            throw new Error('Le projet n\'existe pas')
        }
        const softwareTasks = await prisma.software_Task.findMany({
            where: {
                softwareLabel: project.softwareLabel,
                clientId: project.clientId
            }
        })
        let countTasks = await prisma.project_Task.count()
        const taskNumber = `00000000000000000000${countTasks ? countTasks + 1 : 1}`
        const taskSlug = `${taskNumber.slice(-10)}`
        const projectsTask = softwareTasks.map(task => {
            const slug = syncGenerateSlug(`${taskSlug}-${task.label}`)
            return {
                label: task.label,
                description: task.description,
                softwareLabel: task.softwareLabel,
                message: "",
                status: 'actif',
                createdBy: project.createdBy,
                dateStart: new Date(),
                deadline: new Date(),
                level: task.level,
                owner: project.createdBy,
                clientId: project.clientId,
                projectLabel: project.label,
                isUpload: task.isUpload,
                isSwitch: task.isSwitch,
                slug,
                accept: task.accept,
            }
        })
        await prisma.project_Task.createMany({
            data: projectsTask
        }
        )
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

export const getValidatorProject = async (projectSlug: string) => {
    try {
        const projectExist = await getProjectBySlug(projectSlug)
        if (!projectExist) {
            throw new Error('Le projet n\'existe pas')
        }
        const userProjectsValidator = await prisma.userProject.findMany({
            where: {
                projectLabel: projectExist.label,
                projectClientId: projectExist.clientId,
                isValidator: true
            }
        })
        return userProjectsValidator
    } catch (err) {
        console.error(err)
        throw new Error('Une erreur est survenue lors de la récupération des projets')
    }

}
