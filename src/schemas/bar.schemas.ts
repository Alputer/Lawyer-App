import { z, object, string, number, TypeOf} from "zod";

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
    params: object({
      cityId: string(),
    })
  });

export default {getBarsInTheCitySchema};