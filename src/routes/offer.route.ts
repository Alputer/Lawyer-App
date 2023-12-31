import express from "express";
import offerSchemas from "../schemas/offer.schemas";
import offerController from "../controllers/offer.controller";
import validateResource from "../middlewares/validateResource";
import requireUser from "../middlewares/requireUser";

const router = express.Router();

/**
 * @openapi
 * '/api/offer':
 *  post:
 *     tags:
 *     - Offer
 *     summary: Make an offer to another lawyer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/MakeOfferInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MakeOfferResponse'
 *      400:
 *        description: Incorrect payload
 *      403:
 *        description: Invalid or expired access token
 *      500:
 *        description: Internal server error
 */

router.post(
  "/",
  validateResource(offerSchemas.makeOfferSchema),
  requireUser(),
  offerController.makeOffer
);

/**
 * @openapi
 * '/api/offer/accept':
 *  post:
 *     tags:
 *     - Offer
 *     summary: Accept an offer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/AcceptOfferInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AcceptOfferResponse'
 *      400:
 *        description: Incorrect payload
 *      403:
 *        description: Invalid/expired access token or you are not authorized to accept this offer
 *      404:
 *        description: Offer could not found
 *      409:
 *        description: Offer is dismissed
 *      500:
 *        description: Internal server error
 */

router.post(
  "/accept",
  validateResource(offerSchemas.acceptOfferSchema),
  requireUser(),
  offerController.acceptOffer
);

/**
 * @openapi
 * '/api/offer/reject':
 *  post:
 *     tags:
 *     - Offer
 *     summary: Reject an offer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/RejectOfferInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RejectOfferResponse'
 *      400:
 *        description: Incorrect payload
 *      403:
 *        description: Invalid/expired access token or you are not authorized to accept this offer
 *      404:
 *        description: Offer could not found
 *      409:
 *        description: Offer is dismissed
 *      500:
 *        description: Internal server error
 */

router.post(
  "/reject",
  validateResource(offerSchemas.rejectOfferSchema),
  requireUser(),
  offerController.rejectOffer
);

export default router;
