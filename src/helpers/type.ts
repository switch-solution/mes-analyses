
export type variantType = '"link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined'

export type InputStandardType = "text" |
    "number" |
    "date" |
    "textArea" |
    "select" |
    "file" |
    "switch" |
    "Image" |
    "dsnSocietySiren" |
    "dsnEstablishmentSiret" |
    "dsnEstablishmentApe" |
    "dsnSocietyAddress1" |
    "dsnSocietyAddress2" |
    "dsnSocietyAddress3" |
    "dsnSocietyZipCode" |
    "dsnSocietyCity" |
    "dsnEstablishmentAddress1" |
    "dsnEstablishmentAddress2" |
    "dsnEstablishmentAddress3" |
    "dsnEstablishmentZipCode" |
    "dsnEstablishmentCity" |
    "dsnJobLabel" |
    "dsnJobCode" |
    "dsnIdcc"

export type Software = {
    id: string,
    provider: string,
    name: string
}

type Scope = 'client' | 'dsn' | 'administrator' | 'classification' | 'standardAttachment' | 'constant' | 'book' | 'standardComponent' | 'softwareItem' | 'chapter' | 'project' | 'user' | 'software' | 'contact' | 'invitation' | 'bookToProject' | 'standardComposantSelectionOption' | 'standardComposantInput' | 'standardComposantSelectionOption' | 'standardComposantInput' | 'chapterStandardComposant' | 'invoice' | 'editor'
export type Logger = {
    level: "info" | "warning" | "error" | "security"
    message: string,
    scope: Scope,
    clientId?: string,
    projectLabel?: string,
    projectSoftwareLabel?: string,
}

export type Value = {
    value: string
    Standard_Composant_InputId: string
    createdBy: string
}

export type Row = {
    id: string,
    type: string
    value: string | undefined,
}

export type TypeInput = {
    clientSlug: string,
    projectSlug: string,
    bookSlug: string,
    componentSlug: string,
    value: string,
    label: string,
    formSource?: string,
    inputSource?: string,
    recordId?: string
}


export type TypeDynamicInput = {
    id: string
    type: string
    label: string
    slug: string
    zodLabel: string
    clientId: string
    softwareLabel: string
    projectLabel: string
    placeholder: string | null
    defaultValue: string | null
    minLenght: number | null
    maxLenght: number | null
    min: number | null
    max: number | null
    selectTableSource: string | null
    selectFieldSource: string | null
    required: boolean
    readOnly: boolean
    formId: string
    createdAt: Date
    updatedAt: Date
    createdBy: string
    order: number

}[]