import app from "./src/app.js";
import connectDB from "./src/config/database.js"
import { server } from "./src/sockets/socket.js";


connectDB()
server.listen(process.env.PORT || 3000, ()=>{
  console.log("Server is running on port:", process.env.PORT || 3000);
})