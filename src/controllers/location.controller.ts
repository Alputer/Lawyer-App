import { Request, Response } from "express";
import { locationService } from "../services";

export async function getCities(req: Request, res: Response) {
  try {
    const cities = await locationService.getCities();

    return res.status(200).json({ cities: cities });
  } catch (e: any) {
    console.error("Error getting cities:", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export default {
  getCities,
};
