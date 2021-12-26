import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { login } from "../../services/authService.js";
import { Loading } from "../loading/Loading.js";
import "./Login.css";

export default function Login({
    history
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const mounted = useRef(false);

    async function loginHandler(e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let email = formData.get('email');
        let password = formData.get('password');


        try {
            setError('');
            setLoading(true)
            await login(email, password);
            toast.success('Welcome back!');
            setLoading(false);
            
            history.push('/');
            return () => {
                mounted.current = false;
            };

        } catch (error) {
            setLoading(false);
            console.log(error);
            setError('Failed to log in');
            toast.error("Failed to log in");
        }

    }


    return (
        <>
            {loading
                ? <Loading />
                :
                <div
                    className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
                >
                    <div
                        className="flex flex-col max-w-md px-4 py-8 bg-white shadow-md sm:px-6 md:px-8 lg:px-10 rounded-3xl w-50"
                    >
                        <div className="self-center text-xl font-medium text-gray-800 sm:text-3xl">
                            Welcome Back
                        </div>
                        <div className="self-center mt-4 text-xl text-gray-800 sm:text-sm">
                            Enter your credentials to access your account
                        </div>

                        <div className="mt-10">
                            <form action="#" method="POST" onSubmit={loginHandler}>
                                <div className="flex flex-col mb-5">
                                    <label
                                        htmlFor="email"
                                        className="mb-1 text-xs tracking-wide text-gray-600"
                                    >E-Mail Address:</label
                                    >
                                    <div className="relative">
                                        <div
                                            className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400 "
                                        >
                                            <i className="text-blue-500 fas fa-at"></i>
                                        </div>

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className="w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-2xl focus:outline-none focus:border-blue-400"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <label
                                        htmlFor="password"
                                        className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
                                    >Password:</label
                                    >
                                    <div className="relative">
                                        <div
                                            className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400 "
                                        >
                                            <span>
                                                <i className="text-blue-500 fas fa-lock"></i>
                                            </span>
                                        </div>

                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-2xl focus:outline-none focus:border-blue-400"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-gray-600 focus:outline-none sm:text-base hover:bg-gray-500 rounded-2xl"
                                    >
                                        <span className="mr-2 uppercase">Sign In</span>
                                        <span>
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-6">
                        <Link
                            to="/register"
                            target="_blank"
                            className="inline-flex items-center text-xs font-medium text-center text-gray-700 "
                        >
                            <span className="ml-2"
                            />You don't have an account? </Link>
                        <Link
                            to="/register"
                            className="ml-2 text-xs font-semibold text-blue-500"
                        >Register now</Link><span />

                    </div>
                </div>
            }
        </>
    )
}