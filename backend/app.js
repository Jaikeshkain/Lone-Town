require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http=require("http")
//socket.io
const {Server}=require("socket.io")
const connectDB = require("./configs/db");
const { unfreezeUsersJob }=require("./configs/CronJob");

// Connect to MongoDB
connectDB();

// Import routes
const authRouter=require("./routes/authRoutes")
const stateRouter=require("./routes/stateRoutes");
const matchRouter=require("./routes/matchRoutes");
const messageRouter = require("./routes/messageRoutes");

const saveMessageToDB = require("./utils/saveMessgeToDB");


// Initialize express app
const app = express();
const server=http.createServer(app)

//socket.io
const io=new Server(server,{
  cors:{
    origin:process.env.CLIENT_URL,
    methods:["GET","POST"]
  }
})

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start node-cron
unfreezeUsersJob.start()

// Routes
app.use("/api/auth",authRouter)
app.use("/api/state", stateRouter);
app.use("/api/match",matchRouter);
app.use("/api/message", messageRouter);



//socket.io events
io.on("connection",(socket)=>{
  console.log("User Connected",socket.id);

  //Join match room
  socket.on("joinMatch",({matchId})=>{
    socket.join(matchId);
    console.log(`User ${socket.id} joined room:${matchId}`);
    
  })

  //Receive + broadcast messages
socket.on("sendMessage", async ({ matchId, senderId, message }) => {
  // Save to DB
  const saved = await saveMessageToDB({ matchId, senderId, message });

  // Emit to everyone in the room (sender + receiver)
  io.to(matchId).emit("receiveMessage", saved);
});

  //socket disconnect
  socket.on("disconnect",()=>{
    console.log("User disconnected: ",socket.id);
  })
  
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
