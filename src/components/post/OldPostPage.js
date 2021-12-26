import { useEffect, useState } from "react"
import { getPost } from "../services/postsService.js"
import { getUser } from "../services/userService.js";

export default function Post({
   match
}) {

    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                let postResult = await getPost(match.params.postId);
                setPost(postResult.data());
                let authorResult = await getUser(postResult.data().creatorId);
                setAuthor(authorResult.data());
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }
        getData();
    }, [match.params.postId])
    
  
   
    let properDate = new Date(post?.date.seconds*1000).toLocaleDateString();
   
    return (
        <div className="mt-10">

            <div className="relative w-full max-w-screen-md mx-auto mb-4 h-96 md:mb-0 " >
                <div className="absolute bottom-0 left-0 z-10 w-full h-full img-className"></div>
                <img src={post?.image} className="absolute top-0 left-0 z-0 object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 z-20 p-4">
                    <a href="#"
                        className="inline-flex items-center justify-center px-4 py-1 mb-2 text-gray-200 bg-black">{post?.category}</a>
                    <h2 className="text-4xl font-semibold leading-tight text-gray-100">
                       {post?.title}
                       </h2>
                    <div className="flex mt-3">
                        <img src={author?.image ? author?.image:""} alt="avatar"
                            className="object-cover w-10 h-10 mr-2 rounded-full" />
                        <div>
                            <p className="text-sm font-semibold text-gray-200"> {`${author?.firstname} ${author?.lastname}`} </p>
                            <p className="text-xs font-semibold text-gray-400"> {properDate} </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-md px-4 mx-auto mt-12 text-lg leading-relaxed text-gray-700 lg:px-0">
                <p className="pb-6">
                    {post?.content}
                </p>

            </div>
        </div>
    )
}