import React,{useState,useEffect,useRef} from 'react'
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';

const Chat = ({socket,name}) => {
    const [messages,setMessages]=useState([]);
    const [typingStatus,setTypingStatus]=useState({});
    const lastMessageRef=useRef();

    useEffect(()=>{
        socket.on("messageResponse",(data)=>setMessages([...messages, data]));
    },[socket,messages]);

    useEffect(()=>{
        // scroll to bottom for every text
        lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);
    useEffect(()=>{
        socket.on("typingResponse",data=>setTypingStatus(data));
        socket.on("removeTypingResponse",data=>setTypingStatus(data));
    },[socket]);
  return (
    <div className='bg-gray-950 text-white min-h-screen flex justify-between'>
        <div className=' bg-slate-800 w-[29.5%] md:w-[300px]'><ChatBar socket={socket}/></div>
        <main className='bg-slate-900 w-[70%] md:w-[calc(100%-304px)]'>
            <ChatHeader active={true} socket={socket} typingStatus={typingStatus} name={name} group={true}/>
            <ChatBody active={true} messages={messages} lastMessageRef={lastMessageRef}/>
            <ChatFooter active={true} socket={socket}/>
        </main>
    </div>
  )
}
export default Chat;