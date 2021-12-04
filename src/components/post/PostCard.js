import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userService.js";

export const PostCard = (props) => {
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
    }, [])
    let properDate = new Date(properties.date.seconds*1000).toLocaleDateString();
    
    
    return (
        <div className="mt-6">
            <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between"><span className="font-light text-gray-600">{properDate}</span><Link to={`/post/${properties.postId}`}
                    className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">Laravel</Link>
                </div>
                <div className="mt-2"><Link to="#" className="text-2xl font-bold text-gray-700 hover:underline">{properties.title}</Link>
                    <p className="mt-2 text-gray-600">
                        {properties.description}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4"><Link to={`/post/${properties.postId}`}
                    className="text-blue-500 hover:underline">Read more</Link>
                    <div><Link to="#" className="flex items-center"><img   
                        src={`${author?.image ? author.image:''}`}
                        alt="" className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" />
                        <h1 className="font-bold text-gray-700 hover:underline">{`${author?.firstname} ${author?.lastname}`}</h1>
                    </Link></div>
                </div>
            </div>
        </div>
    )
}