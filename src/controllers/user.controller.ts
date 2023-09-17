import { Request, Response } from "express";
import {
  userService,
  barService,
  mailService,
  locationService,
} from "../services";
import { GetLawyersOptions } from "../models/lawyer.model";
import { SORT_OPTIONS, LAWYER_STATE } from "../utils/enums";

const { v4: uuidv4 } = require("uuid");

export async function register(req: Request, res: Response) {
  const body = req.body;

  try {
    const verificationCode = uuidv4();

    const barExists = await barService.barExists(body.barId);
    if (!barExists) {
      return res
        .status(404)
        .json({ error: `Bar with id '${body.barId}' could not found` });
    }

    await userService.createUser(body, verificationCode);

    const mailOptions = {
      from: "alp.tuna.453@gmail.com",
      to: body.email,
      subject: "Verify your email",
      text: `verification code: ${verificationCode}`,
    };

    await mailService.sendEmail(mailOptions);

    return res.status(200).json({
      message: "User successfully created",
    });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).json({
        message: "Account already exists",
      });
    }

    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function getLawyers(req: Request, res: Response) {
  try {
    const { availability, barId, minRating, maxRating, sort, page, pageSize } =
      req.query;

    if (barId) {
      try {
        const barExists = await barService.barExists(barId);
        if (!barExists) {
          return res
            .status(404)
            .json({ error: `Bar with id '${barId}' could not be found` });
        }
      } catch {
        return res
          .status(404)
          .json({ error: `Bar with id '${barId}' could not be found` });
      }
    }

    const options: GetLawyersOptions = {
      barId: barId as string,
      lawyer_state:
        availability === undefined
          ? undefined
          : availability === "True"
          ? LAWYER_STATE.FREE
          : LAWYER_STATE.BUSY,
      minRating: parseFloat(minRating as string),
      maxRating: parseFloat(maxRating as string),
      sort: sort === SORT_OPTIONS.DESC ? SORT_OPTIONS.DESC : SORT_OPTIONS.ASC,
      page: parseInt(page as string) || 1,
      pageSize: parseInt(pageSize as string) || 10,
    };

    const { lawyers, totalCount } = await userService.getLawyers(options);

    return res.status(200).json({
      totalItems: totalCount,
      lawyers: lawyers,
      currentPage: options.page,
      totalPages: Math.ceil(totalCount / options.pageSize),
    });
  } catch (e: any) {
    console.error("Error getting lawyers", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function getUserProfile(req: Request, res: Response) {
  try {
    const { userEmail } = req.params;

    const user_profile = await userService.getUserProfile(userEmail);
    if (!user_profile) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user_profile: user_profile });
  } catch (e: any) {
    console.error("Error getting user profile:", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const email = res.locals.user.email;
    const { age, phoneNumber, linkedinUrl } = req.body;

    await userService.updateProfile(email, age, phoneNumber, linkedinUrl);

    return res.status(200).json({
      message: "Profile successfully updated",
    });
  } catch (e: any) {
    console.error("Error resetting password:", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function getCityOfTheUser(req: Request, res: Response) {
  try {
    const { userEmail } = req.params;

    const user_location = await userService.getUserLocation(userEmail);

    if (!user_location) {
      return res.status(404).json({ error: "User has no registered city" });
    }

    return res.status(200).json({ user_location: user_location });
  } catch (e: any) {
    console.error("Error getting user's city", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function updateCityOfTheUser(req: Request, res: Response) {
  try {
    const userEmail = res.locals.user.email;
    const { cityId } = req.body;

    const cityExists = await locationService.cityWithIdExists(cityId);
    if (!cityExists) {
      return res
        .status(404)
        .json({ error: `City with id '${cityId}' could not found` });
    }

    await userService.updateUserLocation(userEmail, cityId);

    return res.status(200).json({
      message: "User's location is successfully updated",
    });
  } catch (e: any) {
    console.error("Error updating user's city", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function rateLawyer(req: Request, res: Response) {
  try {
    const rater_id = res.locals.user.id;
    const { rated_id, rating } = req.body;

    if (rater_id === rated_id) {
      return res.status(403).json({
        message: "Lawyer cannot rate himself/herself",
      });
    }

    await userService.rateLawyer(rater_id, rated_id, rating);

    return res.status(200).json({
      message: "Lawyer is successfully rated",
    });
  } catch (e: any) {
    console.error("Error rating lawyer:", e);
    if (e.code === 11000) {
      return res.status(409).json({
        message: "Rater lawyer already rated this lawyer",
      });
    }

    console.error("Error rating lawyer:", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export default {
  register,
  getLawyers,
  getUserProfile,
  updateProfile,
  getCityOfTheUser,
  updateCityOfTheUser,
  rateLawyer,
};
