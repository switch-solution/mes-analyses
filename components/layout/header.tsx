type HeaderProps = {
    children: React.ReactNode,
}
export const Header = async ({ children }: HeaderProps) => {
    return (
        <header className="flex w-full max-w-full flex-row items-center justify-end border-b-2 border-b-accent">
            {children}
        </header >
    )
}