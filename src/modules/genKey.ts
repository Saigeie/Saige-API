import apiKeys, { APIKEYS } from "./database/apiKeys";

export interface genKeyInterface {
    status: "Failed" | "Completed",
    key?: string
}
export default async function () {
    const key = genString();
    const keys = await apiKeys.findOne({ serverId: `${process.env.SERVER_ID}` }) as APIKEYS
    if (keys.keys.includes(`${key}`)) { return { status: `Failed` } }
    await apiKeys.findOneAndUpdate({ serverId: `${process.env.SERVER_ID}` }, {
        $push: {
            keys: key
        }
    })
    return { status: "Completed", key: `${key}`}
}

export function genString(length: number = 55) {
    let str = "";
    let chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopassdfghjklzxcvbnm1234567890QWERtYuiOokNBfVBNmkUYtfgVBIASUDFGASFAFAFSEGERTYE634T34T34GSDRTEGBE";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str;
}
