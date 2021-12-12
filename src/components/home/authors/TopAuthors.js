import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { getTopUsers } from "../../../services/userService.js"
import { Author } from "./Author.js";

export function TopAuthors() {
    const [authors, setAuthors] = useState();
    const [error, setError] = useState();
    const mounted = useRef(false);

    useEffect(() => {
        async function getData() {
            try {
                let authorsSnapshot = await getTopUsers(5);

                setAuthors(authorsSnapshot.docs.map(doc => ({ ...doc.data(), authorId: doc.id })));
                return () => {
                    mounted.current = false;
                    authorsSnapshot();
                };

            } catch (error) {
                setError(error);
                toast.error("An error occured try again later!");
            }

        }
        getData(authors);
    }, [])
    
    return (
        <div className="px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
                <ul className="-mx-4">
                    {authors?.map(author =>
                        <Author key={author.authorId} author={author} />
                    )}
                </ul>
            </div>
        </div>
    )
}