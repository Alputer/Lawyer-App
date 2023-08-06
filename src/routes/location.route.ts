import express from 'express';
import userSchemas from '../schemas/user.schemas';
import locationController from '../controllers/location.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


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
   *      500:
   *        description: Internal server error
   */

router.get('/cities', requireUser(), locationController.getCities);


export default router;