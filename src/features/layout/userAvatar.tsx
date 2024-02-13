import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { getAuthSession } from "@/lib/auth"
export default async function UserAvatar() {
    const session = await getAuthSession()
    return (
        <Avatar>
            <AvatarImage src={session?.user.image ? session.user.image : undefined} alt="@shadcn" />
            <AvatarFallback>{session?.user.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
    )
}
