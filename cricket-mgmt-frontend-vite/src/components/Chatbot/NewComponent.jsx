import { useState } from "react";
import Chatbot from "./Chatbot"; // Adjust the import path if necessary
 // You can create a new CSS file if needed

const NewComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">chat_bubble</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
    </div>
  );
};

export default NewComponent;