import { prisma } from "@/lib/prisma";
export class ProjectPage {
    pagePageSlug: string
    constructor(pagePageSlug: string) {
        this.pagePageSlug = pagePageSlug
    }

    projectPageExist() {
        try {
            const page = prisma.project_Page.findUniqueOrThrow({
                where: {
                    slug: this.pagePageSlug
                }
            })
            return page
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

    async getPageSlug() {
        try {
            const pageSlug = await prisma.project_Page.findUniqueOrThrow({
                where: {
                    slug: this.pagePageSlug
                },
                include: {
                    Page: {
                        select: {
                            slug: true
                        }
                    }
                }
            })
            return pageSlug.Page.slug
        } catch (err) {
            console.log(err)
            throw new Error(err as string)
        }
    }

}