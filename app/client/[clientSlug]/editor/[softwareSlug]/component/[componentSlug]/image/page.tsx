import { userIsEditorClient } from "@/src/query/security.query"
import Image from 'next/image';
import { getVercelBlobFiles } from "@/lib/vercelBlob";
import { getImageByComponentSlug } from "@/src/query/software_component_image";
export default async function Page({ params }: { params: { clientSlug: string, componentSlug: string } }) {
    const isEditor = await userIsEditorClient();
    if (!isEditor) throw new Error("Vous n'êtes pas autorisé à accéder à cette page.")
    const getImage = await getImageByComponentSlug(params.componentSlug)
    if (!getImage) throw new Error("Aucune image n'a été trouvée")
    const getBlobFiles = await getVercelBlobFiles()
    const image = getBlobFiles.blobs.find(blob => blob.pathname === getImage.pathname && blob.downloadUrl === getImage.downloadUrl && blob.url === getImage.url)
    if (!image) throw new Error("Aucune image n'a été trouvée")
    return (
        <section>
            <Image
                priority
                key={image.pathname}
                src={image.url}
                alt="Image"
                width={200}
                height={200}
            />

        </section>
    );
}