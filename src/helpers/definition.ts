import { z } from 'zod';
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


export const ContributionCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    baseType: z.string({ required_error: "Le type de base est obligatoire." }),
    base: z.string({ required_error: "Le type de base est obligatoire." }),
    rateTypeEmployee: z.string({ required_error: "Le type de base est obligatoire." }),
    rateTypeEmployer: z.string({ required_error: "Le type de base est obligatoire." }),
    rateEmployee: z.string({ required_error: "Le type de base est obligatoire." }),
    rateEmployer: z.string({ required_error: "Le type de base est obligatoire." }),
})

export const ContributionEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    slug: z.string({ required_error: "Le slug est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    baseType: z.string({ required_error: "Le type de base est obligatoire." }),
    base: z.string({ required_error: "Le type de base est obligatoire." }),
    rateTypeEmployee: z.string({ required_error: "Le type de base est obligatoire." }),
    rateTypeEmployer: z.string({ required_error: "Le type de base est obligatoire." }),
    rateEmployee: z.string({ required_error: "Le type de base est obligatoire." }),
    rateEmployer: z.string({ required_error: "Le type de base est obligatoire." }),
})



export const SalaryCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    baseType: z.string().optional(),
    base: z.string().optional(),
    rateType: z.string().optional(),
    rate: z.string().optional(),
    amoutType: z.string({ required_error: "Le type de montant est obligatoire." }),
    amount: z.string().optional(),

})

export const SalaryEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    slug: z.string({ required_error: "Le slug est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    baseType: z.string().optional(),
    base: z.string().optional(),
    rateType: z.string().optional(),
    rate: z.string().optional(),
    amoutType: z.string({ required_error: "Le type de montant est obligatoire." }),
    amount: z.string().optional(),

})



export const ClientEditFormSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    socialReason: z.string().max(50, { message: "La raison sociale doit contenir au moins 2 caractères." }),

})

export const AccumulationCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
})
export const AccumulationEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    accumulationSlug: z.string({ required_error: "Le cumul de paie est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    isArchived: z.boolean().optional(),
})
export const SoftwareComponentCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire" }).min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(2, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    buttonLabel: z.string().optional(),

})


export const SetupProfilSchema = z.object({
    civility: z.string({ required_error: "La civilité est obligatoire." }).min(1, { message: "La civilité doit contenir au moins 1 caractères." }),
    firstname: z.string({ required_error: "Le prénom est obligatoire" }).min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname: z.string({ required_error: "Le nom est obligatoire" }).min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
})

export const SetupClientSchema = z.object({
    socialReason: z.string().min(1, { message: "La raison sociale doit contenir au moins 1 caractères." }),
    siren: z.string().min(9, { message: "Le siren doit contenir au moins 9 caractères." }).max(9, { message: "Le prénom doit contenir au maximum 9 caractères." }),
    defaultRole: z.enum(['Directeur de projet', 'Chef de projet', 'Consultant déploiement', 'Autres']),
})

export const SetupLegalSchema = z.object({
    cgv: z.boolean(),
    gdpr: z.boolean(),
})

export const ProfilEditCgvSchema = z.object({
    cgv: z.boolean(),
})


export const UploadFileSchema = zfd.formData({
    clientSlug: zfd.text(z.string({ required_error: 'clientSlug est obligatoire' })),
    projectSlug: zfd.text(z.string({ required_error: 'projectSlug est obligatoire' })),
    label: zfd.text(z.string()),
    file: zfd.file(),
})

export const StandardComposantSchema = z.object({
    label: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(50, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }).max(255, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    status: z.enum(['actif', 'archivé']),
    type: z.enum(['form', 'textarea', 'image']),
})

export const StandardComposantEditSchema = z.object({
    label: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }).max(50, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }).max(255, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    status: z.enum(['actif', 'archivé']),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),
})


export const EventSchema = z.object({
    level: z.enum(['info', 'warning', 'error', 'security']),
    message: z.string().min(2, { message: "Le message doit contenir au moins 2 caractères." }),
    scope: z.enum(['client', 'constant', 'dsn', 'administrator', 'standardAttachment', 'classification', 'book', 'softwareItem', 'standardComponent', 'chapter', 'project', 'editor', 'user', 'software', 'contact', 'invitation', 'bookToProject', 'standardComposantSelectionOption', 'standardComposantInput', 'standardComposantSelectionOption', 'standardComposantInput', 'chapterStandardComposant', 'invoice']),
    clientId: z.string().optional(),
    projectLabel: z.string().optional(),
})

export const SoftwareItemCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
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


export const StandardTaskCreateSchema = z.object({
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    isObligatory: z.boolean(),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string().min(1, { message: "Le logiciel est obligatoire." }),
    multiple: z.boolean().optional(),
    accept: z.enum(['pdf', 'excel', 'word', 'img', 'csv', 'txt']),
})

export const ClassificationCreateSchema = z.object({
    level: z.enum(['client', 'logiciel']),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    idcc: z.string({ required_error: "L'idcc est obligatoire." }),
    type: z.enum(['niveau', 'echelon', 'indice', 'coefficient', 'qualification']),
    id: z.string({ required_error: "Le code est obligatoire" }).min(1, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
})


export const AttachmentSchema = z.object({
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    projectId: z.string().min(1, { message: "Le projet est obligatoire." }),
    file: z.instanceof(File)
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
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    slug: z.string().min(1, { message: "Le slug est obligatoire." }).optional(),
    label: z.string().min(2, { message: "Le nom du logiciel doit contenir au moins 2 caractères." }),
})
export const FeedbackCreateSchema = z.object({
    feature: z.enum(['Projet', 'Client', 'Editeur', 'Autre élément', 'DSN', 'Taches', 'idcc']),
    message: z.string().min(2, { message: "Le message doit contenir au moins 2 caractères." }),
    level: z.enum(['Suggestion', 'Anomalie']),
    isBlocked: z.boolean().optional(),
})

export const ExcelFileSchema = z.object({
    query: z.string({ required_error: "La requete est obligatoire" }).min(1, { message: "La requête est obligatoire." }),
})


export const UserCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    email: z.string({ required_error: "L email est obligatoire." }).email(),
    civility: z.enum(['M', 'Mme']),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
    softwareLabel: z.string({ required_error: "Le logiciel est obligatoire." }),
})

export const UserEditSchema = z.object({
    email: z.string().email(),
    civility: z.enum(['M', 'Mme']),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
})

export const UserDeleteSchema = z.object({
    id: z.string({ required_error: "L'utilisateur est obligatoire." }),
})

export const TableSeniorityCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    idcc: z.string({ required_error: "L'idcc est obligatoire." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    id: z.string().min(1, { message: "Le code doit contenir au moins 2 caractères." }),

})


export const ProcessusCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    id: z.string({ required_error: "Le code est obligatoire." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    formUrl: z.string({ required_error: "Le chemin du fomrulaire est obligatoire." }).min(1),
    descriptionUrl: z.string({ required_error: "Le client est obligatoire." }).min(1),
    level: z.enum(['Client', 'Logiciel']),

})



export const TableAgeRowCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    tableAgeSlug: z.string({ required_error: "La table d'âge est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    idcc: z.string({ required_error: "L'idcc est obligatoire." }),
    level: z.enum(['client', 'logiciel']),
    id: z.string().min(1, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    age: z.coerce.number().int().positive(),
    minMonth: z.coerce.number().int().positive(),
    maxMonth: z.coerce.number().int().positive(),
    schoolYear: z.coerce.number().int().positive(),
    pourcentage: z.coerce.number().int().positive(),
})

export const ConstantEditSchema = z.object({
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    value: z.string().min(1, { message: "La valeur doit contenir au moins 2 caractères." }),
    dateStart: z.date(),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    constantSlug: z.string().min(1, { message: "La constante est obligatoire." }),
})

export const TableAgeCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    idcc: z.string({ required_error: "L'idcc est obligatoire." }),
    level: z.enum(['client', 'logiciel']),
    id: z.string().min(1, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
})

export const ConstantCreateSchema = z.object({
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    idcc: z.string({ required_error: "L'idcc est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    level: z.enum(['client', 'logiciel']),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    value: z.string().min(1, { message: "La valeur doit contenir au moins 2 caractères." }),
    dateStart: z.string({ required_error: "La date de début est obligatoire." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    isDuplicate: z.number().optional(),
})

export const SettingCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }).min(1, { message: "Le client est obligatoire." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    value: z.string().min(1, { message: "La valeur doit contenir au moins 2 caractères." }),
    softwareSlug: z.string().min(1, { message: "Le logiciel est obligatoire." }),

})

export const EnvironnementUserEditClientSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
})

export const EnvironnementUserEditSoftwareSchema = z.object({
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
})

export const AbsenceCreateSchema = z.object({
    id: z.string({ required_error: "Id est obligatoire." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    dsnCode: z.string().optional(),
    itemHour: z.string().optional(),
    description: z.string().optional(),
    itemDay: z.string().optional(),
    isSocialSecurity: z.boolean().optional(),
    counter: z.string().optional(),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    isPrintable: z.boolean().optional(),
    methodOfCalcul: z.string({ required_error: "Le type est obligatoire." }),
    population: z.string().optional(),
})
export const AbsenceEditSchema = z.object({
    id: z.string({ required_error: "Id est obligatoire." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    dsnCode: z.string().optional(),
    itemHour: z.string().optional(),
    absenceSlug: z.string({ required_error: "Le slug est obligatoire." }),
    description: z.string().optional(),
    itemDay: z.string().optional(),
    isSocialSecurity: z.boolean().optional(),
    counter: z.string().optional(),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    isPrintable: z.boolean().optional(),
    methodOfCalcul: z.string({ required_error: "Le type est obligatoire." }),
    population: z.string().optional(),
})
export const ProjectAbsenceEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    dsnId: z.string().optional(),
    method: z.string({ required_error: "La méthode est obligatoire." }),
    id: z.string().optional(),
    slug: z.string({ required_error: "Le slug est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    settlement: z.string().optional(),
    isSocialSecurity: z.coerce.boolean()
})




export const SettingEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    label: z.string().min(2, { message: "Le label doit contenir au moins 2 caractères." }),
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    slug: z.string().min(2, { message: "Le slug doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
    value: z.string().min(1, { message: "La valeur doit contenir au moins 2 caractères." }),
    softwareSlug: z.string().min(1, { message: "Le logiciel est obligatoire." }),

})

export const ProjectTableSeniorityRowSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    tableSenioritySlug: z.string({ required_error: "La table de seniorité est obligatoire." }),
    minMonth: z.coerce.number().int().positive(),
    maxMonth: z.coerce.number().int().positive(),
    percentage: z.coerce.number().int().positive(),
    id: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
})

export const SoftwareCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    label: z.string().min(2, { message: "Le nom du logiciel doit contenir au moins 2 caractères." }),
})

export const SetupSoftwareSchema = z.object({
    label: z.string().min(2, { message: "Le nom du logiciel doit contenir au moins 2 caractères." }),
})

export const InvitationCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    email: z.string().email(),
    softwareLabel: z.string({ required_error: "Le logiciel est obligatoire." }),
    civility: z.enum(['M', 'Mme']),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
    defaultRole: z.enum(['Consultant déploiement', 'Directeur de projet', 'Chef de projet', 'Consultant technique', 'Support', 'Responsable paie']),
    isAdministrator: z.boolean().optional(),
    isEditor: z.boolean().optional(),
})


export const InvitationProjectSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    civility: z.string().min(1, { message: "La civilité doit contenir au moins 1 caractères." }),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 2 caractères." }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 2 caractères." }),
    email: z.string().email(),
    projectSlug: z.string().min(1, { message: "Le projet est obligatoire." }),
    isAdministratorProject: z.boolean().optional(),
    isEditorProject: z.boolean().optional(),
    isValidatorProject: z.boolean().optional(),
})

export const InvitationInternalProjectSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    userInternalId: z.string({ required_error: "L'utilisateur est obligatoire." }),
    projectSlug: z.string().min(1, { message: "Le projet est obligatoire." }),
    isAdministratorProject: z.boolean().optional(),
    isEditorProject: z.boolean().optional(),
    isValidatorProject: z.boolean().optional(),
})



export const ButtonDangerDeleteSchema = z.object({
    validation: z.string().regex(/oui/, { message: "La validation doit être 'oui'." }),
})


export const ProjectUserCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    newUserId: z.string({ required_error: "L'utilisateur est obligatoire." }),
    isValidator: z.boolean().optional(),
    isEditor: z.boolean().optional(),
    isAdministrator: z.boolean().optional(),
    role: z.enum(['Consultant déploiement', 'Directeur de projet', 'Chef de projet', 'Consultant technique', 'Support']),
})

export const PageCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    internalId: z.string().min(2, { message: "Le code doit contenir au moins 2 caractères." }),
    label: z.string().min(2, { message: "Le nom de la page doit contenir au moins 2 caractères." }),

})

export const PageDuplicateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    pageSlug: z.string({ required_error: "La page est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    label: z.string().min(2, { message: "Le nom de la page doit contenir au moins 2 caractères." }),

})

export const ProjectCreateSchema = z.object({
    label: z.string().min(2, { message: "Le nom du projet doit contenir au moins 2 caractères." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    role: z.enum(['Consultant déploiement', 'Directeur de projet', 'Chef de projet', 'Consultant technique', 'Support']),
})
export const ProjectEditSchema = z.object({
    label: z.string({ required_error: "Le nom du projet est obligatoire." }),
    description: z.string().min(2, { message: "La description doit contenir au moins 2 caractères." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    status: z.enum(['Actif', 'Archivé', 'En attente']),
})

export const ForumCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    subject: z.string().min(2, { message: "Le sujet doit contenir au moins 2 caractères." }),
})


export const CreateInvoiceSchema = z.object({
    date: z.string().min(1, { message: "La date est obligatoire." }),
})

export const CreateUserSoftwareSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    userInternalId: z.string({ required_error: "L'utilisateur est obligatoire." }).min(1, { message: "L'utilisateur est obligatoire." }),
    isEditor: z.boolean(),
    softwareSlug: z.string().min(1, { message: "Le logiciel est obligatoire." }),

})

export const CreateTextAreaSchema = z.object({
    value: z.string().min(1, { message: "Le texte est obligatoire." }),
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),

})

export const CreateSoftwareInputSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    type: z.string({ required_error: "Le type de champ est obligatoire" }),
    typeDataTable: z.enum(['isCode', 'isDescription', 'isLabel', 'never']).optional(),
    typeDataImport: z.enum(['dsn', 'never', 'items', 'otherField', 'other']).optional(),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    formSlug: z.string({ required_error: "Le component est obligatoire." }),

})

export const CreateOptionSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    componentSlug: z.string({ required_error: "Le component est obligatoire." }),
    inputSlug: z.string({ required_error: "Le champ est obligatoire." }),
    label: z.string({ required_error: "Le label est obligatoire." }).min(1, { message: "Le label doit contenir au moins 1 caractère." }),
    selected: z.boolean().optional(),

})

export const DetailSoftwareInputShema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    formSlug: z.string({ required_error: "Le component est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    inputSlug: z.string({ required_error: "Le champ est obligatoire." }),
    dsnType: z.string().optional(),
    otherData: z.string().optional(),
    placeholder: z.string().optional(),
    minLength: z.coerce.number().min(0).optional(),
    maxLength: z.coerce.number().max(9999).optional(),
    minValue: z.coerce.number().min(0).optional(),
    maxValue: z.coerce.number().max(9999).optional(),
    readonly: z.boolean().optional(),
    required: z.boolean().optional(),
    multiple: z.boolean().optional(),
    fieldSource: z.string().optional(),

})

export const DeleteStdInputSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    componentSlug: z.string().min(1, { message: "Le composant est obligatoire." }),
    id: z.string().min(1, { message: "L'id est obligatoire." }),
})


export const SocietyDeleteSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    slug: z.string({ required_error: "Le slug est obligatoire." }),

})



export const OpsCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    ops: z.string({ required_error: "L'OPS est obligatoire" }),

})

export const ProjectTableCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    idcc: z.string({ required_error: "L'idcc est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
})

export const ProjectTableEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    id: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
})

export const OpsEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    slug: z.string({ required_error: "Le slug est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
    address1: z.string({ required_error: "L'adresse est obligatoire." }).min(2, { message: "L'adresse doit contenir au moins 2 caractères." }),
    address2: z.string().optional(),
    address3: z.string().optional(),
    address4: z.string().optional(),
    city: z.string({ required_error: "La ville est obligatoire." }).min(2, { message: "La ville doit contenir au moins 2 caractères." }),
    postalCode: z.string({ required_error: "Le code postal est obligatoire." }),
    country: z.string({ required_error: "Le pays est obligatoire." }).min(2, { message: "Le pays doit contenir au moins 2 caractères." }),

})



export const ApproveCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
})

export const ApproveRecordCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    recordSlug: z.string({ required_error: "L'id est obligatoire." }),
    slug: z.string({ required_error: "L'id est obligatoire." }),
    isApproved: z.boolean().optional(),
    isRefused: z.boolean().optional(),

})




export const RateAtCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    order: z.coerce.number().int().positive(),
    office: z.coerce.boolean(),
    rate: z.string({ required_error: "Le taux est obligatoire." }).min(1, { message: "Le taux doit contenir au moins 1 caractère." }),
})



export const CreateIdccSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    extended: z.coerce.boolean().optional(),
    idcc: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
})

export const IdccEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    slug: z.string({ required_error: "L'idcc est obligatoire." }),
    idcc: z.string().optional(),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    extended: z.coerce.boolean().optional(),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
})

export const CreateClassificationSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    idcc: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
    id: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
})
export const ClassificationEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    slug: z.string({ required_error: "Le slug est obligatoire." }),
    idcc: z.string().optional(),
    id: z.string().optional(),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
})


export const CreatePaidLeaveSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    id: z.string({ required_error: "L'id est obligatoire." }).min(1, { message: "Le code doit contenir au moins 1 caractères." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    processusSlug: z.string({ required_error: "Le processus est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    method: z.string({ required_error: "La méthode est obligatoire." }),
    valuation: z.string({ required_error: "La valorisation est obligatoire." }),
    roudingMethod: z.string({ required_error: "La méthode d'arrondi est obligatoire." }),
    roudingMethodLeave: z.string({ required_error: "La méthode d'arrondi des congés est obligatoire." }),
    valuationLeave: z.string({ required_error: "La valorisation des congés est obligatoire." }),
    periodEndDate: z.string({ required_error: "La date de fin de période est obligatoire." }),
    tableSeniority: z.string().optional(),
})



export const CreateApiKeysSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
    limit: z.coerce.number().int().positive(),
})

export const BlockPageCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    pageSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    blockMasterId: z.string().optional(),
    html: z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "form", "input", "select", "switch", "li", "ol", "option", "img"]),
})

export const BlockEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    blockSlug: z.string({ required_error: "Le block est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    pageSlug: z.string({ required_error: "La page est obligatoire." }),
    max: z.coerce.number().int().positive(),
    min: z.coerce.number().int().positive(),
    maxLength: z.coerce.number().int().positive(),
    minLength: z.coerce.number().int().positive(),
    required: z.boolean().optional(),
    readonly: z.boolean().optional(),
    placeholder: z.string().optional(),
    buttonLabel: z.string().optional(),
    label: z.string().optional(),
})

export const BlockPageEditSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    blockSlug: z.string({ required_error: "Le block est obligatoire." }),
    softwareSlug: z.string({ required_error: "Le logiciel est obligatoire." }),
    pageSlug: z.string({ required_error: "La page est obligatoire." }),
    label: z.string({ required_error: "Le libellé est obligatoire." }).min(1, { message: "Le libellé doit contenir au moins 1 caractère." }),
})

export const FormCreateSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    pageSlug: z.string({ required_error: "La page est obligatoire." }),
    formId: z.string({ required_error: "Le formulaire est obligatoire." }),

})

export const FormAddChildSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    blockSlug: z.string({ required_error: "Le block est obligatoire." }),
    pageSlug: z.string({ required_error: "La page est obligatoire." }),
    html: z.enum(["input", "select", "switch"]),
})

export const FormBaseSchema = z.object({
    clientSlug: z.string({ required_error: "Le client est obligatoire." }),
    projectSlug: z.string({ required_error: "Le projet est obligatoire." }),
    pageSlug: z.string({ required_error: "La page est obligatoire." }),
    formId: z.string({ required_error: "Le formulaire est obligatoire." }),
    formGroup: z.string({ required_error: "Le groupe est obligatoire." }),
    blockSlug: z.string({ required_error: "Le block est obligatoire." }),
})

export const AddDynamicFormFields = (fields: string[]) => {
    let schema = z.object({});
    for (const field of fields) {
        schema = schema.merge(z.object({
            [field]: z.string().optional()
        }))

    }
    const finalSchema = schema.merge(FormBaseSchema)
    return finalSchema

}

