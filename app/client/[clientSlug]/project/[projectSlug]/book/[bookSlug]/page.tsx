import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
import { getChapterByBookSlug } from "@/src/query/project_book.query"
import { getComponentWitchInputByBookSlug } from "@/src/query/project_component_input.query"
import Summary from "@/components/layout/summary"
import { getValueForDataTable } from "@/src/query/project_value.query"
import { userIsAuthorizeInThisProject } from "@/src/query/security.query";
export default async function Page({ params }: { params: { clientSlug: string, projectSlug: string, bookSlug: string } }) {
    const userIsAuthorized = await userIsAuthorizeInThisProject(params.projectSlug);
    if (!userIsAuthorized) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const chapters = await getChapterByBookSlug(params.bookSlug)
    const components = await getComponentWitchInputByBookSlug(params.bookSlug)
    const values = await getValueForDataTable(params.bookSlug, params.projectSlug, params.clientSlug)
    return (
        <div className="flex size-full flex-col	 flex-wrap">
            <div className="lg:h-full lg:w-1/4">
                <Summary chapters={chapters} clientSlug={params.clientSlug} projectSlug={params.projectSlug} bookSlug={params.bookSlug} />
            </div>
            <div className="lg:h-full lg:w-1/2">
                {components.map(component =>
                    <div key={`${component.chapterLevel_1}.${component.chapterLevel_2}.${component.chapterLevel_3}`} id={`${component.chapterLevel_1}.${component.chapterLevel_2}.${component.chapterLevel_3}`}>
                        <h2 className="ml-2 mt-2 font-bold">{`${component.chapterLevel_1}.${component.chapterLevel_2}.${component.chapterLevel_3}.${component.label}`}</h2>
                        <DataTable columns={columns} data={values.filter(value => value.componentSlug === component.slug)} inputSearch="isCode" inputSearchPlaceholder="Chercher par code" href={`/client/${params.clientSlug}/project/${params.projectSlug}/book/${params.bookSlug}/component/${component.slug}/create`} buttonLabel={`Ajouter ${component.label}`} />
                    </div>

                )}
            </div>
        </div>)
}