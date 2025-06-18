import React from 'react';

interface MessageProps {
  content: string;
  sender: string;
  timestamp: Date;
}

const Message: React.FC<MessageProps> = ({ content, sender, timestamp }) => {
  return (
    <div className="message-bubble">
      <div className="message-header">
        <span className="sender">{sender}</span>
        <span className="timestamp">{timestamp.toLocaleTimeString()}</span>
      </div>
      <div className="message-content">{content}</div>
    </div>
  );
};

export default Message; 