
import { getMyProjects, getMyProjectSoftware } from "@/src/query/project.query"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Pencil, Eye, Trash2Icon } from "lucide-react"

export default async function Project() {
    const projects = await getMyProjects()
    const softwares = await getMyProjectSoftware()
    return (
        <Table>
            <TableCaption>Liste de vos projets.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nom du projet</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Logiciel</TableHead>
                    <TableHead>Ouvrir</TableHead>
                    <TableHead>Editer</TableHead>
                    <TableHead>Supprimer</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {projects?.map((project) =>
                    <TableRow key={project.projectId}>
                        <TableCell className="font-medium">{project.project.name}</TableCell>
                        <TableCell>{project.project.description}</TableCell>
                        <TableCell>{softwares.find(software => software.id === project.project.softwareId)?.name}</TableCell>
                        <TableCell><Link href={`/project/${project.projectId}`}> <Eye /></Link></TableCell>
                        <TableCell><Link href={`/project/${project.projectId}/edit`}> <Pencil /></Link></TableCell>
                        <TableCell><Link href={`/project/${project.projectId}`}> <Trash2Icon /></Link></TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>




    )
}