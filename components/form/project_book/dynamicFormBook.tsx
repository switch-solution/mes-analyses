"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { getComponentAndInputAndValuesBySlug } from "@/src/query/project_component.query";
import { createComponentValue } from "@/src/features/actions/project_component/project_component.actions";
import { DynamicFormSchema } from "@/src/helpers/definition";
import { TypeInput } from "@/src/helpers/type";

export default function Form({ clientSlug, projectSlug, bookSlug, component }: { clientSlug: string, projectSlug: string, bookSlug: string, component: getComponentAndInputAndValuesBySlug }) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        let inputs: TypeInput[] = []
        formData.forEach((value, key) => {
            inputs.push({
                clientSlug: clientSlug,
                projectSlug: projectSlug,
                bookSlug: bookSlug,
                componentSlug: component?.slug ? component.slug : '',
                value: value,
                label: key
            } as TypeInput)
            DynamicFormSchema.parse({
                clientSlug: clientSlug,
                projectSlug: projectSlug,
                bookSlug: bookSlug,
                componentSlug: component?.slug ? component.slug : '',
                value: value,
                label: key
            })

        })
        await createComponentValue(inputs)
    }

    return (
        <form className="m-2 w-full" onSubmit={handleSubmit}>
            {component && component.Project_Input.map(input =>
                <div key={input.label} className="flex flex-row items-center mt-2">
                    <div className="w-1/3">
                        <Label htmlFor={input.label}>{input.label}</Label>
                    </div>
                    <div className="w-2/3">
                        <Input id={input.label} name={input.label} aria-label={input.label} type={input.type} minLength={input.minLength ? input.minLength : undefined} maxLength={input?.maxLength ? input.maxLength : undefined} />
                    </div>
                </div>


            )}
            <Button type="submit">Sauvegarder {component?.label ? component.label : 'Sauvegarder'}</Button>
        </form>

    )
}
