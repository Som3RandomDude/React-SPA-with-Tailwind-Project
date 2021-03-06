import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/authContext.js";
import { containsUser, deletePost, dislikePost, getPost, likePost } from "../../services/postsService.js"
import { deleteUserPost, getUser } from "../../services/userService.js";
import { Link } from "react-router-dom";


import './Post.css';

export default function Post({
  match, history
}) {

  const { id } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [hasLiked, setLiked] = useState(false);
  const [isAuthor, setisAuthor] = useState(null);

  useEffect(() => {

    async function getData() {
      try {

        let postResult = await getPost(match.params.postId);
        setPost(postResult.data());
        let authorResult = await getUser(postResult.data().creatorId);
        setAuthor(authorResult.data());
        if (postResult.data().creatorId === id) {
          setisAuthor(true);
        }
        if (postResult.data().likes.includes(id)) {
          setLiked("liked");
        }


      } catch (error) {
        setError(error);
        console.log(error);
        toast.error("An error occured try again later!");

      }
    }
    getData();
  }, [match.params.postId, hasLiked, id])

  async function likepostHandler(e) {

    let post = match.params.postId;
    try {
      await likePost(post, id);
      setLiked('liked');
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("An error occured try again later!");
    }

  }

  async function dislikepostHandler(e) {
    try {
      let post = match.params.postId;
      await dislikePost(post, id);
      setLiked(null);
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("An error occured try again later!");
    }

  }

  async function deletePostHandler() {
    try {
      let post = match.params.postId;
      await deletePost(post);
      await deleteUserPost(id, post);
      history.push('/');
    } catch (error) {
      setError(error);
      console.log(error);
      toast.error("An error occured try again later!");
    }

  }

  console.log(hasLiked);
  const userControls = () => {
    if (id) {
      return (
        hasLiked
          ? <button className="btn border border-gray-500   p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-red-500 hover:bg-red-300" onClick={dislikepostHandler}>Unlike</button>
          : <button className="btn border border-gray-500   p-1 px-4  font-semibold cursor-pointer text-gray-200 ml-2 bg-green-500 hover:bg-green-300" onClick={likepostHandler}>Like</button>

      )
    }
  }

  const authorControls = () => {
    return (
      <>
        <Link to={`/edit/${match.params.postId}`}>  <button className="btn border border-gray-500   p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-red-500 hover:bg-red-300" >Edit</button></Link>
        <button className="btn border border-gray-500   p-1 px-4  font-semibold cursor-pointer text-gray-200 ml-2 bg-green-500 hover:bg-green-300" onClick={deletePostHandler}>Delete</button>
      </>
    )

  }

  let properDate = new Date(post?.date.seconds * 1000).toLocaleDateString();

  return (
    <>

      <div className="relative container mx-auto bg-white px-4">
        <div className="relative -mx-4 top-0 pt-[17%] overflow-hidden">
          <img className="absolute inset-0 object-cover object-top w-full h-full filter blur" src={post?.image} alt="" />
        </div>

        <div className="mt-[-10%] w-1/2 mx-auto">
          <div className="relative pt-[56.25%] overflow-hidden rounded-2xl">
            <img className="w-full h-full absolute inset-0 object-cover" src={post?.image} alt="" />
          </div>
        </div>

        <article className="max-w-prose mx-auto py-8 ">
          <div className="flex w-full justify-between">
            <div className="">
              <h1 className="text-2xl font-bold">{post?.title}</h1>
              <h2 className="mt-2 text-sm text-gray-500">{`${author?.firstname} ${author?.lastname}`}, {properDate}</h2>
            </div>
            <div className="flex-row justify-evenly">

              {isAuthor
                ? authorControls(id)
                : userControls()
              }


              <h2 className="mt-2 text-sm text-gray-500 flex justify-center">Likes: {post?.likesCount}</h2>
            </div>
          </div>
          <p className="mt-6">
            {post?.content}
          </p>
        </article>

      </div>

    </>
  )
}