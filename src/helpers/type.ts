import { Prisma } from '@prisma/client'
import { getStdComponentWithInput } from '@/src/query/stdcomponent.query'
import { getStandardInput } from "@/src/query/standardInput.query"
import { getStandardInputByComponentId } from "@/src/query/stdComponentInput.query"
import { getIdccByCode } from "@/src/query/idcc.query"
import { getSoftwareByUserIsEditor } from '@/src/query/software.query'
import { getSoftwareItemsBySlug } from "@/src/query/softwareItems.query"
import { getTextAreaById } from '@/src/query/standardTextArea'
import { getChapterStdComponents } from "@/src/query/chapter_composant.query"
import { getMyClient } from '@/src/query/user.query'
import { getMyClientActive } from '@/src/query/client.query'
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
type Scope = 'client' | 'standardAttachment' | 'book' | 'standardComposant' | 'softwareItem' | 'chapter' | 'project' | 'user' | 'software' | 'contact' | 'invitation' | 'bookToProject' | 'standardComposantSelectionOption' | 'standardComposantInput' | 'standardComposantSelectionOption' | 'standardComposantInput' | 'chapterStandardComposant' | 'invoice' | 'editor'
export type Event = {
    level: EventLevel,
    message: string,
    scope: Scope,
    clientId?: string,
    projectId?: string,
}

export type getStdComponentWithInputType = Prisma.PromiseReturnType<typeof getStdComponentWithInput>[number];
export type getStandardInputType = Prisma.PromiseReturnType<typeof getStandardInput>[number];
export type getStandardInputByComponentIdType = Prisma.PromiseReturnType<typeof getStandardInputByComponentId>[number];
export type getIdccByCodeType = Prisma.PromiseReturnType<typeof getIdccByCode>;
export type getSoftwareByUserIsEditorType = Prisma.PromiseReturnType<typeof getSoftwareByUserIsEditor>[number];
export type getSoftwareItemsBySlugType = Prisma.PromiseReturnType<typeof getSoftwareItemsBySlug>;
export type getTextAreaByIdType = Prisma.PromiseReturnType<typeof getTextAreaById>;
export type getChapterStdComponentsType = Prisma.PromiseReturnType<typeof getChapterStdComponents>;
export type getMyClientType = Prisma.PromiseReturnType<typeof getMyClient>;
export type getMyClientActiveType = Prisma.PromiseReturnType<typeof getMyClientActive>;


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
