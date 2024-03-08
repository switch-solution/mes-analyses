export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:mt-2">
            {children}
        </div>

    )
}