import { z, object, string, number, TypeOf} from "zod";

const intRegex = new RegExp(
  /^\d+$/
);
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
      cityId: string().regex(intRegex),
    })
  });

export default {getBarsInTheCitySchema};