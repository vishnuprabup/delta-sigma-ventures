import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";

import postRouter from './router/postRouter.js'
import authRouter from "./router/authRouter.js";
import "./setup/mongooseConnection.js";
import { corsOptions } from "./setup/authSetup.js";

const app = express();
const port = process.env.WEB_APP_SERVER_DOMAIN_PORT || 3200;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/post", postRouter)

app.use((req, res) => {
  res.send("Server started");
});

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
