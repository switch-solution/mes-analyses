import { Security } from "@/src/classes/security"
import { Project } from "@/src/classes/project";
import { notFound } from "next/navigation"
import { ProcessusFactory } from "@/src/classes/processusFactory";
import { Pdf } from "@/components/react-pdf/pdf";
import { User } from "@/src/classes/user";
import { Processus } from "@/src/classes/processus";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, processusSlug: string } }) {
    const processus = new Processus(params.processusSlug)
    const processusExist = await processus.processusExist()
    if (!processusExist) {
        notFound()
    }
    const processusDetail = await processus.processusDetail()
    const project = new Project(params.projectSlug)
    const projectExist = await project.projectExist()
    if (!projectExist) {
        notFound()
    }
    const security = new Security()
    await security.isAuthorizedInThisProject(params.projectSlug)
    const userIsAuthorized = await security.isAuthorizedInThisProject(params.projectSlug)
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à ce projet.")
    const projectDetail = await project.projectDetails()
    if (!projectDetail) {
        throw new Error("Projet introuvable")
    }
    const user = new User(security.userId)
    const userDetail = await user.getUserDetail()
    const processusFactory = ProcessusFactory.create({
        processusSlug: params.processusSlug,
        clientId: projectDetail.clientId,
        projectLabel: projectDetail.label,
        sofwareLabel: projectDetail.softwareLabel

    });
    const extractionData = await processusFactory.extraction()
    const datas: { [key: string]: any }[] = extractionData.datas
    const pdfData = []
    for (const data of datas) {
        let keys = Object.keys(data)
        for (const key of keys) {
            let label = extractionData.inputs.find(input => input.zodLabel === key)?.label
            let value = data[key]
            if (label && value) {
                pdfData.push({
                    label: label,
                    value: value
                })
            }
        }
    }

    return (
        <Pdf title={processusDetail.label} subtitle={processusDetail?.description ? processusDetail.description : ''} author={`${userDetail.UserOtherData.at(0)?.lastname} ${userDetail.UserOtherData.at(0)?.firstname}`} datas={pdfData} />

    )
}