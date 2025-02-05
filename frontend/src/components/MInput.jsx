import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage, toggleMessageTrigger } from "../utils/messageSlice";
import { useSelector } from "react-redux";

const MInput = () => {
  const [text, setText] = useState("");
  const sendUser = useSelector((store) => store.selectedUser);
  const _id = sendUser?._id;

  const dispatch = useDispatch();

  const handleSend = () => {
    if (!sendUser || !_id || text === "") {
      return;
    }
    dispatch(sendMessage({ text, _id }));
    setTimeout(() => {
      dispatch(toggleMessageTrigger());
    }, 500);
    setText("");
  };

  return (
    <div className="fixed bottom-0  flex items-center" >
      <input
        type="text"
        placeholder="Type here"
        className="flex-1 input input-bordered p-2 m-2 rounded-lg text-sm sm:text-base"
        value={text}
        style={{width:"850px"}}
        onChange={(e) => setText(e.target.value)}
        disabled={!sendUser}
      />
      <button
        className="p-2 m-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 flex items-center justify-center"
        onClick={handleSend}
        disabled={!sendUser}
      >
        <SendHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default MInput;
