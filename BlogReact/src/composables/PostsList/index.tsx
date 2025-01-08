import "./style.sass"
import {BlogPost} from "../BlogPost";

export function PostsList() {
    return (
        <>
            <BlogPost categoryName={"Technology"} title={"Impact of technology on today's world"} author={"Jan Pinkowski"} date={"19.12.2024"}/>
            <BlogPost categoryName={"Technology"} title={"Impact of technology on today's world"} author={"Jan Pinkowski"} date={"19.12.2024"}/>
            <BlogPost categoryName={"Technology"} title={"Impact of technology on today's world"} author={"Jan Pinkowski"} date={"19.12.2024"}/>
        </>
    )
}