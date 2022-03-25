import Mongoose from "mongoose";
import { config } from "dotenv";
config();

export default function Mongo() {
  Mongoose.connect(process.env.DB)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Failed to connect to database");
      console.log(err);
    });
}
