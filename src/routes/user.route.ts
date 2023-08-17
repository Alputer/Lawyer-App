import express from "express";
import userSchemas from "../schemas/user.schemas";
import userController from "../controllers/user.controller";
import validateResource from "../middlewares/validateResource";
import requireRegistration from "../middlewares/requireRegistration";
import requireUser from "../middlewares/requireUser";

const router = express.Router();

/**
 * @openapi
 * '/api/user':
 *  post:
 *    tags:
 *    - User
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: Bar does not exist
 *      409:
 *        description: User with given email already exists
 *      500:
 *        description: Internal server error
 */
router.post(
  "/",
  validateResource(userSchemas.createUserSchema),
  userController.register
);

/**
 * @openapi
 * '/api/user':
 *  get:
 *    tags:
 *    - User
 *    summary: Get lawyers
 *    parameters:
 *    - in: query
 *      name: availability
 *      description: Filter lawyers by availability
 *      required: false
 *      schema:
 *        type: string
 *    - in: query
 *      name: barId
 *      description: Filter lawyers by barId
 *      required: false
 *      schema:
 *        type: number
 *    - in: query
 *      name: minRating
 *      description: Filter lawyers by minimum rating
 *      required: false
 *      schema:
 *        type: number
 *    - in: query
 *      name: maxRating
 *      description: Filter lawyers by maximum rating
 *      required: false
 *      schema:
 *        type: number
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetLawyersResponse'
 *      400:
 *        description: Incorrect path parameter or invalid query parameter
 *      403:
 *        description: Invalid or expired access token
 *      404:
 *        description: Bar not found
 *      500:
 *        description: Internal server error
 */

router.get(
  "/",
  validateResource(userSchemas.getLawyersSchema),
  requireUser(),
  userController.getLawyers
);

/**
 * @openapi
 * '/api/user/:userEmail/profile':
 *  get:
 *    tags:
 *    - User
 *    summary: Get the user profile with given email
 *    parameters:
 *    - in: path
 *      description: Email of the user
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetProfileResponse'
 *      400:
 *        description: Incorrect path parameter
 *      403:
 *        description: Invalid or expired access token
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 *
 * '/api/user/profile':
 *  put:
 *    tags:
 *    - User
 *    summary: Profile successfully updated
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserProfileInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateProfileResponse'
 *      400:
 *        description: Incorrect path parameter or payload
 *      403:
 *        description: Invalid or expired access token
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */
router.get(
  "/:userEmail/profile",
  validateResource(userSchemas.getUserProfileSchema),
  requireRegistration({ userEmailField: "userEmail", place: "params" }),
  requireUser(),
  userController.getUserProfile
);
router.put(
  "/profile",
  validateResource(userSchemas.updateProfileSchema),
  requireUser(),
  userController.updateProfile
);

/**
 * @openapi
 * '/api/user/:userEmail/city':
 *  get:
 *    tags:
 *    - User
 *    summary: Get the city of the user
 *    parameters:
 *    - in: path
 *      description: Email of the user
 *      required: true
 *      schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserCityResponse'
 *      403:
 *        description: Invalid or expired access token
 *      404:
 *        description: User or city not found.
 *      500:
 *        description: Internal server error
 */
router.get(
  "/:userEmail/city",
  validateResource(userSchemas.getUserCitySchema),
  requireUser(),
  requireRegistration({ userEmailField: "userEmail", place: "params" }),
  userController.getCityOfTheUser
);

/**
 * @openapi
 * '/api/user':
 *  patch:
 *    tags:
 *    - User
 *    summary: Update the city of the user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateUserCityInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserCityResponse'
 *      400:
 *        description: Incorrect payload
 *      403:
 *        description: Invalid or expired access token
 *      404:
 *        description: City not found.
 *      500:
 *        description: Internal server error
 */
router.patch(
  "/",
  validateResource(userSchemas.updateCityOfTheUserSchema),
  requireUser(),
  userController.updateCityOfTheUser
);

/**
 * @openapi
 * '/api/user/rate':
 *  post:
 *    tags:
 *    - User
 *    summary: Rate a lawyer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RateLawyerInput'
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RateLawyerResponse'
 *      400:
 *        description: Incorrect payload
 *      403:
 *        description: Lawyer cannot rate himself/herself
 *      404:
 *        description: User not found.
 *      409:
 *        description: Given rater lawyer already rated the other lawyer.
 *      500:
 *        description: Internal server error
 */
router.post(
  "/rate",
  validateResource(userSchemas.rateLawyerSchema),
  requireRegistration({ userEmailField: "rated_email", place: "body" }),
  requireUser(),
  userController.rateLawyer
);

export default router;
