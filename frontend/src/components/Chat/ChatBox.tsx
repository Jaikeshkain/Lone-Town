import React from 'react';

interface ChatBoxProps {
  // Add props as needed
}

const ChatBox: React.FC<ChatBoxProps> = () => {
  return (
    <div className="chat-box">
      <div className="chat-messages">
        {/* Messages will be rendered here */}
      </div>
      <div className="chat-input">
        {/* Chat input form */}
      </div>
    </div>
  );
};

export default ChatBox; 