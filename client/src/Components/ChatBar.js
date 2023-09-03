import React, { useState, useEffect } from "react";
import UserCart from "./UserCart";
import fallback from "../Assets/user.png";
export let getactiveUsers=[];
const noAvtar=fallback;
const ChatBar = ({ socket, roomerSetter, activeSetter }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      const privateChatUsers = data.filter((user) => user.private === true);
      const groupChatUsers = data.filter((user) => user.private === false);
      const filteredUsers = roomerSetter ? privateChatUsers : groupChatUsers;
      getactiveUsers=filteredUsers;
      setUsers(filteredUsers);
    });
  }, [socket, users,roomerSetter]);

  return (
    <div className="fixed flext flex-col items-center justify-center pt-2">
      <h1 className="text-2xl text-pink-800 font-mono font-bold flex items-center justify-center">
        Open Chat
      </h1>
      <div className="flex flex-col items-center  pt-5">
        <h3 className="text-green-700 text-md font-mono font-bold pb-4">
          ACTIVE USERS
        </h3>
        <div>
          {users.map((user) => (
            <UserCart
              key={user.id}
              id={user.id}
              userName={user.name}
              img={user.img || noAvtar}
              roomerSetter={roomerSetter}
              activeSetter={activeSetter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
