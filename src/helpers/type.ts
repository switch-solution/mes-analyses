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

type EventLevel = "info" | "warning" | "error"
type Scope = 'client' | 'book' | 'standardComposant' | 'chapter' | 'project' | 'user' | 'software' | 'contact' | 'invitation' | 'bookToProject' | 'standardComposantSelectionOption' | 'standardComposantInput' | 'standardComposantSelectionOption' | 'standardComposantInput' | 'chapterStandardComposant' | 'invoice'
export type Event = {
    level: EventLevel,
    message: string,
    scope: Scope,
    clientId?: string,
    projectId?: string,
    createdBy: string
}