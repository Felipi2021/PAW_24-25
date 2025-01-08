import "./style.sass"
import {Category} from "../Category";

export function BlogPost({categoryName, title, author, date}: {categoryName: string, title: string,author:string, date:string }) {
    return(
        <>
            <img src="" alt=""/>
            <Category title={categoryName}></Category>
            <h2>{title}</h2>
            <p>
                {author} {date}
            </p>
        </>
    )
}
