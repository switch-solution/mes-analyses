"use server";

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ClientFormSchema } from "@/src/helpers/definition";
import { userIsValid } from '@/src/query/security.query';

export const createClient = async (formdata: FormData) => {
    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")

    const { siren, ape, address1, address2, address3, address4, city, codeZip, country, socialReason } = ClientFormSchema.parse({
        siren: formdata.get('siren'),
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


    let clientId = undefined
    try {
        const currentDate = new Date();
        const add90Days = new Date(currentDate.setDate(currentDate.getDate() + 90))

        clientId = await prisma.client.create({
            data: {
                socialReason: socialReason,
                siren: siren,
                ape: ape,
                address1: address1,
                address2: address2,
                address3: address3,
                address4: address4,
                city: city,
                codeZip: codeZip,
                country: country,
                invoiceAddress1: address1,
                invoiceAddress2: address2,
                invoiceAddress3: address3,
                invoiceAddress4: address4,
                invoiceCountry: country,
                invoiceCity: city,
                invoiceCodeZip: codeZip,
                isBlocked: false,
                dateStartTrial: new Date(),
                dateEndTrial: add90Days,
                createdBy: userId,
                UserClient: {
                    create: {
                        userId: userId,
                        isBlocked: false,
                        isBillable: true,
                        isAdministrator: true,
                        isEditor: true,

                    }

                }

            }
        })

    } catch (e) {
        console.error(e)
        throw new Error("Une erreur est survenue lors de la création du client.")
    }

    revalidatePath(`/client/${clientId}`);
    redirect(`/client/${clientId}`);

}