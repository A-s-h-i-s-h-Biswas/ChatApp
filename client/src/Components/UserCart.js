import React from "react";
const UserCart = ({ userName, img ,id,roomerSetter,activeSetter}) => {
  const me = localStorage.getItem("userName");

  const privateChatHandler=()=>{
    if(!roomerSetter || !activeSetter || (me===userName))return;

    roomerSetter({userName,img,id});
    activeSetter();
  }

  return (
    <div onClick={privateChatHandler} className="relative flex items-center w-[100%] h-[50px] mb-2 pl-2 md:mb-5 cursor-pointer">
      <div className={`${
          userName !== me
            ? "w-[10px] h-[10px] rounded-full bg-rose-800 absolute top-2 left-2 opacity-100 animate-ping"
            : "invisible"
        }`} />
      <div
        className={`w-[35px] md:w-[45px] rounded-full overflow-hidden `}
      >
        <img className="w-[100%] h-[100%] object-cover" src={img} alt="" />
      </div>
      <p className={`pl-2 overflow-hidden ${userName===me ? "font-bold":""}`}>{userName}{userName===me ? "(Me)":""}</p>
    </div>
  );
};

export default UserCart;
