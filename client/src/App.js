import socketIO from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Chat from "./Components/Chat";
import PrivateChat from "./Components/PrivateChat";
const socket = socketIO.connect("https://chat-c5ax7mmeq-dataanalysismachine-gmailcom.vercel.app/");

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home socket={socket} />}></Route>
      <Route path="/chat" element={<Chat socket={socket} />}></Route>
      <Route path="/chat/private" element={<PrivateChat socket={socket} />}></Route>
    </Routes>
  );
}

export default App;
