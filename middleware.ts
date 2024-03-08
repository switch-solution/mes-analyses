export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/home", "/profile", "/client/:path*", "/editor/:path*", "/support/:path*", "/project/:path*", "/setup/:path*",]
}

