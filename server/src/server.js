import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "./errorHandlers.js";
import tableRoutes from "./api/tableRoutes.js";
import insertRecordsRoute from "./api/insertRecords.js";

const server = express();
const port = process.env.PORT || 3010;

// ******************************* MIDDLEWARES ****************************************
server.use(cors());
server.use(express.json());

// ******************************** ENDPOINTS *****************************************
server.use("/table", tableRoutes);
server.use("/populate", insertRecordsRoute);

// ***************************** ERROR HANDLERS ***************************************
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

const mongooseURL = process.env.MONGO_URL;

mongoose.connect(mongooseURL);
mongoose.connection.on("connected", () => {
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
