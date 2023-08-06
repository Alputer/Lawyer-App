import express from "express";
import locationController from "../controllers/location.controller";
import requireUser from "../middlewares/requireUser";

const router = express.Router();

/**
 * @openapi
 * '/api/cities':
 *  get:
 *     tags:
 *     - Location
 *     summary: Get all cities
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *                example:
 *                  - "Istanbul"
 *                  - "New York"
 *                  - "Tokyo"
 *                  - "London"
 *      403:
 *        description: Invalid or expired access token
 *      500:
 *        description: Internal server error
 */

router.get("/cities", requireUser(), locationController.getCities);

export default router;
