// app.js

import express from "express";
import { PORT } from "./config.js";
import routes from './routes.js'
import mongoose from "./db.js";
import cors from "cors"

const app = express();

const allowedOrigins = true

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,DELETE",
  credentials: true, //Enable credentials (cookies, authorization headers) crossorigin 
  optionsSuccessStatus: 204
}))

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log("Server Listening and is ready on PORT:", port);
});
