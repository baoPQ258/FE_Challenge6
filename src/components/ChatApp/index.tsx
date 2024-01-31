import React, { useState, useEffect } from "react";
import { Server } from "socket.io";


const ChatApp = () => {
  const io = new Server(server);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socket = io("http://localhost:3000"); // Điều chỉnh URL phù hợp với server của bạn

  useEffect(() => {
    // Lắng nghe sự kiện 'chat' từ server
    socket.on("chat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Gửi sự kiện 'chat' với nội dung tin nhắn
    socket.emit("chat", { message: messageInput });
    setMessageInput("");
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.sender}: {msg.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
