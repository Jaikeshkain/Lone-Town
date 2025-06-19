import API_URL from "@/services/UserService";
import { io, Socket } from "socket.io-client";


const socket: Socket = io(API_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
