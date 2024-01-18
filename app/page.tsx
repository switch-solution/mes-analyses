import { CardPricing } from "@/src/features/layout/CardPricing";
import { LoginButton } from "@/src/features/auth/LoginButton";
export default async function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-start p-12">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center p-6">La meilleur façon de gérer l'anlyse de votre SIRH</h1>
        <h2 className="text-left">Rédiger des cahiers des charges dans le cadre des changements de logiciel</h2>
      </div>
      <div className="flex justify-between flex-col md:flex-row p-12">
        <CardPricing title="Offre d'essai" description="0€/utilisateur" content="3 projets gratuit" footer={<LoginButton label="Essayer la version d'essai" variantChoice="link" />} />
        <CardPricing title="Offre " description="10€/utilisateur" content="" footer={<LoginButton label="Essayer la version d'essai" variantChoice="link" />} />
      </div>
    </main>
  )
}
