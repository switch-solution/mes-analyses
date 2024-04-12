"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { UserCreateSchema, UserEditSchema } from '@/src/helpers/definition';
import z from "zod";
import { ActionError, authentifcationAction, authentificationActionUserIsAdminClient } from "@/lib/safe-actions";


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
    revalidatePath(`/profil`)
    redirect(`/profil`)

})