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

            <div className="mb-4 h-96 md:mb-0 w-full max-w-screen-md mx-auto relative " >
                <div className="img-className absolute left-0 bottom-0 w-full h-full z-10"></div>
                <img src={post?.image} className="absolute left-0 top-0 w-full h-full z-0 object-cover" />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                    <a href="#"
                        className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{post?.category}</a>
                    <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                       {post?.title}
                       </h2>
                    <div className="flex mt-3">
                        <img src={author?.image ? author?.image:""} alt="avatar"
                            className="h-10 w-10 rounded-full mr-2 object-cover" />
                        <div>
                            <p className="font-semibold text-gray-200 text-sm"> {`${author?.firstname} ${author?.lastname}`} </p>
                            <p className="font-semibold text-gray-400 text-xs"> {properDate} </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <p className="pb-6">
                    {post?.content}
                </p>

            </div>
        </div>
    )
}