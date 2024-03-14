import { userIsValid } from '@/src/query/security.query'
import About from '@/components/about/about'
export default async function Page() {
    const user = await userIsValid()
    if (!user) {
        throw new Error("Not found")
    }
    return (
        <About />
    )

}