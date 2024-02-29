import { userIsEditor } from "@/src/query/security.query";
import { getSoftwareSettingFilterByUserSoftware } from "@/src/query/software_setting.query";
import { columns } from "./dataTablecolumns"
import { DataTable } from "@/components/layout/dataTable";
export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    const isEditor = await userIsEditor(params.clientSlug);
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")

    const settingList = await getSoftwareSettingFilterByUserSoftware(params.clientSlug)
    const settings = settingList.map((setting) => {
        return {
            clientSlug: params.clientSlug,
            code: setting.id,
            label: setting.label,
            value: setting.value,
            softwareLabel: setting.softwareLabel,
            slug: setting.slug,
            description: setting.description,
            dateStart: setting.dateStart.toLocaleDateString(),
            dateEnd: setting.dateEnd.toLocaleDateString(),
        }
    })

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={settings} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/client/${params.clientSlug}/editor/setting/create`} buttonLabel="Ajouter un paramétre" />
        </div>
    )

}