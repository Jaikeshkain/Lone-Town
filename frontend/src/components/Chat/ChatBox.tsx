import { useEffect, useState, useRef } from "react";
import socket from "@/lib/socket";

interface Message {
  senderId: string;
  message: string;
  timestamp: Date;
}

const ChatBox = ({ matchId, userId }: { matchId: string; userId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect and join match room
    socket.connect();
    socket.emit("joinMatch", { matchId });

    // Listen for incoming messages
    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageObj = {
      matchId,
      senderId: userId,
      message: newMessage,
    };

    // Emit to socket
    socket.emit("sendMessage", messageObj);

    // Add locally
    setMessages((prev) => [...prev, { ...messageObj, timestamp: new Date() }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[500px] border rounded shadow-md p-4 bg-white">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.senderId === userId
                ? "bg-blue-100 text-right ml-auto"
                : "bg-gray-100 text-left"
            }`}
          >
            <p className="text-sm">{msg.message}</p>
            <p className="text-[10px] text-gray-400">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="input flex-1"
        />
        <button
          onClick={sendMessage}
          className="btn bg-blue-600 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
