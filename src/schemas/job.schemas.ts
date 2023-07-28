import { z, object, string, coerce} from "zod";

const createJobSchema = object({
    body: object({
      jobDescription: string({
        required_error: "Job description is required",
      }),
      dueDate: coerce.date({
        invalid_type_error: "Input is not a valid date",
      }).optional(),
    }),
  });

  export default {createJobSchema};