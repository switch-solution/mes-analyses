import { countStdComponent } from "@/src/query/stdcomponent.query"
export default async function Component() {
    const count = await countStdComponent()
    return (<p>{count}</p>)
}