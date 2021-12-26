import { Link } from "react-router-dom";
import "./404.css";
export default function NotFound ()  {
    return (
        <div >
            <div className="bg-gradient-to-r from-gray-300 to-gray-200">
                <div className="flex items-center justify-center w-9/12 min-h-screen py-16 m-auto">
                    <div className="pb-8 overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="pt-8 text-center border-t border-gray-200">
                            <h1 className="font-bold text-gray-400 text-9xl">404</h1>
                            <h1 className="py-8 text-6xl font-medium">oops! Page not found</h1>
                            <Link to="/">
                            <p className="px-12 pb-8 text-2xl font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                            <button className="px-6 py-3 mr-6 font-semibold text-white rounded-md bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
                                HOME
                            </button>
                           </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}