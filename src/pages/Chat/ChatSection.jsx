import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";

// Khởi tạo socket
const socket = io(process.env.REACT_APP_API, {
  withCredentials: true,
});
export default function ChatSection() {
  const roomId = useParams().roomId;

  // Khởi tạo State
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // Create a ref for the chat container
  const chatContainerRef = useRef(null);
  // Scroll to the bottom of the chat container whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Nhận incomming message
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((messages) => [...messages, message]);
    };

    socket.on("message", handleMessage);

    // Clean up the listener on component unmount
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  // Lấy tin nhắn từ DB
  useEffect(() => {
    // Join room with roomId
    socket.emit("joinRoom", { roomId });

    // Hàm render tin nhắn từ DB
    const renderMessage = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/admin/get-messages/${roomId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Can not fetch message");
        }
        const resData = await response.json();

        setMessages(resData);
      } catch (err) {
        console.log(err);
      }
    };
    renderMessage();
  }, [roomId]);
  // Hàm gửi tin nhắnh bằng Socket.IO
  const sendingMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      message,
      roomId,
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-between w-full">
      {/* Mục hiển thị tin nhắn */}
      <div
        className="flex flex-col p-4 h-full overflow-scroll"
        ref={chatContainerRef}
      >
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </div>
      {/* Mục chat */}
      <div className=" border-2  bg-neutral-100">
        <form
          onSubmit={(e) => {
            sendingMessage(e);
          }}
          className="py-4 pl-5 flex"
        >
          <input
            className="w-full focus:outline-none hover:outline-1 hover:outline hover:outline-neutral-700 p-1"
            type="text"
            value={message}
            placeholder="Enter Message!"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="px-3">
            <button className="bg-transparent">
              {" "}
              <i className="fa-solid fa-paper-plane text-sky-400 text-2xl hover:text-sky-500"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
