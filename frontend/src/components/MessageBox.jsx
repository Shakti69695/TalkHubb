import MBody from "./MBody";
import MHeader from "./MHeader";

const MessageBox = () => {
  return (
    <div className="w-full sm:w-9/12 h-full sm:h-4/5">
      <MHeader />
      <MBody />
    </div>
  );
};

export default MessageBox;
