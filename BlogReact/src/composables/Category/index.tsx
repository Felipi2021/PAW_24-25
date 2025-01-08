import "./style.sass"

export function Category({title}: {title: string}) {
    return (
        <div className="category">
            {title}
        </div>
    )
}