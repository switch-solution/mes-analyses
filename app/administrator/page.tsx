import { userIsAdminSystem, userIsValid } from "@/src/query/security.query";
import Container from "@/components/layout/container";
import { getCountAllInvoices } from "@/src/query/invoice.query";
import CardWithOptions from "@/components/layout/cardWithOptions";
export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error('Unauthorized')
    }
    const countInvoices = await getCountAllInvoices()
    const userIsAdmin = await userIsAdminSystem()
    return (
        <Container>
            <CardWithOptions titre="Nombre de factures" content={countInvoices} href="/administrator/invoice" />
        </Container>
    );
}