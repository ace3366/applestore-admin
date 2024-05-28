import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
export default function Layout() {
  return (
    <div className="flex">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
}
