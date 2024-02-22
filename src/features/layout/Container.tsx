export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-2 flex flex-col justify-center items-center md:grid md:grid-cols-3 md:gap-4">
            {children}
        </div>

    )
}