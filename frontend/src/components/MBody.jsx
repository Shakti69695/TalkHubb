import { useEffect, useState } from "react";
import { formatMessageTime } from "../utils/util.js";
import { useSelector } from "react-redux";
import MInput from "./MInput.jsx";

const MBody = () => {
  const sendUser = useSelector((store) => store.selectedUser);
  const auth = useSelector((store) => store.user);
  const messageTrigger = useSelector((store) => store.message.messageTrigger);

  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    const getMessage = async () => {
      if (!sendUser || !sendUser._id) return;
      try {
        const res = await fetch(
          `http://localhost:8000/getMessage/${sendUser._id}`,
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

  // if ((sendUser != null)&&(messageData.length === 0))
  //   return (
  //     <div>
  //       <div
  //         className="w-full bg-blue-950 overflow-auto"
  //         style={{ height: "26rem" }}
  //       >
  //         {" "}
  //         Start chatting
  //       </div>
  //       <MInput/>
  //     </div>
  //   );

  return (
    <div className="relative">
      <div
        className="w-full bg-blue-950 overflow-auto"
        style={{ height: "26rem" }}
      >
        {messageData.map((mes) => (
          <div
            key={mes._id}
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
