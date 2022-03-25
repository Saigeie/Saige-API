import { Schema, model, Document } from "mongoose";

export interface APIKEYS extends Document {
  serverId: string;
  keys: Array<string>;
}
const schema = new Schema({
  serverId: { type: String, default: `${process.env.API_KEY}` },
  keys: { type: Array, default: [`${process.env.API_KEY}`] },
});

export default model<APIKEYS>("APIKEYS", schema);
