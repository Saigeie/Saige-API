import { Request, Response } from "express";
interface RunOptions {
  (req: Request, res: Response);
}

export type APIRouteType = {
  name: string;
  owner?: boolean;
  params?: Array<string>;
  parentRoute?: string;
  type: "image" | "json";
  run: RunOptions;
};


export type RouteType = {
    name: string;
  run: RunOptions;
}