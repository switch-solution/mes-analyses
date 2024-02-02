"use server";
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { ProjectSchema, BookToProjectSchema } from '@/src/helpers/definition';
import { userIsValid, userIsAuthorizeToAddBookInProject } from '@/src/query/security.query';
import { getBookByIdIncludeChapterIncludeComposant } from '@/src/query/standard_book.query';

export const createProjet = async (values: z.infer<typeof ProjectSchema>) => {
    const { name, description, softwareId, clientId } = ProjectSchema.parse(values)
    const userId = await userIsValid()
    let project = null
    try {
        project = await prisma.project.create({
            data: {
                name: name,
                description: description,
                softwareId: softwareId,
                clientId: clientId,
                createdBy: userId,
                status: 'actif',
                UserProject: {
                    create: {
                        userId: userId,
                        isAdmin: true,
                        isEditor: true,
                        isValidator: true,
                        createdBy: userId,
                    }
                }
            },
        })
    } catch (error) {
        console.log(error)
    }
    revalidatePath(`/project/`);

    redirect(`/project/${project?.id}`);

}

export const copyBookToProject = async (values: z.infer<typeof BookToProjectSchema>) => {
    const { projectId, stdBookId } = BookToProjectSchema.parse(values)
    const userId = await userIsValid()
    const userIsAuthorize = await userIsAuthorizeToAddBookInProject(projectId)
    if (!userIsAuthorize) {
        throw new Error("Vous n'êtes pas autorisé à ajouter un livre dans ce projet.")
    }
    try {
        const standardBook = await getBookByIdIncludeChapterIncludeComposant(stdBookId)
        if (!standardBook) {
            throw new Error("Le livre n'existe pas.")
        }
        standardBook.StandardChapter.at(0)?.ChapterStdComposant.at(0)?.standardComposant.Standard_Composant_Input.at(0)?.id
        const book = {
            name: standardBook.name,
            description: standardBook.description,
            createBy: userId,
            status: 'Actif',
            projectId: projectId,
        }
        const bookId = await prisma.book.create({
            data: {
                projectId: projectId,
                name: book.name,
                description: book.description,
                status: book.status,
                createdBy: book.createBy,

            }

        })

        const inputs = []
        for (let std_chapter of standardBook.StandardChapter) {
            for (let stdChapterComposant of std_chapter.ChapterStdComposant) {

                for (let stdComposantInput of stdChapterComposant.standardComposant.Standard_Composant_Input) {
                    inputs.push({
                        type: stdComposantInput.type,
                        label: stdComposantInput.label,
                        maxLength: stdComposantInput.maxLength,
                        minLength: stdComposantInput.minLength,
                        minValue: stdComposantInput.minValue,
                        maxValue: stdComposantInput.maxValue,
                        placeholder: stdComposantInput.placeholder,
                        order: stdComposantInput.order,
                        defaultValue: stdComposantInput.defaultValue,
                        required: stdComposantInput.required,
                        readonly: stdComposantInput.readonly,
                        multiple: stdComposantInput.multiple,
                        textArea: stdComposantInput.textArea,
                        createdBy: userId,
                    })
                }//Create inputs
                /** 
                await prisma.chapter.create({
                    data: {
                        label: std_chapter.label,
                        level: std_chapter.level,
                        createdBy: userId,
                        bookId: bookId.id,
                        Composant: {
                            create: {
                                title: stdChapterComposant.standardComposant.title,
                                description: stdChapterComposant.standardComposant.description,
                                createdBy: userId,
                                Input: {
                                    create: inputs
                                }
                            },
                        },

                    }
                })
                */

            }//Create composant


        }
        try {

        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la recopie des chapitres.')
        }



    } catch (err) {
        console.log(err)
        throw new Error('Impossible de copier le livre dans le projet.')
    }
    revalidatePath(`/project/${projectId}`);

    //redirect(`/project/${projectId}`);
}