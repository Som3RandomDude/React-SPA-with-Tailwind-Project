import { useEffect, useRef, useState } from "react";

import { PostCard } from "../post/PostCard.js";
import { LatestPost } from "../post/LatestPost.js";
import {  getLatestPosts, orderPosts, orderPostsByCategory } from "../../services/postsService.js";
import { TopAuthors } from "./authors/TopAuthors.js";
import { Loading } from "../loading/Loading.js";
import { toast } from "react-toastify";

export default function Home() {

  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        let postsSnapshot = await getLatestPosts(10);
        let latestSnapshot = await getLatestPosts(1);

        setPosts(postsSnapshot.docs.map(doc => ({ ...doc.data(), postId: doc.id })));
        setLatest(latestSnapshot.docs.map(doc => ({ ...doc.data(), postId: doc.id })));
        setLoading(false);
        return () => {
          postsSnapshot();
          latestSnapshot();
          mounted.current = false;
        };
      } catch (error) {
        setError(error);
      }

    }
    getData();
  }, [])

  async function orderByTime(e) {
    let selectedValue = e.target.value;
    console.log(selectedValue);
    try {
      let postsSnapshot = await orderPosts(selectedValue);
      
      setPosts(postsSnapshot.docs.map(doc => ({ ...doc.data(), postId: doc.id })));
    } catch (error) {
      setError(error);
      toast.error("An error occured try again later!");

    }

  }
  async function categoryHandler(e) {
    let category = e.target.value;
    try {
      let postsSnapshot = await orderPostsByCategory(category);
      setPosts(postsSnapshot.docs.map(doc => ({ ...doc.data(), postId: doc.id })));

    } catch (error) {

      setError(error);
      toast.error("An error occured try again later!");
    }
  }

  if (loading) {
    return <Loading />
  }

  return (

    <div className="  items-center justify-center" >

      <div >


        <div className="px-6 py-8">

          <div className="container flex justify-between mx-auto">
            <div className="w-full lg:w-8/12">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
                <div>
                  <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={orderByTime}>
                    <option value="desc">Latest</option>
                    <option value="asc">Oldest</option>
                  </select>
                </div>
              </div>

              {posts?.length > 0
                ? posts?.map(props => <PostCard key={props.postId} props={props} />)
                : <div className="flex justify-center min-h-screen">No posts yet... </div>
              }


              {/* Todo:Pagination */}
              {/* <div className="mt-8">
                <div className="flex justify-center">
                  <Link to="#" className="px-3 py-2 mx-1 font-medium text-gray-500 bg-white rounded-md cursor-not-allowed">
                    previous
                  </Link>

                  <Link to="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                    1
                  </Link>

                  <Link to="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                    2
                  </Link>

                  <Link to="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                    3
                  </Link>

                  <Link to="#" className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-blue-500 hover:text-white">
                    Next
                  </Link>
                </div>
              </div> */}
            </div>

            <div className="hidden w-4/12 -mx-8 lg:block">


              <TopAuthors />

              <div className="px-8 mt-10">
                <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
                <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
                  <ul onClick={categoryHandler}>
                    <li className="mt-2" >
                      <button className="mx-1 font-bold cursor-pointer  text-gray-700 hover:text-gray-600 hover:underline" value="NodeJs">- NodeJs</button>
                    </li>
                    <li className="mt-2" >
                      <button className="mx-1 font-bold cursor-pointer  text-gray-700 hover:text-gray-600 hover:underline" value="Vue">- Vue</button>
                    </li>
                    <li className="mt-2" >
                      <button className="mx-1 font-bold cursor-pointer  text-gray-700 hover:text-gray-600 hover:underline" value="Design">- Design</button>
                    </li>
                    <li className="mt-2" >
                      <button className="mx-1 font-bold cursor-pointer  text-gray-700 hover:text-gray-600 hover:underline" value="Angular">- Angular</button>
                    </li>
                    <li className="mt-2" >
                      <button className="mx-1 font-bold cursor-pointer  text-gray-700 hover:text-gray-600 hover:underline" value="React">- React</button>
                    </li>
                  </ul>
                </div>
              </div>

              {latest?.map(props =>
                <LatestPost key={props.postId} props={props} />
              )}



            </div>
          </div>

        </div>

      </div>
    </div>
  )
}