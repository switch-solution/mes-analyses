import { redirect } from 'next/navigation';
import Container from "@/components/layout/container";
import { userIsSetup } from "@/src/query/user.query";
import { getAuthSession } from "@/lib/auth";
export default async function Home() {
  const session = await getAuthSession();
  if (!session) {
    return redirect('/api/auth/signin');
  }
  const isSetup = await userIsSetup();
  if (!isSetup) {
    return redirect('/setup/cgv')
  }
  if (session && isSetup) {
    return redirect('/home');
  }
  return (
    <Container>
      <span>oups</span>
    </Container>
  )
}

