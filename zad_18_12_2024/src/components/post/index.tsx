import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";



export function Post(){

    const [post,setPost] = useState([])

    const {id} = useParams()

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPost(data);
            });
    })

    return (
        <>
            {post ? <pre>{JSON.stringify(post, null, 2)}</pre> : 'Loading...'}
        </>
    )
}