"use client";

export default function DynamicPageViewBlock({ clientSlug, pageSlug, blockSlug, label, htmlElement, }: { clientSlug: string, pageSlug: string, blockSlug: string, label: string, htmlElement: string }) {
    const htmlText = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']
    const htmlList = ['ol', 'li']
    return (
        <>
            {htmlText.includes(htmlElement) && <Text htmlElement={htmlElement} label={label} />}
            {htmlList.includes(htmlElement) && <List htmlElement={htmlElement} label={label} />}

        </>
    )

}

const Text = ({ htmlElement, label }: { htmlElement: string, label: string }) => {
    return (
        <>
            {htmlElement === 'h1' && <h1>{label}</h1>}
            {htmlElement === 'h2' && <h2>{label}</h2>}
            {htmlElement === 'h3' && <h3>{label}</h3>}
            {htmlElement === 'h4' && <h4>{label}</h4>}
            {htmlElement === 'h5' && <h5>{label}</h5>}
            {htmlElement === 'h6' && <h6>{label}</h6>}
            {htmlElement === 'p' && <p>{label}</p>}

        </>


    )
}

const List = ({ htmlElement, label }: { htmlElement: string, label: string }) => {
    return (
        <>
            {htmlElement === 'ol' && <ol className="list-decimal">{label}</ol>}
            {htmlElement === 'li' && <li className="list-disc">{label}</li>}

        </>
    )

}




