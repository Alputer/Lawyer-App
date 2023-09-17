import { Request, Response, NextFunction } from "express";
import { Lawyer } from "../models/lawyer.model";

interface MiddlewareOptions {
  userIdentifierField: string;
  place: string;
  type: string;
}

export const requireRegistration =
  ({ userIdentifierField, place, type }: MiddlewareOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let identifier: string;

    if (place === "body") {
      identifier = req.body[userIdentifierField];
    } else if (place === "params") {
      identifier = req.params[userIdentifierField];
    } else {
      return res.status(400).json({ error: "Invalid place specified" });
    }

    try {
      let user;

      if (type === "email") {
        user = await Lawyer.findOne({
          email: identifier,
        });
      } else if (type === "id") {
        user = await Lawyer.findOne({
          _id: identifier,
        });
      }

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
