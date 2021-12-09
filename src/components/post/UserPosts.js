import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { getPost } from "../services/postsService.js"
import { getUser } from "../services/userService.js";
import { UserPostCard } from "./UserPostCard.js";


export default function UserPosts({
    match
}) {

    const [error, setError] = useState(null);
    const [posts, setPosts] = useState(null);


    useEffect(() => {
        async function getData() {
            try {
                let authorResult = await getUser(match.params.userId);
                setPosts(authorResult.data().posts);

            } catch (error) {
                setError(error);
                console.log(error);
                toast.error("An error occured try again later!");

            }
        }
        getData();
    }, [match.params.postId])


    console.log(posts);


    return (

        <div className="w-full my-12">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8">
                <div className="bg-white w-full shadow rounded p-8">
                    <h1 className="flex justify-center md:text-3xl text-2xl font-bold text-gray-800">User Posts</h1>
                    <div className="grid grid-cols-1 gap-8 mt-6">
                        {posts?.length > 0
                            ? posts?.map(post =><UserPostCard key={post} id={post} />)
                            : <div className="flex justify-center">No posts yet... </div>
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}