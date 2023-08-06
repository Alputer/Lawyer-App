import { z, object, string, coerce} from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    MakeOfferInput:
 *      type: object
 *      required:
 *        - jobId
 *      properties:
 *        jobId:
 *          type: string
 *          example: "1af1cb7b-e299-4497-ae19-b16dc35d50ff"
 *    MakeOfferResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Offer is successfully created"
 */

const makeOfferSchema = object({
    body: object({
      jobId: string({
        required_error: "Job Id is required",
      }),
    }),
  });

/**
 * @openapi
 * components:
 *  schemas:
 *    AcceptOfferInput:
 *      type: object
 *      required:
 *        - offerId
 *      properties:
 *        offerId:
 *          type: string
 *          example: "344f17e5-97b9-48fa-98c1-b4c8ce8bc753"
 *    AcceptOfferResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Offer is successfully accepted"
 */

  const acceptOfferSchema = object({
    body: object({
      offerId: string({
        required_error: "Offer Id is required",
      }),
    }),
  });

/**
 * @openapi
 * components:
 *  schemas:
 *    RejectOfferInput:
 *      type: object
 *      required:
 *        - offerId
 *      properties:
 *        offerId:
 *          type: string
 *          example: "344f17e5-97b9-48fa-98c1-b4c8ce8bc753"
 *    RejectOfferResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Offer is successfully rejected"
 */

  const rejectOfferSchema = object({
    body: object({
      offerId: string({
        required_error: "Offer Id is required",
      }),
    }),
  });


  export default {makeOfferSchema, acceptOfferSchema, rejectOfferSchema};