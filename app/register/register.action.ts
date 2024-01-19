"use server";
import { z } from 'zod';
import { getUserByEmail } from "@/src/query/user.query";
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
const RegisterSchema = z.object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
});

export const createUser = async (formdata: FormData) => {

    const { firstname, lastname, email, password } = RegisterSchema.parse({
        firstname: formdata.get('firstname'),
        lastname: formdata.get('lastname'),
        email: formdata.get('email'),
        password: formdata.get('password'),
        confirmPassword: formdata.get('confirmPassword')
    });

    const user = await getUserByEmail(email);

    if (user) {
        throw new Error("L'utilisateur existe déjà");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email: email, name: `${lastname} ${firstname}`,
            UserOtherData: {
                create: { password: hashedPassword }
            }
        }
    })

    redirect('/api/auth/signin');


}