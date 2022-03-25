import RateLimitStore from "rate-limit-mongo";
import ExpressRateLimit from "express-rate-limit";

export default ExpressRateLimit({
  max: 100,
  message: {
    res: `You are currently being rate Limited, Please wait ~10 minutes`,
    code: 429,
  },
  store: new RateLimitStore({ uri: `${process.env.DB}` }),
  windowMs: 60 * 1000 * 10,
});
