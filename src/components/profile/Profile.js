import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userService.js';
import './Profile.css';
export default function Profile({
    match
}) {

    const [error, setError] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        async function getData() {
            try {

                let userResult = await getUser(match.params.userId);
                setAuthor(userResult.data());
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }
        getData();
    }, [match.params.userId])
    let properDate = new Date(author?.date.seconds*1000).toLocaleDateString();

    return (
        <>
            <div className="bg-gray-100">
                <div className="w-full text-white bg-main-color">
                    <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">



                        <div className="container mx-auto my-5 p-5">
                            <div className="md:flex no-wrap md:-mx-2 ">

                                <div className="w-full md:w-3/12 md:mx-2">
                                    {/* <!-- Profile Card --> */}
                                    <div className="bg-white p-3 border-t-4 border-gray-600">
                                        <div className="image overflow-hidden">
                                            <img className="h-auto w-full mx-auto"
                                                src={author?.image}
                                                alt="" />
                                        </div>
                                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{author?.firstname} {author?.lastname}</h1>

                                        <ul
                                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

                                            <li className="flex items-center py-3">
                                                <span>Member since</span>
                                                <span className="ml-auto">{properDate}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <!-- End of profile card --> */}
                                    <div className="my-4"></div>

                                </div>
                                {/* <!-- Right Side --> */}
                                <div className="w-full md:w-9/12 mx-2 h-64">
                                    {/* <!-- Profile tab -->
                                <!-- About Section --> */}
                                    <div className="bg-white p-3 shadow-sm rounded-sm">
                                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                            <span clas="text-green-500">
                                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <span className="tracking-wide">About</span>
                                        </div>
                                        <div className="text-gray-700">
                                            <div className="grid md:grid-cols-2 text-sm">
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                                    <div className="px-4 py-2">{author?.firstname}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                                    <div className="px-4 py-2">{author?.lastname}</div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Post Count:</div>
                                                    <div className="px-4 py-2">{author?.postCount}</div>
                                                </div>

                                                <div className="grid grid-cols-2">
                                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                                    <div className="px-4 py-2">
                                                        <Link className="text-blue-800" to="">{author?.email}</Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <Link to="">
                                        <button
                                            className="block w-full 
                                            text-blue-800 text-sm font-semibold rounded-lg 
                                            hover:bg-gray-100 
                                            focus:outline-none 
                                            focus:shadow-outline 
                                            focus:bg-gray-100 
                                            hover:shadow-xs 
                                            p-3 
                                            my-4
                                            ">
                                            Show Posts
                                        </button>
                                        </Link>
                                    </div>
                                    {/* <!-- End of about section --> */}

                                    <div className="my-4"></div>

                                    {/* <!-- Experience and education --> */}

                                    {/* <!-- End of profile tab --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
