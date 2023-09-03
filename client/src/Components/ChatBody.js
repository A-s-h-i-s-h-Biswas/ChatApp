import React from "react";

const ChatBody = ({ messages,lastMessageRef,active }) => {
  if(!active)return <h2 className="text-white text-center h-screen flex items-center justify-center">Start Chating Privately</h2>
  console.log(messages);
  return (
    <div className=" flex flex-col mt-[60px] mb-[80px]">
      {messages?.filter(message=>!message.receiverId).map((message) =>
        message.name === localStorage.getItem("userName") ? (
          <div className="flex  flex-col items-end mr-2">
            <p className="font-mono font-bold opacity-60 ">You</p>
            <div className="bg-green-400 w-[70%] rounded-md min-h-[40px] max-w-[350px] flex items-center pl-2 pr-2 text-black ">
              <p className=" w-[100%] break-words p-2">{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="ml-2">
            <p className="font-mono font-bold opacity-60">{message.name}</p>
            <div className=" bg-pink-400 w-[70%] rounded-md min-h-[40px] max-w-[350px] flex items-center text-black ">
              <p className=" w-[100%] break-words  p-2">{message.text}</p>
            </div>
          </div>
        )
      )}
      <div  ref={lastMessageRef}/>
    </div>
  );
};

export default ChatBody;
