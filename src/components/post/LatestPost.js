import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userService.js";


export const LatestPost = (props) => {
    let properties = props.props;

    const [error, setError] = useState(null);
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        async function getData() {
            try {
                let result = await getUser(properties.creatorId);
                setAuthor(result.data());
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }
        getData();
    }, [properties.creatorId])

    let properDate = new Date(properties?.date.seconds * 1000).toLocaleDateString();

    return (
        <div className="px-8 mt-10">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
            <div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center"><Link to={`/post/${properties?.postId}`}
                    className="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500">{properties.category}</Link>
                </div>
                <div className="mt-4"><Link to={`/post/${properties?.postId}`} className="text-lg font-medium text-gray-700 hover:underline">
                    {properties.title}</Link></div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center"><img
                        src={author?.image}
                        alt="avatar" className="object-cover w-8 h-8 rounded-full" /><Link to="#"
                            className="mx-3 text-sm text-gray-700 hover:underline">{`${author?.firstname} ${author?.lastname}`}</Link></div><span
                                className="text-sm font-light text-gray-600">{properDate}</span>
                </div>
            </div>
        </div>
    )
}