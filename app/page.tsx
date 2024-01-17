import { getAuthSession } from "@/lib/auth"
export default async function Home() {
  const session = await getAuthSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div> Hello world</div>
    </main>
  )
}
