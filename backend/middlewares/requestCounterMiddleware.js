import { incrementRequestCount } from "../modules/status/requestCounter.js";

export const countRequest = (req, res, next) => {
  
  if (!req.path.includes('/status')) {
    incrementRequestCount();
  }
  
  return next();
};
