import { app } from "./app";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbConnect";
import http from "http";
import { initSocket } from "./socketServer";

const server = http.createServer(app);

dotenv.config();

const PORT = process.env.PORT || 3000;

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  dbConnect();
});
