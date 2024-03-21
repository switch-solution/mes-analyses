import { redirect } from 'next/navigation';
import Container from "@/components/layout/container";
import { userIsSetup } from "@/src/query/user.query";
import { getAuthSession } from "@/lib/auth";
import { getInvitation } from "@/src/query/invitation.query";
import { copyInvitation } from "@/src/query/invitation.query";
export default async function Home() {
  const session = await getAuthSession();
  if (!session?.user.id) {
    return redirect('/api/auth/signin');
  }
  const email = session.user.email
  if (!email) {
    return redirect("/api/auth/signin")
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

