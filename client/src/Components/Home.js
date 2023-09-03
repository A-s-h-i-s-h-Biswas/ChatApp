import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const userName = useRef();
  const joinHandler = (e) => {
    e.preventDefault();
    const name = userName.current.value?.trim();
    if (!name) return;
    localStorage.setItem("userName", name);
    // send new user to server
    socket.emit("newUser", { name, id: socket.id, private:false});
    navigate("/chat");
  };
  const privateHandler = (e) => {
    e.preventDefault();
    const name = userName.current.value?.trim();
    if (!name) return;
    localStorage.setItem("userName", name);
    // send new user to server
    socket.emit("newUser", { name, id: socket.id, private:true });
    navigate("/chat/private");
  };
  return (
    <div className="bg-slate-800 h-screen text-white flex items-center justify-center">
      <form className="flex flex-col justify-between w-[300px] h-[250px]">
        <h2 className="text-3xl font-bold font-mono">
          Join <span className="text-pink-800 text-4xl">Open Chat</span>
        </h2>
        <div className="flex flex-col">
          <label className="font-bold font-mono text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="h-[40px] text-lg outline-none rounded-sm pl-3 mt-1 text-slate-950 "
            type="text"
            maxLength={6}
            ref={userName}
            required
            placeholder="Enter username"
          />
        </div>
        <button
          className="bg-green-600 h-[40px] rounded-sm"
          onClick={privateHandler}
        >
          Chat Privately
        </button>
        <button
          className="bg-green-600 h-[40px] rounded-sm"
          onClick={joinHandler}
        >
          Join Group Chat
        </button>
      </form>
    </div>
  );
};
export default Home;
