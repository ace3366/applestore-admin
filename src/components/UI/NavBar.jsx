import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const logOutAction = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Can not logout");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="min-w-48">
      <div className="fixed pt-10 h-screen bg-green-700 flex flex-col justify-between">
        {/* Phần trên của nav */}
        <div>
          <h1 className="text-3xl italic pl-10 pr-10 text-white border-b pb-5">
            APPLE<br></br> STORE
          </h1>
          <ul className=" text-xl leading-10">
            <li className="hover:bg-slate-50 hover:text-green-500 text-white">
              <Link to="/" className="pl-5 pt-2 pb-2 border-b block">
                Dashboard
              </Link>
            </li>
            <li className="hover:bg-slate-50 hover:text-green-500 text-white">
              <Link to="/products" className="pl-5 pt-2 pb-2 border-b block">
                {" "}
                Product List
              </Link>
            </li>
            <li className="hover:bg-slate-50 hover:text-green-500 text-white">
              <Link
                to="/create-product"
                className="pl-5 pt-2 pb-2 border-b block"
              >
                {" "}
                Create Product
              </Link>
            </li>
            <li className="hover:bg-slate-50 hover:text-green-500 text-white">
              <Link to="/chat" className="pl-5 pt-2 pb-2 border-b block">
                Chat
              </Link>
            </li>
          </ul>
        </div>

        {/* Phần dưới của nav */}
        <p className="hover:text-neutral-400 cursor-pointer text-white pl-5 pt-2 pb-7 text-xl">
          <i className="fa-solid fa-right-from-bracket"></i>
          <Link
            to="login"
            onClick={() => {
              dispatch(loginActions.ON_LOGOUT());
              logOutAction();
            }}
            className="ml-2"
          >
            Log out
          </Link>
        </p>
      </div>
    </nav>
  );
}
