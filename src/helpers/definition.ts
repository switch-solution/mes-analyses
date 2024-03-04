import { s } from 'vitest/dist/reporters-MmQN-57K.js';
import { string, z } from 'zod';
import { zfd } from "zod-form-data";

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

export const ImportBookProjectSchema = z.object({
    projectSlug: z.string().min(1, { message: "Le projet est obligatoire." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    bookSlug: z.string().min(1, { message: "Le livre est obligatoire." }),
    label: z.string().min(1, { message: "Le nom du projet est obligatoire." }),
})

export const ClientEditFormSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    socialReason: z.string().max(50, { message: "La raison sociale doit contenir au moins 2 caractères." }),
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
    label: z.string().max(50, { message: "Le nom du livre doit contenir au moins 2 caractères." }),
    description: z.string().min(1, { message: "La description doit contenir au moins 2 caractères." }),
    status: z.enum(['actif', 'archivé']).optional(),
    softwareLabel: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
})
export const BookFormSchemaEdit = z.object({
    label: z.string().max(50, { message: "Le nom du livre doit contenir au moins 2 caractères." }),
    description: z.string().min(1, { message: "La description doit contenir au moins 2 caractères." }),
    status: z.enum(['actif', 'archivé']).optional(),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    bookSlug: z.string().min(1, { message: "Le livre est obligatoire." }),

})

export const SetupProfilSchema = z.object({
    civility: z.string().min(1, { message: "La civilité doit contenir au moins 1 caractères." }),
    firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
})

export const SetupClientSchema = z.object({
    socialReason: z.string().min(1, { message: "La raison sociale doit contenir au moins 1 caractères." }),
    siren: z.string().min(9, { message: "Le siren doit contenir au moins 9 caractères." }).max(9, { message: "Le prénom doit contenir au maximum 9 caractères." }),
})

export const SetupLegalSchema = z.object({
    cgv: z.boolean(),
    gdpr: z.boolean(),
})

export const StandardComposantSchema = z.object({
    label: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(50, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }).max(255, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    softwareLabel: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    status: z.enum(['actif', 'archivé']),
    type: z.enum(['form', 'textarea', 'image']),
})

export const StandardComposantEditSchema = z.object({
    label: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(50, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }).max(255, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    status: z.enum(['actif', 'archivé']),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),
})


export const EventSchema = z.object({
    level: z.enum(['info', 'warning', 'error', 'security']),
    message: z.string().min(2, { message: "Le message doit contenir au moins 2 caractères." }),
    scope: z.enum(['client', 'constant', 'dsn', 'administrator', 'standardAttachment', 'book', 'softwareItem', 'standardComponent', 'chapter', 'project', 'editor', 'user', 'software', 'contact', 'invitation', 'bookToProject', 'standardComposantSelectionOption', 'standardComposantInput', 'standardComposantSelectionOption', 'standardComposantInput', 'chapterStandardComposant', 'invoice']),
    clientId: z.string().optional(),
    projectLabel: z.string().optional(),
})

export const SoftwareItemCreateSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    type: z.string().min(1, { message: "Le type doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    idccCode: z.string().min(1, { message: "L'idcc est obligatoire." }),
    version: z.number().positive().optional(),
    base: z.string().optional(),
    rate: z.string().optional(),
    amount: z.string().optional(),
    status: z.enum(['actif', 'archivé']).optional(),
    softwareLabel: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    slug: z.string().optional(),
    employeeContribution: z.string().optional(),
    employerContribution: z.string().optional(),
    dateStart: z.date(),

})


export const StandardAttachmentCreateSchema = z.object({
    id: z.string().optional(),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    isObligatory: z.boolean(),
    softwareLabel: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    multiple: z.boolean().optional(),
    accept: z.enum(['pdf', 'excel', 'word', 'img', 'csv', 'txt']),
    deadline: z.coerce.number().positive()

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

export const ChapterFormCreateSchema = z.object({
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
    bookSlug: z.string().min(1, { message: "Le livre est obligatoire." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
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
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    slug: z.string().min(1, { message: "Le slug est obligatoire." }).optional(),
    label: z.string().min(2, { message: "Le nom du logiciel doit contenir au moins 2 caractères." }),
})

export const SoftwareConstantCreateSchema = z.object({
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    level: z.enum(['Logiciel', 'Idcc', 'Project']),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    value: z.string().min(1, { message: "La valeur doit contenir au moins 2 caractères." }),
    dateStart: z.date(),
    dateEnd: z.date(),
    idccCode: z.string(),
    softwareLabel: z.string(),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
})

export const SetupSoftwareSchema = z.object({
    label: z.string().min(2, { message: "Le nom du logiciel doit contenir au moins 2 caractères." }),
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

export const ChapterStandardComponenttSchema = z.object({
    chapterSlug: z.string(),
    standardComposantLabel: z.string(),
    clientSlug: z.string(),

})

export const ProjectCreateSchema = z.object({
    label: z.string().min(2, { message: "Le nom du projet doit contenir au moins 2 caractères." }),
    softwareLabel: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
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

export const AssociateSoftwareSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    email: z.string().min(1, { message: "L'utilisateur est obligatoire." }),
    isEditor: z.boolean(),
    softwareSlug: z.string().min(1, { message: "Le logiciel est obligatoire." }),

})

export const CreateTextAreaSchema = z.object({
    value: z.string().min(1, { message: "Le texte est obligatoire." }),
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),

})

export const CreateStdInputSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    type: string().min(1, { message: "Le type est obligatoire." }),
    label: z.string().min(1, { message: "Le label est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),

})

export const DeleteStdInputSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),
    id: z.string().min(1, { message: "L'id est obligatoire." }),
})

export const EdidStdInputSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),
    id: z.string().min(1, { message: "L'id est obligatoire." }),
    minLength: z.coerce.number().min(0).optional(),
    maxLength: z.coerce.number().max(9999).optional(),
    minValue: z.coerce.number().min(0).optional(),
    maxValue: z.coerce.number().max(9999).optional(), // Zod will coerce age to a number.
    placeholder: z.string().optional(),
    defaultValue: z.string().optional(),
    required: z.boolean().optional(),
    readonly: z.boolean().optional(),
    label: z.string().min(1, { message: "Le label est obligatoire." }),
    dsnType: z.string().optional(),
    otherData: z.string().optional(),
    formSource: z.string().optional(),
    inputSource: z.string().optional(),
    isCode: z.boolean().optional(),
    isDescription: z.boolean().optional(),
    isLabel: z.boolean().optional(),

})

export const UploadFileSchema = zfd.formData({
    projectSlug: zfd.text(z.string().min(1, { message: "Le projet est obligatoire." })),
    clientSlug: zfd.text(z.string().min(1, { message: "Le client est obligatoire." })),
    file: zfd.file()
});

export const DynamicFormSchema = z.object({
    clientSlug: z.string().min(1, { message: "Le client est obligatoire." }),
    projectSlug: z.string().min(1, { message: "Le projet est obligatoire." }),
    bookSlug: z.string().min(1, { message: "Le livre est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),
    value: z.string().optional(),
    label: z.string().min(1, { message: "Le label est obligatoire." }),
})