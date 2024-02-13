import { getAuthSession } from "@/lib/auth";
import RegisterForm from "@/src/features/form/auth/create";
import { redirect } from 'next/navigation';
export default async function Page() {
    const session = await getAuthSession()
    if (session) {
        redirect('/home')
    }
    return (<RegisterForm />)
}