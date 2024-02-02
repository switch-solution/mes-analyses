import { getUser } from "@/src/query/user.query";
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
type CardProps = {
  title: string
  description: string
  content: string
}

import { LogIn } from "lucide-react";
import Footer from "@/src/features/layout/footer";

export default async function Home() {
  const session = await getUser();

  if (session) {
    redirect('/home');
  }
  return (
    <>
      <main className="flex h-full w-full flex-col items-center justify-start p-12">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-center p-6">La meilleur façon de gérer l&apos;anlayse de votre SIRH</h1>
          <h2 className="text-left">Rédiger des cahiers des charges dans le cadre des changements de logiciel</h2>
        </div>
        <div className="flex justify-between flex-col md:flex-row p-12 h:full md:w-1/2">
          <Card className="'h-44 w-80'">
            <CardHeader>
              <CardTitle>Offre d&apos;essai</CardTitle>
              <CardDescription>10€/mois par utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <p>3 projets gratuit</p>
            </CardContent>
            <CardFooter>
              <Link href={`/auth/register`}> <LogIn />Essayer</Link>
            </CardFooter>
          </Card>
          <Card className="'h-44 w-80'">
            <CardHeader>
              <CardTitle>Offre d&apos;essai</CardTitle>
              <CardDescription>10€/mois par utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Tout illimité</p>
            </CardContent>
            <CardFooter>
              <Link href={`/auth/register`}> <LogIn />Essayer</Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
