export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto size-full py-10">
            {children}
        </div>

    )
}