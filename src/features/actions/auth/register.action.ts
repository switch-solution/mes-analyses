"use server";
import { getUserByEmail } from "@/src/query/user.query";
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/src/helpers/definition';
import * as z from "zod"


export const createUser = async (data: z.infer<typeof RegisterSchema>) => {
    const { email, civility, firstname, lastname, password, confirmPassword } = data;
    const user = await getUserByEmail(email);

    if (user) {
        throw new Error("L'utilisateur existe déjà");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.create({
        data: {
            email: email, name: `${lastname} ${firstname}`,
            UserOtherData: {
                create: { password: hashedPassword, civility: civility, isBlocked: false }
            }
        }
    })

    redirect('/api/auth/signin');


}