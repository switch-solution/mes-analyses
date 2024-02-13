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
  footer: string
}
import Container from "@/src/features/layout/container";
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
          <h1 className="text-3xl font-bold text-center p-6">Gérer la rédaction de vos cahiers d&apos;analyses de paie avec une solution dédiée</h1>
          <h2 className="text-left">Créer vos formulaires</h2>

        </div>
        <div id='pricing' className="flex justify-between flex-col md:flex-row p-12 h:full md:w-1/2">
          <Container>
            <CardPricing title="Mode local" description="Installer la solution sur vos serveurs" content="Utilis" footer="/documentation" />
          </Container>
          <Container>
            <CardPricing title="Mode hebergé " description="Période d'essaie gratuite de 3 mois" content="Créez vos formulaires et testez la solution" footer="/auth/register" />
          </Container>
        </div>
      </main>
    </>
  )
}

const CardPricing = ({ title, description, content, footer }: CardProps) => {

  return (
    <Card className="'h-44 w-80'">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <Link href={footer}> <LogIn />Essayer</Link>
      </CardFooter>
    </Card>
  )

}