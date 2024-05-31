import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
export default function Layout() {
  return (
    <div className="flex">
      <NavBar></NavBar>
      <div className="md:pl-3 pl-5 mt-10 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
