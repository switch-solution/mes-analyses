"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserDeleteSchema, UserEditSchema, ProfilEditCgvSchema } from '@/src/helpers/definition';
import z from "zod";
import { ActionError, authentifcationAction } from "@/lib/safe-actions";
import { faker } from '@faker-js/faker';
import { cookies } from 'next/headers'

export const editUser = authentifcationAction(UserEditSchema, async (values: z.infer<typeof UserEditSchema>, userId) => {
    const { firstname, lastname, civility } = UserEditSchema.parse(values)
    try {
        await prisma.userOtherData.update({
            where: {
                userId
            },
            data: {
                firstname,
                lastname,
                civility
            }
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
    revalidatePath(`/profile`)
    redirect(`/profile`)

})

export const editCgv = authentifcationAction(ProfilEditCgvSchema, async (values: z.infer<typeof ProfilEditCgvSchema>, userId) => {
    const { cgv } = ProfilEditCgvSchema.parse(values)
    try {
        await prisma.userOtherData.update({
            where: {
                userId
            },
            data: {
                cgv
            }
        })

    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)

    }
    revalidatePath(`/home`)
    redirect(`/home`)
})

export const deleteUser = authentifcationAction(UserDeleteSchema, async (values: z.infer<typeof UserDeleteSchema>, userId) => {
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                image: faker.image.avatar(),
            }
        })
        await prisma.userOtherData.update({
            where: {
                userId: userId
            },
            data: {
                isBlocked: true,
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
            }
        })
        const accout = await prisma.account.findFirst({
            where: {
                userId
            }
        })
        if (!accout) {
            throw new ActionError("Account not found")
        }
        await prisma.account.delete({
            where: {
                provider_providerAccountId: {
                    provider: accout.provider,
                    providerAccountId: accout.providerAccountId

                },
                userId: accout.userId
            }
        })
        const cookieStore = cookies()
        const cookieList = cookieStore.getAll()
        cookieList.forEach(cookie => {
            cookieStore.delete(cookie.name)
        })
    } catch (err: unknown) {
        console.error(err)
        throw new ActionError(err as string)
    }
})
