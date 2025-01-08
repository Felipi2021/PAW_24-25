import "./style.sass"
import {Logo} from "../logo";


export function Header(){
    return(
        <>
            <Logo></Logo>
            <a href="/"><h3>Home</h3></a>
            <a href="/posts"><h3>Blog</h3></a>
            <a href="/categories"><h3>Categories</h3></a>
        </>
    )
}