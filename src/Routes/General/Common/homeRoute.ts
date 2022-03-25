import { Route } from "../../../structures/Route";
import glob from "glob";
import { promisify } from "util";
import { importFile } from "../../../modules/RouteHandler";
import { APIRouteType } from "../../../types/RouteTypes";
const globPromise = promisify(glob);

export default new Route({
  name: "/",
  run: async (req, res) => {
    const jsonEndPoints = [];
    const imageEndPoints = [];
    const Files = await globPromise(`${process.cwd()}/src/Routes/**/*.ts`);
    Files.map(async (x) => {
      const file: APIRouteType = await importFile(x);
      if (!file.name || file.name === "/" || file.owner) return;
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
          `GET /api/${file.name}${parms.join("")}${apiKeySymbol}apikey=<key>`
        );
      }
      if (file.type === "image") {
        imageEndPoints.push(
          `GET /api/${file.name}${parms.join("")}${apiKeySymbol}apikey=<key>`
        );
      }
    });

    setTimeout(() => {
      res.send({
        res: `Welcome to the Saige, API`,
        information: `To use this API please gain your API key from the discord server - (https://discord.gg/chVhWNyF4b)`,
        requiredments: `Everything inside of "<>" is requied, although everything inside of "[]" is optional`,
        endPoints: {
          "JSON EndPoints": jsonEndPoints,
          "Image EndPoints": [],
        },
        code: 200,
      });
    }, 1000);
  },
});
