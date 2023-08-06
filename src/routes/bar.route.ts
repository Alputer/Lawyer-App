import express from "express";
import barSchemas from "../schemas/bar.schemas";
import barController from "../controllers/bar.controller";
import validateResource from "../middlewares/validateResource";
import requireRegistration from "../middlewares/requireRegistration";
import requireUser from "../middlewares/requireUser";

const router = express.Router();

/**
 * @openapi
 * '/api/bars/:cityId':
 *  get:
 *     tags:
 *     - Bar
 *     summary: Get bars in a given city
 *     parameters:
 *     - in: path
 *     description: ID of the city
 *     required: true
 *     schema:
 *       type: integer
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetBarsResponse'
 *      400:
 *        description: Incorrect path paremeter
 *      403:
 *        description: Invalid or expired access token
 *      404:
 *        description: City not found
 *      500:
 *        description: Internal server error
 */

router.get(
  "/bars/:cityId",
  validateResource(barSchemas.getBarsInTheCitySchema),
  requireUser(),
  barController.getBarsInTheCity
);

export default router;
