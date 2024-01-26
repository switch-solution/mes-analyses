import { z } from 'zod';
export const ClientFormSchema = z.object({
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

export const BookFormSchema = z.object({
    name: z.string().max(50, { message: "Le nom du livre doit contenir au moins 2 caractères." }),
    status: z.enum(['actif', 'archivé']),
    softwareId: z.string().min(1, { message: "Le logiciel est obligatoire." }),
})

export const StandardComposantSchema = z.object({
    title: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(50, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }).max(255, { message: "La description doit contenir au moins 2 caractères." }),
    clientId: z.string().min(1, { message: "Le client est obligatoire." }),
    softwareId: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    status: z.enum(['actif', 'archivé']),

})

export const StandardComposantInputSchema = z.object({
    type: z.enum(['text', 'number', 'date', 'textarea', 'select', 'radio', 'checkbox', 'file']),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }).max(50, { message: "Le label doit contenir au moins 2 caractères." }),
    required: z.boolean().optional(),
    readonly: z.boolean().optional(),
    maxLength: z.coerce.number().int().positive().optional(),
    minLength: z.coerce.number().int().positive().optional(),
    placeholder: z.string().optional(),
    order: z.coerce.number().int().positive(),
    standard_ComposantId: z.string().min(1, { message: "Le composant est obligatoire." }),

    /**
    minValue: z.coerce.number().int().positive().optional(),
    maxValue: z.coerce.number().int().positive().optional(),

*/
})

export const ChapterFormSchema = z.object({
    bookId: z.string().min(1, { message: "Le livre est obligatoire." }),
    level: z.string().min(1, { message: "Le niveau doit contenir au moins 2 caractères." }),
    label: z.string().min(1, { message: "Le label doit contenir au moins 2 caractères." }),
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),
    civility: z.string().min(1, {
        message: "La civilité doit contenir au moins 2 caractères.",
    }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
    confirmPassword: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
});

export const SoftwaresSchema = z.object({
    provider: z.string().min(2, { message: "Le nom du fournisseur doit contenir au moins 2 caractères." }),
    name: z.string().min(2, { message: "Le nom du logiciel doit contenir au moins 2 caractères." }),
    clientId: z.string().min(1, { message: "Le client id est obligatoire." })
})

export const InvitationSchema = z.object({
    clientId: z.string().uuid(),
    civility: z.string().min(1, { message: "La civilité doit contenir au moins 1 caractères." }),
    email: z.string().email(),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),

})