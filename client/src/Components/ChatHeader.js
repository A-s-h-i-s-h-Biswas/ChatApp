import React from "react";
import { useNavigate } from "react-router-dom";
import { getactiveUsers } from "./ChatBar";
const ChatHeader = ({ socket, typingStatus, name, roomer, group }) => {
  const navigate = useNavigate();
  const id = socket.id;
  const leaveHandler = () => {
    socket.emit("offRoomer", id);
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };
  const typer = getactiveUsers.find(
    (user) => user.name === typingStatus.senderName
  );
  const receiver = group || id === typingStatus.receiverId;
  //   console.log(roomer);
  return (
    <div className="fixed w-[70%] md:w-[calc(100%-304px)] z-10 bg-slate-800 flex h-[60px]  justify-between items-center pl-2 pr-2">
      <div>
        {roomer && (
          <div className="flex items-center">
            <div className="w-[30px] h-[30px] mr-2">
              <img
                className="w-[100%] h-[100%] object-cover"
                src={roomer.img}
                alt=""
              />
            </div>
            <h3 className="font-bold text-md">{`${
              roomer?.userName || (name ?? "Group Name")
            }`}</h3>
          </div>
        )}
        {!roomer && (
          <h3 className="font-bold text-md">{`${
            roomer?.userName || (name ?? "Group Name")
          }`}</h3>
        )}
        <p className="text-sm font-mono italic">
          {typer &&
            (typingStatus?.senderName && receiver
              ? `${typingStatus.senderName} is typing`
              : "")}
        </p>
      </div>
      <div>
        <button
          onClick={leaveHandler}
          className="bg-rose-800 w-[80px] h-[35px] rounded-md font-mono font-bold text-md"
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
