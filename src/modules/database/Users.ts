// Same schema from: https://github.com/Saigeie/DCTinder/blob/main/src/database/users.ts

import Mongoose from "mongoose";

export interface Message {
  type: "LIKE" | "MATCH" | "UPDATE";
  res: string;
  author: Users;
}

export interface Users {
  userId: string;
  api_key: string;
  BasicInformation: object;
  CustomInformation: object;
  profileViews: Number;
  matches: Number;
  blockedUserIds: Array<string>;
  messages: Array<Message>;
}

const schema = new Mongoose.Schema({
  userId: { type: String },
  api_key: { type: String },
  BasicInformation: { type: Object, default: {} },
  CustomInformation: { type: Object, default: {} },

  // Stats
  bio: { type: String },
  profileViews: { type: Number, default: 0 },
  matchedUsers: { type: Array, default: [] },
  matches: { type: Number, default: 0 },
  blockedUserIds: { type: Array, default: [] },
  messages: { type: Array, default: [] },
});

export default Mongoose.model("Users", schema);
