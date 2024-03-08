type HeaderProps = {
    children: React.ReactNode,
}
export const Header = async ({ children }: HeaderProps) => {
    return (
        <header className="border-bg border-b-accent flex flex-row items-center justify-end w-full border-b-2 z-10">
            {children}
        </header >
    )
}