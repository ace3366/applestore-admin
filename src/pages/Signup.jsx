import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import errorDisplay from "../util/errorDisplay";
export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  // Hàm submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/admin/signup`,
        { method: "POST", body: formData, credentials: "include" }
      );
      if (!response.ok) {
        const resData = await response.json();
        setError(resData);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-10  text-neutral-500">
              Sign up
            </h2>

            {/* Phần form */}
            <form onSubmit={handleSubmit} className="flex flex-col w-4/5">
              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {errorDisplay(error, "fullName")}
                </p>
                <input
                  type="text"
                  name="fullName"
                  className={`${
                    errorDisplay(error, "fullName") &&
                    "transition ease-in bg-red-200"
                  } border-2 hover:border-neutral-400 h-16 pl-7 w-full`}
                  placeholder="Full Name"
                />
              </div>

              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {errorDisplay(error, "email")}
                </p>
                <input
                  type="text"
                  name="email"
                  className={`${
                    errorDisplay(error, "email") &&
                    "transition ease-in bg-red-200"
                  } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 w-full`}
                  placeholder="Email"
                />
              </div>

              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {errorDisplay(error, "password")}
                </p>
                <input
                  type="password"
                  name="password"
                  className={`${
                    errorDisplay(error, "password") &&
                    "transition ease-in bg-red-200"
                  } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 w-full`}
                  placeholder="Password"
                />
              </div>

              <div className="relative">
                <p className="absolute pl-7 pt-1 text-xs text-red-500">
                  {" "}
                  {errorDisplay(error, "phone")}
                </p>
                <input
                  type="text"
                  name="phone"
                  className={`${
                    errorDisplay(error, "phone") &&
                    "transition ease-in bg-red-200"
                  } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 w-full`}
                  placeholder="Phone"
                />
              </div>

              {/* Nút submit */}
              <button className="w-full py-5 text-neutral-200 mt-6 bg-sky-700">
                SIGN UP
              </button>
            </form>

            {/* Phần toggle signup/in */}
            <div className="mt-10 italic text-lg">
              <span className="text-neutral-500">Login ?</span>
              <Link to="/login" className="cursor-pointer ml-2 text-sky-700">
                Click
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
