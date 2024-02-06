"use server";

import { userIsValid } from "@/src/query/security.query";
import { prisma } from "@/lib/prisma";
import { createEvent } from "@/src/query/logger.query";
import type { Event, Value } from "@/src/helpers/type";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getStandardComponentById, getStdComponent } from "@/src/query/stdcomponent.query";
import { getLastVersionValuesByComponentId } from "@/src/query/sandboxValues.query";
export const createValues = async (componentId: string, formData: FormData) => {

    const userId = await userIsValid()
    if (!userId) throw new Error("Vous devez être connecté pour effectuer cette action.")
    const componentExist = await getStandardComponentById(componentId)
    if (!componentExist) throw new Error("Le composant n'existe pas.")
    const lastVesion = await getLastVersionValuesByComponentId(componentId)
    //const datas: Value[] = []
    formData.forEach(async (value, key) => {
        /** 
        let data = {
            value: value.toString(),
            Standard_Composant_InputId: key,
            createdBy: userId
        }
        datas.push(data)
 
        */
        await prisma.sandboxValues.create({
            data: {
                value: value.toString(),
                Standard_Composant_InputId: key,
                version: lastVesion ? lastVesion + 1 : 1,
                composantId: componentId,
                createdBy: userId
            }

        })

    })
    /** 
    await prisma.sandboxValues.createMany({
        data: datas

    })
    */
    const event: Event = {
        level: "info",
        message: `Test du composant ${formData.get("standardComposantId")}`,
        scope: "standardComposantInput",
        createdBy: userId
    }
    await createEvent(event)

    revalidatePath(`/editor/component/${componentId}/sandbox/}`);
    redirect(`/editor/component/${componentId}/sandbox/`);

}

