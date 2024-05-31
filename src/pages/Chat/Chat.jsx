import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Outlet, Link } from "react-router-dom";
export default function Chat() {
  const [rooms, setRooms] = useState([]);
  // Khởi tạo IO
  const socket = io(process.env.REACT_APP_API, {
    withCredentials: true,
  });

  // Lấy dữ liệu về các room khi có user vừa bắt đầu chat
  useEffect(() => {
    const handleRoom = (roomList) => {
      setRooms(roomList);
    };

    socket.on("roomList", handleRoom);

    // Clean up the listener on component unmount
    return () => {
      socket.off("roomList", handleRoom);
    };
  }, []);

  // Lấy dữ liệu về các room hiện tại
  useEffect(() => {
    // Nếu có user mới bắt đầu chat thì room sẽ render ra
    const renderRooms = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/admin/get-all-room`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch message");
        }
        const resData = await response.json();
        setRooms(resData);
      } catch (err) {
        console.log(err);
      }
    };
    renderRooms();
  }, []);

  return (
    <main className="container h-screen w-full pt-10 pr-6">
      <h1 className="text-3xl font-semibold mb-10 italic">Chat</h1>
      <section className="flex border shadow rounded h-5/6">
        {/* Phần chọn Room */}
        <div className="border-r overflow-scroll basis-3/12">
          <ul className="">
            {rooms.map((roomId) => (
              <li
                key={roomId}
                className="border-b block flex hover:bg-green-600"
              >
                <Link
                  to={`/chat/${roomId}`}
                  className="px-2 py-3 inline truncate "
                >
                  <img
                    className="w-10 inline"
                    src={require("../../image/3_avatar-512.png")}
                    alt=""
                  />
                  {roomId}
                </Link>
              </li>
            ))}
            <li className="border-b"></li>
          </ul>
        </div>
        {/* Phần chat trong room đã chọn */}
        <Outlet></Outlet>
      </section>
    </main>
  );
}
