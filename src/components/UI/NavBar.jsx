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
    <>
      {/* medium and below */}
      <nav className="md:hidden block w-full bg-green-500 fixed flex justify-between">
        <ul className=" text-xl leading-10 flex">
          <li className="hover:bg-slate-50 hover:text-green-500 border-r transition duration-300 ease-in text-white">
            <Link to="/" className="px-3 py-2">
              <i className="fa-solid fa-table-list"></i>{" "}
              <span className="sm:inline hidden">Dashboard</span>
            </Link>
          </li>
          <li className="hover:bg-slate-50 hover:text-green-500 border-r  transition duration-300 ease-in text-white">
            <Link to="/products" className="px-3 py-2">
              {" "}
              <i className="fa-solid fa-cubes"></i>{" "}
              <span className="sm:inline hidden">Product List</span>
            </Link>
          </li>
          <li className="hover:bg-slate-50 hover:text-green-500 border-r  transition duration-300 ease-in text-white">
            <Link to="/create-product" className="px-3 py-2">
              {" "}
              <i className="fa-solid fa-circle-plus"></i>{" "}
              <span className="sm:inline hidden">Create Product</span>
            </Link>
          </li>
          <li className="hover:bg-slate-50 hover:text-green-500 border-r transition duration-300 ease-in text-white">
            <Link to="/chat" className="px-3 py-2">
              <i className="fa-solid fa-headset"></i>{" "}
              <span className="sm:inline hidden">Chat</span>
            </Link>
          </li>
        </ul>
        {/* Phần logout */}
        <div className="hover:text-neutral-400 cursor-pointer text-white px-3 py-2 text-xl">
          <Link
            to="login"
            onClick={() => {
              logOutAction();
            }}
            className="ml-2"
          >
            <i className="fa-solid fa-right-from-bracket"></i>{" "}
            <span className="md:inline hidden">Log out</span>
          </Link>
        </div>
      </nav>
      {/* medium and above */}
      <nav className="min-w-48 md:block hidden">
        <div className="fixed pt-10 h-screen bg-green-700 flex flex-col justify-between">
          {/* Phần trên của nav */}
          <div>
            <h1 className="text-3xl italic pl-10 pr-10 text-white border-b pb-5">
              APPLE<br></br> STORE
            </h1>
            <ul className=" text-xl leading-10">
              <li className="hover:bg-slate-50 hover:text-green-500 transition duration-300 ease-in text-white">
                <Link to="/" className="pl-5 pt-2 pb-2 border-b block pr-2">
                  <i className="fa-solid fa-table-list"></i> Dashboard
                </Link>
              </li>
              <li className="hover:bg-slate-50 hover:text-green-500 transition duration-300 ease-in text-white">
                <Link
                  to="/products"
                  className="pl-5 pt-2 pb-2 border-b block  pr-2"
                >
                  {" "}
                  <i className="fa-solid fa-cubes"></i> Product List
                </Link>
              </li>
              <li className="hover:bg-slate-50 hover:text-green-500 transition duration-300 ease-in text-white">
                <Link
                  to="/create-product"
                  className="pl-5 pt-2 pb-2 border-b block  pr-2"
                >
                  {" "}
                  <i className="fa-solid fa-circle-plus"></i> Create Product
                </Link>
              </li>
              <li className="hover:bg-slate-50 hover:text-green-500 transition duration-300 ease-in text-white">
                <Link
                  to="/chat"
                  className="pl-5 pt-2 pb-2 border-b block  pr-2"
                >
                  <i className="fa-solid fa-headset"></i> Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Phần dưới của nav */}
          <p className="hover:text-neutral-400 cursor-pointer transition duration-300 ease-in text-white pl-5 pt-2 pb-7 text-xl">
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link
              to="login"
              onClick={() => {
                logOutAction();
              }}
              className="ml-2"
            >
              Log out
            </Link>
          </p>
        </div>
      </nav>
    </>
  );
}
