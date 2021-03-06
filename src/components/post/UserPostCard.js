import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getPost } from "../../services/postsService.js";

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
    }, [postId])
    

    
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-6/12 rounded overflow-hidden">
                <img className="object w-full h-80" src={post?.image} alt="" />
            </div>
            <div className="w-full md:w-6/12 mt-4 md:mt-0 md:ml-4">
                <h2 className="text-lg font-semibold leading-tight text-gray-800">{post?.title}</h2>
                <p className="leading-normal pt-2">{post?.description}</p>
                <Link className="leading-normal pt-2 hover:underline text-blue-600" to={`/post/${postId}`}>Read more...</Link>
            </div>
        </div>
    );
}