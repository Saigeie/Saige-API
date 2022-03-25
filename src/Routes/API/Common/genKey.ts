import genKey, { genKeyInterface } from "../../../modules/genKey";
import { APIRoute } from "../../../structures/Route";

export default new APIRoute({
    name: `genKey`,
    owner: true,
    type: "json",
    run: async (req, res) => {
        const response = await genKey() as genKeyInterface;
        if (response.status === "Failed") { res.send({ res: `Failed to gather key.`, code: 404 }) }
        res.send({res: `Key has been generated`, key: response.key, code: 200})
    }
})