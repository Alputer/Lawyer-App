import { z, object, string, number, TypeOf} from "zod";


const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const createUserSchema = object({
    body: object({
      firstname: string({
        required_error: "Firstname is required",
      }),
      lastname: string({
        required_error: "Lastname is required",
      }),
      password: string({
        required_error: "Password is required",
      }).min(6, "Password too short - should be 6 chars minimum"),
      passwordConfirmation: string({
        required_error: "passwordConfirmation is required",
      }),
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
    }).refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
  });

  const phoneNumberSchema = z.string().regex(/^\+\d{1,3}\d{4,14}$/).refine((value) => {
    return /\d/.test(value); // Ensuring the phone number contains at least one digit
  }, {
    message: 'Invalid phone number format. Should be in the format: "+{country_code}{phone_number}"',
  })

  const updateProfileSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      age: number().min(18).max(100).nullable().optional(),
      phoneNumber: string().regex(phoneRegex).nullable().optional(),
      linkedinUrl: string().url().nullable().optional(),
    }),
  });

  const rateLawyerSchema = object({
    body: object({
      rater_email: string({
        required_error: "Rater email is required",
      }).email("Not a valid rater email"),
      rated_email: string({
        required_error: "Rated email is required",
      }).email("Not a valid rated email"),
      rating: number({
        required_error: "Rating is required",
      }).int().min(1).max(5),

    }),
  });

export type CreateUserInput = Omit<
TypeOf<typeof createUserSchema>["body"],
"passwordConfirmation"
>;

export default {createUserSchema, updateProfileSchema, rateLawyerSchema};