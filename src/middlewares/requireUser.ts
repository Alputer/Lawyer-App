import { Request, Response, NextFunction } from "express";

const requireUser = () => (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).json({
      error: "You need a valid and not expired access token",
    });
  }

  return next();
};

export default requireUser;
