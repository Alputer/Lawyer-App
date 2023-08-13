import { Request, Response, NextFunction } from "express";
import Lawyer from "../models/lawyer.model";

interface MiddlewareOptions {
  userEmailField: string;
  place: string;
}

export const requireRegistration =
  ({ userEmailField, place }: MiddlewareOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let email: string;

    if (place === "body") {
      email = req.body[userEmailField];
    } else if (place === "params") {
      email = req.params[userEmailField];
    } else {
      return res.status(400).json({ error: "Invalid place specified" });
    }

    try {
      const user = await Lawyer.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return next();
    } catch (error) {
      console.error("Error checking user registration:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

export default requireRegistration;
