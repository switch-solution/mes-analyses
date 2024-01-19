import { z } from 'zod';
export const clientFormSchema = z.object({
    socialReason: z.string().max(50, { message: "La raison sociale doit contenir au moins 2 caractères." }),
    siret: z.string().length(14),
    ape: z.string().length(5),
    address1: z.string().max(50, { message: "L'adresse doit contenir au moins 2 caractères." }),
    address2: z.string().max(50, { message: "L'adresse doit contenir au moins 2 caractères." }),
    address3: z.string().max(50, { message: "L'adresse doit contenir au moins 2 caractères." }),
    address4: z.string().max(50, { message: "L'adresse doit contenir au moins 2 caractères." }),
    city: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères." }),
    codeZip: z.string().length(5, { message: "Le code postal doit contenir 5 caractères." }),
    country: z.string().min(2, { message: "Le pays doit contenir au moins 2 caractères." }),

})

export const formSchema = z.object({
    clientId: z.string().min(2),
    email: z.string().email({
        message: "L'email doit être valide.",
    }),
    civility: z.string().min(2, {
        message: "La civilité doit contenir au moins 2 caractères.",
    }),
    firstname: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères.",
    }),
    lastname: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    })

})

export const RegisterSchema = z.object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    civility: z.string().min(2, {
        message: "La civilité doit contenir au moins 2 caractères.",
    }),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
});