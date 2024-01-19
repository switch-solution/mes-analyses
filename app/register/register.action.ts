"use server";
import { getUserByEmail } from "@/src/query/user.query";
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/src/helpers/definition';

export const createUser = async (formdata: FormData) => {

    const { firstname, lastname, email, password, civility } = RegisterSchema.parse({
        firstname: formdata.get('firstname'),
        civivity: formdata.get('civility'),
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
                create: { password: hashedPassword, civility: civility }
            }
        }
    })

    redirect('/api/auth/signin');


}