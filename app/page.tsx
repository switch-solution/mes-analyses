import { redirect } from 'next/navigation';
import { Container } from "@/components/layout/container";
import { Security } from '@/src/classes/security';
import { User } from '@/src/classes/user';
export default async function Page() {
  const security = new Security();
  const session = await security.session();
  if (!session?.user.id) {
    return redirect('/api/auth/signin');
  }
  const email = session.user.email
  if (!email) {
    return redirect("/api/auth/signin")
  }
  const user = new User(session.user.id)
  if (!user) {
    throw new Error('L\'utilisateur n\'est pas valide')
  }
  const isSetup = await user.userIsSetup();
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

