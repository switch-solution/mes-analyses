"use server";

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getAuthSession } from '@/lib/auth';
import { clientFormSchema } from "@/src/helpers/definition";


export const createClient = async (formdata: FormData) => {

    const session = await getAuthSession();
    if (!session) throw new Error("Vous devez être connecté pour effectuer cette action.");

    const userId = session.user.id;
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")


    const { siret, ape, address1, address2, address3, address4, city, codeZip, country, socialReason } = clientFormSchema.parse({
        siret: formdata.get('siret'),
        ape: formdata.get('ape'),
        address1: formdata.get('address1'),
        address2: formdata.get('address2'),
        address3: formdata.get('address3'),
        address4: formdata.get('address4'),
        city: formdata.get('city'),
        codeZip: formdata.get('codeZip'),
        country: formdata.get('country'),
        socialReason: formdata.get('socialReason')
    })

    if (siret && socialReason) {
        const searchClient = await prisma.client.findFirst({
            where: {
                OR: [
                    { siret: siret },
                    { socialReason: socialReason }
                ]
            }
        })
        if (searchClient) {
            redirect(`/client/${socialReason}`);
        }
    }


    try {
        const data = await prisma.client.create({
            data: {
                socialReason: socialReason,
                siret: siret,
                ape: ape,
                address1: address1,
                address2: address2,
                address3: address3,
                address4: address4,
                city: city,
                codeZip: codeZip,
                country: country,
                billingAddress1: address1,
                billingAddress2: address2,
                billingAddress3: address3,
                billingAddress4: address4,
                billingCountry: country,
                billingCity: city,
                billingCodeZip: codeZip,
                isBlocked: false,
                dateStartTrial: new Date(),
                dateEndTrial: new Date(),
                createdBy: userId,
                UserClient: {
                    create: {
                        userId: userId,
                        isBlocked: false,
                        isBillable: true,
                        isAdministrator: true,

                    }

                }

            }
        })
        revalidatePath('/client/');
        redirect(`/client/${data.id}`);
    } catch (e) {
        console.error(e)
        throw new Error("Une erreur est survenue lors de la création du client.")
    }



}