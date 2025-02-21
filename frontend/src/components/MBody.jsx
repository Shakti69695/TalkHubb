import { useEffect, useState, useCallback } from "react";
import { formatMessageTime } from "../utils/util.js";
import { useSelector } from "react-redux";
import MInput from "./MInput.jsx";

const MBody = () => {
  const sendUser = useSelector((store) => store.selectedUser);
  const auth = useSelector((store) => store.user);
  const messageTrigger = useSelector((store) => store.message.messageTrigger);
  const socket = useSelector((store) => store.socket.socket);

  const [messageData, setMessageData] = useState([]);

  const subscribeToMsg = useCallback(() => {
    if (!sendUser || !socket) return;

    socket.on("newMessage", (newMessage) => {
      setMessageData((prevMes) => {
        if (!prevMes.some((msg) => msg._id === newMessage._id)) {
          return [...prevMes, newMessage];
        }
        return prevMes;
      });
    });
  }, [sendUser, socket]);

  useEffect(() => {
    const getMessage = async () => {
      if (!sendUser || !sendUser._id) return;
      try {
        const res = await fetch(
          `https://talkhubb-back.onrender.com/getMessage/${sendUser._id}`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        setMessageData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMessage();
  }, [sendUser, messageTrigger]);

  useEffect(() => {
    subscribeToMsg();
    return () => {
      // Clean up socket listener on component unmount
      socket.off("newMessage", subscribeToMsg);
    };
  }, [subscribeToMsg]);

  return (
    <div className="relative">
      <div className="w-full overflow-scroll h-[36rem] sm:h-96">
        {messageData.map((mes) => (
          <div
            key={`${mes._id}-${mes.senderId}`} // unique key
            className={`chat ${
              mes.senderId === auth._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={
                    mes.senderId === auth._id
                      ? auth.photoUrl
                      : sendUser.photoUrl
                  }
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">
                {formatMessageTime(mes.createdAt)}
              </time>
            </div>
            <div className="chat-bubble">{mes.text}</div>
          </div>
        ))}
      </div>
      <MInput />
    </div>
  );
};
export default MBody;
