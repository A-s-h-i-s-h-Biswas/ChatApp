import React, { useState } from "react";
const ChatFooter = ({ socket, active, roomer, offRommers }) => {
  const [message, setMessage] = useState();
  // console.log(offRommers);
  const name = localStorage.getItem("userName");
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (message?.trim() && name) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        socketID: socket.id,
        receiverId: roomer?.id,
        id: `${socket.id}${Math.random()}`,
      });
    }
    socket.emit("removeTyping", "");
    setMessage("");
  };
  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!e.target.value) {
      socket.emit("removeTyping", {});
      return;
    }
    socket.emit("typing", { senderName: name, receiverId: roomer?.id });
  };
  if (!active) return;

  return (
    <footer className="bg-slate-800 h-[70px]  flex items-center justify-center fixed w-[70%] md:w-[calc(100%-304px)] bottom-0">
      {!roomer || (roomer && offRommers.indexOf(roomer?.id) < 0) ? (
        <form
          onSubmit={sendMessageHandler}
          className="w-[100%] flex items-center justify-center"
        >
          <input
            className="bg-transparent h-[40px] w-[65%] outline-none text-white text-md pl-2 pr-2"
            type="text"
            placeholder="Type message here"
            value={message}
            onChange={handleTyping}
          />
          <button
            type="submit"
            className=" h-[20px] w-[30px] flex items-center justify-center "
          >
            <img src="https://www.svgrepo.com/show/466173/send.svg" alt="" />
          </button>
        </form>
      ) : (
        <h3 className="flex items-center justify-center text-rose-900 italic font-bold font-mono text-2xl text-opacity-50">
          {roomer?.userName + " left the chat room"}
        </h3>
      )}
    </footer>
  );
};

export default ChatFooter;
