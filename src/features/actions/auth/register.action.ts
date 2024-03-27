"use server";
import { getUserByEmail } from "@/src/query/user.query";
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/src/helpers/definition';
import * as z from "zod"
import { getInvitation } from "@/src/query/invitation.query";
export const createUser = async (data: z.infer<typeof RegisterSchema>) => {
    const { email, password, confirmPassword } = data;
    const user = await getUserByEmail(email);
    if (password !== confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas')
    }
    if (user) {
        redirect('/api/auth/signin?callbackUrl=%2Fhome');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRegister = await prisma.user.create({
        data: {
            email: email,
            UserOtherData: {
                create: { password: hashedPassword, isBlocked: false }
            }
        }
    })

    const invitation = await getInvitation(email)
    /** 
    if (invitation) {
        await prisma.userClient.create({
            data: {
                clientId: invitation.clientId,
                userId: userRegister.id,
                isBillable: invitation.isBillable,
                isBlocked: invitation.isBlocked
            }
        })
    }
    */


    redirect('/api/auth/signin?callbackUrl=%2Fhome');

}