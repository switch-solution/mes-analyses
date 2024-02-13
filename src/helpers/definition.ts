import { z } from 'zod';
export const ClientFormSchema = z.object({
    socialReason: z.string().max(50, { message: "La raison sociale doit contenir au moins 2 caractères." }),
    siren: z.string().length(9),
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
    description: z.string().min(1, { message: "La description doit contenir au moins 2 caractères." }),
})

export const SetupSchema = z.object({
    civility: z.string().min(1, { message: "La civilité doit contenir au moins 1 caractères." }),
    firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    siren: z.string().length(9),
    socialReason: z.string().max(50, { message: "La raison sociale doit contenir au moins 2 caractères." }),

})

export const StandardComposantSchema = z.object({
    title: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(50, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }).max(255, { message: "La description doit contenir au moins 2 caractères." }),
    clientId: z.string().min(1, { message: "Le client est obligatoire." }),
    softwareId: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    status: z.enum(['actif', 'archivé']),
    type: z.enum(['form', 'textarea', 'image']),
})

export const EventSchema = z.object({
    level: z.enum(['info', 'warning', 'error']),
    message: z.string().min(2, { message: "Le message doit contenir au moins 2 caractères." }),
    scope: z.enum(['client', 'standardAttachment', 'book', 'softwareItem', 'standardComposant', 'chapter', 'project', 'editor', 'user', 'software', 'contact', 'invitation', 'bookToProject', 'standardComposantSelectionOption', 'standardComposantInput', 'standardComposantSelectionOption', 'standardComposantInput', 'chapterStandardComposant', 'invoice']),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
})

export const SoftwareItemSchema = z.object({
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    type: z.enum(['Salaire de base', 'Prime', 'Cotisation', 'Rubrique de net']),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    idccCode: z.string().min(1, { message: "L'idcc est obligatoire." }),
    version: z.number().positive().optional(),
    base: z.string().optional(),
    rate: z.string().optional(),
    amount: z.string().optional(),
    status: z.enum(['actif', 'archivé']).optional(),
    softwareId: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    slug: z.string().optional(),

})

export const StandardAttachmentSchema = z.object({
    id: z.string().optional(),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    isObligatory: z.boolean(),
    softwareId: z.string().min(1, { message: "Le logiciel est obligatoire." }),

})

export const EnumTypeComponentSchema = z.object({
    type: z.enum(['text', 'number', 'date', 'textArea', 'select', 'file', 'switch', 'Image', 'dsnSocietySiren', 'dsnEstablishmentSiret', 'dsnEstablishmentApe', 'dsnSocietyAddress1', 'dsnSocietyAddress2', 'dsnSocietyAddress3', 'dsnSocietyZipCode', 'dsnSocietyCity', 'dsnEstablishmentAddress1', 'dsnEstablishmentAddress2', 'dsnEstablishmentAddress3', 'dsnEstablishmentZipCode', 'dsnEstablishmentCity', 'dsnJobLabel', 'dsnJobCode', 'dsnIdcc']),

})

export const StandardComposantInputSchema = z.object({
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }).max(50, { message: "Le label doit contenir au maximum 50 caractères." }),
    required: z.boolean().optional(),
    readonly: z.boolean().optional(),
    maxLength: z.coerce.number().int().positive().optional(),
    minLength: z.coerce.number().int().positive().optional(),
    maxValue: z.coerce.number().int().positive().optional(),
    minValue: z.coerce.number().int().positive().optional(),
    placeholder: z.string().optional(),
    multiple: z.boolean().optional(),
    order: z.coerce.number().int().positive(),
    isCode: z.boolean().optional(),
    isDescription: z.boolean().optional(),
    isLabel: z.boolean().optional(),

})

export const AttachmentSchema = z.object({
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    projectId: z.string().min(1, { message: "Le projet est obligatoire." }),
    file: z.instanceof(File)
})

export const StandardComposantSelectionOptionSchema = z.object({

    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }).max(50, { message: "Le label doit contenir au moins 2 caractères." }),
    value: z.string().min(2, { message: "La valeur doit contenir au moins 2 caractères." }).max(50, { message: "La valeur doit contenir au moins 2 caractères." }),
    selected: z.boolean().optional(),
    standard_ComposantId: z.string().min(1, { message: "Le composant est obligatoire." }),


})

export const ChapterFormSchema = z.object({
    level_1: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
            .number({ invalid_type_error: 'Le level doit etre un numerique' })
            .min(1)
            .max(99, { message: "Le level doit etre inferieur à 99." })
    ),
    level_2: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
            .number({ invalid_type_error: 'Le level doit etre un numerique' })
            .min(0)
            .max(99, { message: "Le level doit etre inferieur à 99." })
    ),
    level_3: z.preprocess(
        (args) => (args === '' ? undefined : args),
        z.coerce
            .number({ invalid_type_error: 'Le level doit etre un numerique' })
            .min(0)
            .max(99, { message: "Le level doit etre inferieur à 99." })
    ),

    label: z.string().min(1, { message: "Le label doit contenir au moins 2 caractères." }),
})
export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(new RegExp('.*[A-Z].*'))
        .regex(new RegExp('.*[a-z].*'))
        .regex(new RegExp('.*[0-9].*'))
        .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'))
        .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
    confirmPassword: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
});

export const ProfilSchema = z.object({
    firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
})
export const SoftwaresSchema = z.object({
    id: z.string().optional(),
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

export const ButtonDangerDeleteSchema = z.object({
    validation: z.string().regex(/oui/, { message: "La validation doit être 'oui'." }),
})

export const ContactSchema = z.object({
    id: z.string().optional(),
    clientId: z.string(),
    civility: z.string().min(1, { message: "La civilité doit contenir au moins 1 caractères." }),
    email: z.string().email(),
    phone: z.string().optional(),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),

})

export const ChapterStandardComposantSchema = z.object({
    chapterId: z.string(),
    standardComposantId: z.string(),

})

export const ProjectSchema = z.object({
    clientId: z.string().min(1, { message: "Le client est obligatoire." }),
    name: z.string().min(2, { message: "Le nom du projet doit contenir au moins 2 caractères." }),
    softwareId: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
})

export const BookToProjectSchema = z.object({
    projectId: z.string().min(1, { message: "Le projet est obligatoire." }),
    stdBookId: z.string().min(1, { message: "Le livre est obligatoire." }),
})

export const InvoiceShema = z.object({
    id: z.string().min(1, { message: "L'id est obligatoire." }),
    clientId: z.string().min(1, { message: "Le client est obligatoire." }),
    status: z.enum(['payé', 'en attante,', 'annulé']),
    dateStart: z.date(),
    dateEnd: z.date(),
    dateLimit: z.date(),
    amount: z.number().positive(),
    quantity: z.number().positive(),
})

export const CreateInvoiceSchema = z.object({
    date: z.string().min(1, { message: "La date est obligatoire." }),
})

