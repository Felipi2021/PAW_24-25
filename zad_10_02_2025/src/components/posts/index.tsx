import {useQuery} from "@tanstack/react-query";




async function getPosts() {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .catch(error => console.error(error));
}

export function Posts() {

    const {data} = useQuery({
        queryKey:["posts"],queryFn:getPosts
    })

    return (
        <>
            <div>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
            </div>
        </>
    )
}