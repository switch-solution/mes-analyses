export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-2 flex flex-col justify-center items-center md:grid md:grid-rows-3 md:grid-flow-col md:gap-4 lg:grid-rows-2">
            {children}
        </div>

    )
}