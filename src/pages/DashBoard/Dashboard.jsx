import React from "react";
import InfoBar from "./InfoBar";
import Orders from "./Orders";
export default function Dashboard() {
  return (
    <main className="container w-full pt-10 pr-5">
      <h1 className="text-3xl font-semibold mb-10 italic">Dashboard</h1>
      <InfoBar></InfoBar>
      <div>
        <Orders></Orders>
      </div>
    </main>
  );
}
