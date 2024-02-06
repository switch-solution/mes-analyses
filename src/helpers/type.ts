import { Prisma } from '@prisma/client'
import { getStdComponentWithInput } from '@/src/query/stdcomponent.query'
import { getStandardInput } from "@/src/query/standardInput.query"
import { getStandardInputByComponentId } from "@/src/query/stdComponentInput.query"
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

export type getStdComponentWithInputType = Prisma.PromiseReturnType<typeof getStdComponentWithInput>[number];
export type getStandardInputType = Prisma.PromiseReturnType<typeof getStandardInput>[number];
export type getStandardInputByComponentIdType = Prisma.PromiseReturnType<typeof getStandardInputByComponentId>[number];

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
