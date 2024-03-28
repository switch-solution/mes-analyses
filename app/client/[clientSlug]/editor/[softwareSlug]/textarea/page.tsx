//https://www.blocknotejs.org/docs/advanced/nextjs
import Container from "@/components/layout/container";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/blocknote/blockNote"), { ssr: false });

export default async function Page({ params }: { params: { clientSlug: string, softwareSlug: string } }) {
    return (
        <Container>
            <Editor clientSlug={params.clientSlug} />
        </Container >
    )

}