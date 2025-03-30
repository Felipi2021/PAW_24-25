import {useEffect, useState} from "react";


export function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPosts(data);
            });
    }, []);

    return (
        <>
            <div>
                {posts ? <pre>{JSON.stringify(posts, null, 2)}</pre> : 'Loading...'}
            </div>
        </>
    )
}