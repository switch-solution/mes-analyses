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