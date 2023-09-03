import React, { useState, useEffect, useRef } from "react";

const PrivateBody = ({ socket, active, roomer }) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef();
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    // scroll to bottom for every text
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!active)
    return (
      <h2 className="text-white text-center h-screen flex items-center justify-center">
        Start Chating Privately
      </h2>
    );
  const filteredMessages = messages?.filter((message) => {
    console.log(message.receiverId + "<-->" + socket.id);
    console.log(roomer.id);
    return (
      message.receiverId === roomer.id ||
      (message.receiverId === socket.id && message.socketID === roomer.id)
    );
  });
  console.log(messages);
  // console.log(filteredMessages);
  // console.log(img);
  return (
    <div className=" flex flex-col mt-[60px] mb-[80px]">
      {filteredMessages?.map((message) =>
        message.name === localStorage.getItem("userName") ? (
          <div key={message.id} className="flex  flex-col items-end mr-2">
            <p className="font-mono font-bold opacity-60 ">You</p>
            <div className="bg-green-400 w-[70%] rounded-md min-h-[40px] max-w-[350px] flex items-center pl-2 pr-2 text-black ">
              <p className=" w-[100%] break-words p-2">{message.text}</p>
            </div>
          </div>
        ) : (
          <div key={message.id} className="ml-2">
            <p className="font-mono font-bold opacity-60">{message.name}</p>
            <div className=" bg-pink-400 w-[70%] rounded-md min-h-[40px] max-w-[350px] flex items-center text-black ">
              <p className=" w-[100%] break-words  p-2">{message.text}</p>
            </div>
          </div>
        )
      )}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default PrivateBody;
