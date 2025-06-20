import { useEffect, useState, useRef } from "react";
import { Heart, Send, MessageCircleHeart, PinOff } from "lucide-react";
import socket from "@/lib/socket";
import { useQuery } from "@tanstack/react-query";
import { getMessageBYMatchAPI } from "@/services/MessageService";
import { useUnpin } from "@/lib/useUnpin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CustomAlertDialog from "../Global Components/AlertDialogue";

interface Message {
  senderId: string;
  message: string;
  timestamp: Date;
}

const ChatBox = ({matchId,userId,partner}:{matchId:string,userId:string,partner:any}) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  console.log(partner)
  const storedData = localStorage.getItem("userInfo");
  const token = storedData ? JSON.parse(storedData)?.token : null;

  //fetch previous messages
  const { data: preMsg } = useQuery({
    queryKey: ["fetch message"],
    queryFn: () => getMessageBYMatchAPI(matchId as string, token as string),
    enabled: !!matchId && !!token,
  });

useEffect(() => {
  if (preMsg?.messages?.length) {
    setMessages(preMsg.messages); // ✅ use .messages here
  }
}, [preMsg]);


  useEffect(() => {
    let mounted = true;
    socket.connect();
    socket.emit("joinMatch", { matchId });

    const handleReceiveMessage = (msg: Message) => {
      if (mounted) setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      mounted = false;
      socket.off("receiveMessage", handleReceiveMessage);
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
      senderId: userId || "",
      message: newMessage,
    };

    // Emit to socket
    socket.emit("sendMessage", messageObj);
    setNewMessage("");
  };

  //unpin match-
  const { mutateAsync: unpinMatch } = useUnpin(token as string);

  const handleUnpinMatch = async () => {
    try {
      await unpinMatch(); // ✅ This is now awaitable
      navigate("/matches"); // or refetch state
    } catch (err: any) {
      toast.error("Failed to unpin match")
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 border border-pink-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-4 text-white">
        <CustomAlertDialog title="Unpin & Find New Love" description="Are you sure you want to unpin your match and find a new one?" type="alert" onConfirm={handleUnpinMatch} onCancel={() => {}} trigger={<button className="cursor-pointer" title="Unpin Partner">
          <PinOff className="w-6 h-6" />
        </button>}/>
        <div className="items-center">
          <div className="flex items-center justify-center gap-2">
            <MessageCircleHeart className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Love Connection</h2>
            <Heart className="w-5 h-5 text-pink-200 animate-pulse" />
          </div>
          <p className="text-center text-pink-100 text-sm mt-1">
            Share your heart ❤️
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-pink-400">
            <Heart className="w-12 h-12 mb-2 animate-pulse" />
            <p className="text-lg font-medium">Start your love conversation</p>
            <p className="text-sm">
              Send the first message to connect hearts 💕
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                msg.senderId === userId
                  ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-br-md"
                  : "bg-white text-gray-800 border border-pink-100 rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.senderId === userId ? "text-pink-100" : "text-gray-400"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-pink-100">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message with love... 💕"
              className="w-full px-4 py-3 pr-12 rounded-full border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white/90 placeholder-pink-300 text-gray-700 transition-all duration-200"
            />
            <Heart className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-300" />
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        <div className="flex items-center justify-center mt-3 gap-1">
          <div className="flex space-x-1">
            {["💕", "❤️", "😘", "🥰", "💖", "🌹"].map((emoji, i) => (
              <button
                key={i}
                onClick={() => setNewMessage((prev) => prev + emoji)}
                className="text-lg hover:scale-125 transition-transform duration-200 p-1 rounded-full hover:bg-pink-100"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-200 w-4 h-4 animate-pulse opacity-20`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
