import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:8000");

function App() {
  const [messageData, setMessageData] = useState({
    value: "",
    id: "",
  });

  const sendMessage = () => {
    socket.emit("sendMessage", messageData);
  };

  useEffect(() => {
    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("message", (data) => {
      console.log(data);
    });

    socket.on("receiveMessage", (data) => {
      console.log(data);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <div>
      <div className=" h-screen flex items-center justify-center gap-1   w-full bg-yellow-300">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter your id"
            value={messageData.id}
            className="rounded-md outline-none p-2 shadow-md"
            onChange={(e) =>
              setMessageData({ ...messageData, id: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter your message"
            value={messageData.value}
            className="rounded-md outline-none p-2 shadow-md"
            onChange={(e) =>
              setMessageData({ ...messageData, value: e.target.value })
            }
          />
        </div>

        <button
          onClick={sendMessage}
          className=" py-2 px-4 bg-red-500 rounded-md border-none text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
export default App;
