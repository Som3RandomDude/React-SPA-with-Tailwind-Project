import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "../../services/authService.js";
import { storeUser } from "../../services/userService.js";

import "./Register.css";



export default function Register({
  history
}) {


  const [error, setError] = useState('');



  async function registerHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');


    if (password !== repeatPassword) {
      toast.warn("Passwords don't match");
      return setError("Passwords don't match");
    }

    try {

      setError('');
      let result = await register(email, password);
     
      let store = await storeUser(firstName, lastName, email, result.user.uid);
      toast.success("Successfully created an Account");
      history.push('/');

    } catch (error) {
      console.log(error);
      setError('Failed to create Account');
      toast.error('Failed to create an Account')
    }

  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10"
    >
      <div
        className="
        flex flex-col
        bg-white
        shadow-md
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        py-8
        rounded-3xl
        w-50
        max-w-md
      "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Join us Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get an access account
        </div>

        <div className="mt-10">
          <form action="#" method="POST" onSubmit={registerHandler}>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="first-name"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >First Name:</label>
              <div className="relative">
                <div
                  className="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
                  placeholder="Enter your First Name"
                  required
                />
              </div>

            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="lastName"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >Last Name:</label>
              <div className="relative">
                <div
                  className="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
                  placeholder="Enter your Last Name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >E-Mail Address:</label
              >
              <div className="relative">
                <div
                  className="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
                >
                  <i className="fas fa-at text-blue-500"></i>
                </div>

                <input
                  id="email"
                  type="email"
                  name="email"
                  className="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Password:</label
              >
              <div className="relative">
                <div
                  className="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
                >
                  <span>
                    <i className="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  className="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
                  placeholder="Enter your password"
                  required
                />

              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="repeatPassword"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >Repeat Password:</label
              >
              <div className="relative">
                <div
                  className="
                  inline-flex
                  items-center
                  justify-center
                  absolute
                  left-0
                  top-0
                  h-full
                  w-10
                  text-gray-400
                "
                >
                  <span>
                    <i className="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  id="repeatPassword"
                  type="password"
                  name="repeatPassword"
                  className="
                  text-sm
                  placeholder-gray-500
                  pl-10
                  pr-4
                  rounded-2xl
                  border border-gray-400
                  w-full
                  py-2
                  focus:outline-none focus:border-blue-400
                "
                  placeholder="Repeat your password"
                  required
                />

              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="
                flex
                mt-2
                items-center
                justify-center
                focus:outline-none
                text-white text-sm
                sm:text-base
                bg-gray-600
                hover:bg-gray-500
                rounded-2xl
                py-2
                w-full
                transition
                duration-150
                ease-in
              "
              >
                <span className="mr-2 uppercase">Sign Up</span>
                <span>
                  <svg
                    className="h-6 w-6"
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
      <div className="flex justify-center items-center mt-6">
        <Link
          to="/login"
          target="_blank"
          className="
          inline-flex
          items-center
          text-gray-700
          font-medium
          text-xs text-center
        "
        >
          <span className="ml-2"
          />You have an account?
        </Link>
        <Link
          to="/login"
          className="text-xs ml-2 text-blue-500 font-semibold"
        >Login here</Link><span />

      </div>
    </div>
  )
}
