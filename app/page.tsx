import { getUser } from "@/src/query/user.query";
import { redirect } from 'next/navigation';
import Container from "@/components/layout/container";
import { userIsSetup } from "@/src/query/user.query";
export default async function Home() {
  const session = await getUser();
  const isSetup = await userIsSetup();
  console.log(isSetup)
  if (!isSetup) {
    redirect('/setup/cgv')

  }
  if (session) {
    redirect('/home');
  }
  else {
    redirect('/api/auth/signin')
  }
  return (
    <Container>
      <span>oups</span>
    </Container>
  )
}

