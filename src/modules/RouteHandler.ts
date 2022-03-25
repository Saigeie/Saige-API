import { Request } from "express";
import { Response } from "express-serve-static-core";
import glob from "glob";
import { promisify } from "util";
import { APIRouteType } from "../types/RouteTypes";
import ValidateAuth, { OwnerOnlyKey } from "./middleware/validateAuth";
const globPromise = promisify(glob);

export async function importFile(filePath: string) {
  return (await import(filePath))?.default;
}

export function GetEndPoints(file: APIRouteType, res: Response) {
  if (file.name !== "/") {
    const jsonEndPoints = [];
    const imageEndPoints = [];
    const parms = [];
    if (file.params && file.params.length > 0) {
      if (file.params.length === 1) {
        parms.push("?" + file.params);
      }
      if (file.params.length > 1) {
        for (let i = 0; i < file.params.length; i++) {
          parms.push(`&${file.params[i]}`);
        }
      }
    }

    const apiKeySymbol = parms.length > 0 ? "&" : "?";
    if (file.type === "json") {
      jsonEndPoints.push(
        `GET /api/${file.parentRoute ? `${file.parentRoute}/` : ""}${
          file.name
        }${parms.join("")}${apiKeySymbol}apikey=key`
      );
    }
    if (file.type === "image") {
      imageEndPoints.push(
        `GET /api/${file.parentRoute ? `${file.parentRoute}/` : ""}${
          file.name
        }${parms.join("")}${apiKeySymbol}apikey=key`
      );
    }
    return { json: jsonEndPoints, image: imageEndPoints };
  }
}


// API Route Handler
export async function APIRouteHandler(app) {
  const Files = await globPromise(`${process.cwd()}/src/Routes/API/**/*.ts`);
  let route = "";
  Files.map(async (x) => {
    const file: APIRouteType = await importFile(x);
    if (!file) return;
    app.get(
      `/api/${file.parentRoute ? `${file.parentRoute}/` : ""}${file.name}`,
      async (req: Request, res: Response) => {
        if (file.owner) { 
           if (!(await OwnerOnlyKey(req))) {
             return res.send({ res: `This is not the valid owner key. Please supply the OWNER_ONLY_KEY to gain a response from this endpoint`, code: `401` });
           }
        }
        if (!(await ValidateAuth(req))) {
          return res.send({ res: `Invalid API Key`, code: `401` });
        }
        file.run(req, res);
      }
    );
  });
}
// Route Handler
export  async function RouteHandler(app) {
  const Files = await globPromise(`${process.cwd()}/src/Routes/General/**/*.ts`);
  Files.map(async (x) => {
    const file: APIRouteType = await importFile(x);
    if (!file) return;
    app.get(
      `${file.name.startsWith("/") ? `${file.name}` : `/${file.name}`}`,
      (req: Request, res: Response) => {
        file.run(req, res);
      }
    );
  });
}

