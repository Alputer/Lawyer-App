import { object, string, coerce } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateJobInput:
 *      type: object
 *      required:
 *        - jobDescription
 *        - dueDate
 *      properties:
 *        jobDescription:
 *          type: string
 *          example: "Test description"
 *        dueDate:
 *          type: string
 *          example: "03-30-2000"
 *    CreateJobResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Job is successfully created"
 */

const createJobSchema = object({
  body: object({
    jobDescription: string({
      required_error: "Job description is required",
    }),
    dueDate: coerce
      .date({
        invalid_type_error: "Input is not a valid date",
      })
      .optional(),
  }),
});

export default { createJobSchema };
