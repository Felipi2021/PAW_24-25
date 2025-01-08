import {Header} from "../../composables/header";
import "./style.sass"
import {PostsList} from "../../composables/PostsList";

export function Main(){
    return (
        <>
            <Header></Header>
            <img src="" alt=""/>
            <h3>Latest Posts</h3>
            <PostsList></PostsList>
        </>
    )
}