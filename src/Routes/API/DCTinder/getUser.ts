import Users from "../../../modules/database/Users";
import { APIRoute } from "../../../structures/Route";

export default new APIRoute({
  name: `getUser`,
  parentRoute: `dctinder`,
  type: "json",
  params: ["userId=DISCORD_USER_ID"],
  run: async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      return res.send({
        res: `ERROR: Please supply a valid userId`,
        code: 404,
      });
    }
      const userSchema = await Users.findOne({ userId });
      if(!userSchema) {  return res.send({
          res: `ERROR: Could not find any data for this user, Please tell them to sign up first.`,
          usableMessage: `⚠ ERROR: Count not find any data for this user, Please sign up at https://dctinder.saige.cloud`,
         code: 404,
      });
    }
    const formattedData = {
      userId: userSchema.userId,
      DiscordInformation: userSchema.BasicInformation,
      userBio: userSchema.bio,
      views: userSchema.profileViews,
      totalMatches: userSchema.matches,
    }
    res.send({
      res: formattedData,
      code: 200
    })
      
  },
});
