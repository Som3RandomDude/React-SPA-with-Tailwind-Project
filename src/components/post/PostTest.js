import { useEffect, useState } from "react"
import { getPost } from "../services/postsService.js"
import { getUser } from "../services/userService.js";
import './test.css';

export default function PostTest({
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
      
      <div class="relative container mx-auto bg-white px-4">
        <div class="relative -mx-4 top-0 pt-[17%] overflow-hidden">
          <img class="absolute inset-0 object-cover object-top w-full h-full filter blur" src={post?.image} alt="" />
        </div>
      
        <div class="mt-[-10%] w-1/2 mx-auto">
          <div class="relative pt-[56.25%] overflow-hidden rounded-2xl">
            <img class="w-full h-full absolute inset-0 object-cover" src={post?.image} alt="" />
          </div>
        </div>
      
        <article class="max-w-prose mx-auto py-8">
          <h1 class="text-2xl font-bold">{post?.title}</h1>
          <h2 class="mt-2 text-sm text-gray-500">{`${author?.firstname} ${author?.lastname}`}, {properDate}</h2>
      
          <p class="mt-6">
          {post?.content}
          </p>
          </article>
      </div>
    )
}