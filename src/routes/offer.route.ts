import express from "express";
import offerSchemas from "../schemas/offer.schemas";
import offerController from "../controllers/offer.controller";
import validateResource from "../middlewares/validateResource";
import requireUser from "../middlewares/requireUser";

const router = express.Router();

/**
 * @openapi
 * '/api/make-offer':
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
  "/make-offer",
  validateResource(offerSchemas.makeOfferSchema),
  requireUser(),
  offerController.makeOffer
);

/**
 * @openapi
 * '/api/accept-offer':
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
 *        description: Invalid or expired access token
 *      500:
 *        description: Internal server error
 */

router.post(
  "/accept-offer",
  validateResource(offerSchemas.acceptOfferSchema),
  requireUser(),
  offerController.acceptOffer
);

/**
 * @openapi
 * '/api/reject-offer':
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
 *        description: Invalid or expired access token
 *      500:
 *        description: Internal server error
 */

router.post(
  "/reject-offer",
  validateResource(offerSchemas.rejectOfferSchema),
  requireUser(),
  offerController.rejectOffer
);

export default router;
