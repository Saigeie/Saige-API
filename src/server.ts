require("dotenv").config();
import express from "express";
import { APIRouteHandler, RouteHandler} from "./modules/RouteHandler";
import Mongo from "./modules/database/connect";
import rateLimiter from "./modules/rateLimiter";
import bodyParser from "body-parser";
import apiKeys from "./modules/database/apiKeys";
const app = express();

APIRouteHandler(app);
RouteHandler(app);
Mongo()

// app.use(rateLimiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("json spaces", 1);

app.listen(process.env.PORT || 80, async () => {
  console.log(`Connected to server, port: ${process.env.PORT || 80}`);
  const apikey = await apiKeys.findOne({ serverId: `${process.env.SERVER_ID}` })
  if(!apikey) {  await apiKeys.create({ serverId: `${process.env.SERVER_ID}` }); }
})
