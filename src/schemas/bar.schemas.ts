import { object, string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    GetBarsResponse:
 *      type: array
 *      items:
 *        type: string
 *        example: "Istanbul Barosu"
 */

const getBarsInTheCitySchema = object({
  query: object({
    cityId: string(),
  }),
});

export default { getBarsInTheCitySchema };
