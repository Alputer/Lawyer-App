import { Request, Response } from "express";
import { locationService, barService } from "../services";

export async function getBarsInTheCity(req: Request, res: Response) {
  try {
    const { cityId } = req.query;

    const cityExists = await locationService.cityWithIdExists(cityId);
    if (!cityExists) {
      return res
        .status(404)
        .json({ error: `City with id '${cityId}' could not found` });
    }

    const bars = await locationService.getBars(cityId);

    return res.status(200).json({ bars: bars });
  } catch (e: any) {
    console.error("Error getting bars in the city:", e);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export default {
  getBarsInTheCity,
};
