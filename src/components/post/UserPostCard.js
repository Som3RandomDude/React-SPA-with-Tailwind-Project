import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import { getPost } from "../services/postsService.js";

export const UserPostCard = (props) => {

    let postId = props.id;
    
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    useEffect(() => {
        async function getData() {
            try {
                 let result = await getPost(postId);
                setPost(result.data());
            } catch (error) {
                setError(error);
                console.log(error);
                toast.error("An error occured try again later!");

            }
        }
        getData();
    }, [])
    

    
    return (
        <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-6/12 rounded overflow-hidden">
                <img class="object w-full h-auto" src={post?.image} alt="" />
            </div>
            <div class="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
                <h2 class="text-lg font-semibold leading-tight text-gray-800">{post?.title}</h2>
                <p class="leading-normal pt-2">{post?.description}</p>
                <Link class="leading-normal pt-2 hover:underline text-blue-600" to={`/post/${postId}`}>Read more...</Link>
            </div>
        </div>
    );
}