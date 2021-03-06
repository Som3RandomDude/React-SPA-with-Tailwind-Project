import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/authContext.js';


import { uploadFile } from '../../services/fileService.js';
import { getUser, updateUserPhoto } from '../../services/userService.js';
import { Loading } from '../loading/Loading.js';
import './Profile.css';

export default function Profile({
    match
}) {
    const { id } = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(false);

    const [user, setUser] = useState(null);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(false);
    const mounted = useRef(false);
    useEffect(() => {
        async function getData() {
            try {
                mounted.current = true;
                setLoading(true);
                let userResult = await getUser(id);
                setUser(userResult.data());
                setLoading(false);
                return () => {
                    mounted.current = false;
                };
            } catch (error) {
                setError(error);
                toast.error("An error occured try again later!");
                console.log(error);
            }
        }
        getData();
    }, [match.params.userId, error, message, id])
    let properDate = new Date(user?.date.seconds * 1000).toLocaleDateString();

    async function changePhoto(e) {
        try {


            let picture = e.target.files[0];

            if (!picture.name.match(/\.(jpg|jpeg|png|gif)$/)) {

                toast.warn('Please select a valid image.')
                return false;
            }

            let uploadResult = await uploadFile('users', picture);
            let test = await updateUserPhoto(match.params.userId, uploadResult);
            setMessage(true);
            toast.success("Image successfully changed!");
            setTimeout(() => {
                setMessage(false);
            }, 2000);


        } catch (error) {
            setError(error);
            toast.error("An error occured try again later!");
            console.log(error);
        }
    }

    return (
        <>
            {loading
                ? <Loading />
                :
                <div >
                    <div className="w-full text-white bg-main-color">
                        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">

                            <div className="container p-5 mx-auto my-5">
                                <div className="md:flex no-wrap md:-mx-2 ">

                                    <div className="w-full md:w-3/12 md:mx-2">
                                        {/* <!-- Profile Card --> */}

                                        <div className="p-3 bg-white border-t-4 border-gray-600">
                                            <div className="overflow-hidden image">
                                                <img className="w-full h-auto mx-auto"
                                                    src={user?.image}
                                                    alt="" />
                                            </div>
                                            <div className="flex justify-center">
                                                <label className="p-1 px-4 mt-2 ml-2 font-semibold text-gray-200 bg-gray-500 border border-gray-500 rounded cursor-pointer btn">
                                                    <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={changePhoto} />
                                                    Upload Photo
                                                </label>
                                            </div>
                                            <div className="flex justify-center">
                                                <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">{user?.firstname} {user?.lastname}</h1>
                                            </div>
                                            <ul
                                                className="px-3 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow">

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
                                    <div className="w-full h-64 md:w-9/12">
                                        {/* <!-- Profile tab -->
                                <!-- About Section --> */}
                                        <div className="p-3 bg-white rounded-sm shadow-sm">
                                            <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                                                <span className="text-gray-500">
                                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </span>
                                                <span className="tracking-wide">About</span>
                                            </div>
                                            <div className="text-gray-700">
                                                <div className="grid text-sm md:grid-cols-2">
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">First Name</div>
                                                        <div className="px-4 py-2">{user?.firstname}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Last Name</div>
                                                        <div className="px-4 py-2">{user?.lastname}</div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Post Count:</div>
                                                        <div className="px-4 py-2">{user?.postCount}</div>
                                                    </div>

                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                                        <div className="px-4 py-2">
                                                            <Link className="text-blue-800" to="">{user?.email}</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <Link to={`/posts/${match.params.userId}`}>
                                                <button
                                                    className="block w-full p-3 my-4 text-sm font-semibold text-blue-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs ">
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
            }
        </>
    )
}
