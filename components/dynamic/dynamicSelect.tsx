"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function DynamicSelect({ placeholder, label, options }: { placeholder?: string | null, label: string, options: { label: string }[] }) {
    return (
        <div className="w-1/2">

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options.map((option) => {
                            return (
                                <SelectItem key={option.label} value={option.label}>
                                    {option.label}
                                </SelectItem>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}