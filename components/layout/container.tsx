import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                {children}
            </div>
        </div>

    )
}

export const ContainerBreadCrumb = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {children}
        </div>

    )

}

export const ContainerDataTable = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="gap-4  px-4">
            {children}
        </div>

    )
}

export const ContainerPage = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className="gap-4  px-4">
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>

    )
}

export const ContainerForm = ({ title, children }: { title?: string, children: React.ReactNode }) => {
    return (
        <div className="gap-4  px-4">
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>

    )
}