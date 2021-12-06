import { Link } from "react-router-dom"

export const Author = (author) => {
    let data = author.author
    return (
        <li className="flex items-center mb-6"><img
            src={data?.image} alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full" />
            <p><Link to="#" className="mx-1 font-bold text-gray-700 hover:underline">{`${data.firstname} ${data.lastname}`}</Link><span
                className="text-sm font-light text-gray-700">Created Posts: {data.postCount} </span></p>
        </li>
    )
}