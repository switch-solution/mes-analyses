"use client";
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
export function ButtonExportCsv({ data }: { data: any[] }) {

    const handleClick = () => {
        // Convertir les données en CSV
        let csvContent = '';
        data.forEach((row, index) => {
            csvContent += Object.values(row).join(';') + '\n';
        });

        // Créer un blob à partir du contenu CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Créer un lien de téléchargement
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="gap-4  px-4">
            <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
                onClick={handleClick}
            >
                <File className="size-3.5" />
                <span className="sr-only sm:not-sr-only">Exporter au format csv</span>
            </Button>
        </div>
    )

}