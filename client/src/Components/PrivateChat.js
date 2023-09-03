import React, { useState,useEffect } from "react";
import ChatBar from "./ChatBar";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import PrivateBody from "./PrivateBody";

const PrivateChat = ({ socket }) => {
  
  const [active, setActive] = useState(false);
  const [roomer, setRoomer] = useState(null);
  const [offRommers,setOffRoomers]=useState([]);
  const [typingStatus,setTypingStatus]=useState({});
  const roomerSetter = (data) => {
    setRoomer(data);
  };
  const activeSetter = () => {
    setActive(true);
  };
  useEffect(()=>{
    socket.on("offRoomerResponse",data=>setOffRoomers(data));
  },[socket,offRommers]);
  useEffect(()=>{
    socket.on("typingResponse",data=>setTypingStatus(data));
    socket.on("removeTypingResponse",data=>setTypingStatus(data));
},[socket]);

  return (
    <div className="bg-gray-950 text-white min-h-screen flex justify-between">
      <div className=" bg-slate-800 w-[29.5%] md:w-[300px]">
        <ChatBar
          socket={socket}
          roomerSetter={roomerSetter}
          activeSetter={activeSetter}
        />
      </div>
      <main className="bg-slate-900 w-[70%] md:w-[calc(100%-304px)]">
        <ChatHeader name={"private chat"} socket={socket} roomer={roomer} typingStatus={typingStatus}/>
        <PrivateBody active={active} socket={socket} roomer={roomer}/>
        <ChatFooter socket={socket} active={active} roomer={roomer} offRommers={offRommers} />
      </main>
    </div>
  );
};

export default PrivateChat;
