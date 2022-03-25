import { Request } from "express";
import apiKeys from "../database/apiKeys";

export default async function ValidateAuth(req: Request) {
    const { apikey } = req.query
    const keys = await apiKeys.findOne({ serverId: `${process.env.SERVER_ID}` })
    if (!apikey || keys.keys.includes(`${apikey}`) === false) return false;
    if (apikey || keys.keys.includes(`${apikey}`) === true) return true;
}


export function OwnerOnlyKey(req: Request) {
     const { apikey } = req.query;
     return apikey === `${process.env.API_KEY}` ? true : false;
}