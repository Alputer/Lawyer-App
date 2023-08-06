import { z, object, string, number, TypeOf, } from "zod";

const intRegex = new RegExp(
  /^\d+$/
);

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - firstname
 *        - lastname
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          example: jane.doe@example.com
 *        firstname:
 *          type: string
 *          example: Jane
 *        lastname:
 *          type: string
 *          example: Doe
 *        password:
 *          type: string
 *          example: 123456
 *        passwordConfirmation:
 *          type: string
 *          example: 123456
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "User successfully created"
 */
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

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateProfileInput:
 *      type: object
 *      properties:
 *        age:
 *          type: integer
 *          example: 25
 *        phoneNumber:
 *          type: string
 *          example: "+905329876543"
  *        linkedinUrl:
 *          type: string
 *          example: https://www.linkedin.com/in/alptuna/
 *    UpdateProfileResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Profile successfully updated"
 */

  const updateProfileSchema = object({
    body: object({
      age: number().min(18).max(100).nullable().optional(),
      phoneNumber: string().regex(phoneRegex).nullable().optional(),
      linkedinUrl: string().url().nullable().optional(),
    }),
  });

  /**
   * @openapi
   * components:
   *  schemas:
   *    RateLawyerInput:
   *      type: object
   *      required:
   *        - rated_email
   *        - rating
   *      properties:
   *        rated_email:
   *          type: string
   *          example: test1@gmail.com
   *        rating:
   *          type: integer
   *          minimum: 1
   *          maximum: 5
   *          example: 3
   *    RateLawyerResponse:
   *      type: object
   *      properties:
   *        message:
   *          type: string
   *          example: Lawyer is successfully rated
   */
  const rateLawyerSchema = object({
    body: object({
      rated_email: string({
        required_error: "Rated email is required",
      }).email("Not a valid rated email"),
      rating: number({
        required_error: "Rating is required",
      }).int().min(1).max(5),

    }),
  });

/**
 * @openapi
 * components:
 *  schemas:
 *    GetLawyersResponse:
 *      type: array
 *      items:
 *        type: object
 *        required:
 *          -email
 *          -firstname
 *          -lastname
 *          -bar_id
 *          -lawyer_state
 *          -average_rating
 *        properties:
 *          email:
 *            type: string
 *          firstname:
 *            type: string
 *          lastname:
 *            type: string 
 *          bar_id:
 *            type: integer
 *          lawyer_state:
 *            type: string
 *          average_rating:
 *            type : float    
 */

  const getLawyersSchema = object({
    params: object({
      barId: string().regex(intRegex),
  }),
    query: object({
      availability: z.enum(["True", "False"]).optional(),
      minRating: string().min(1).max(5).optional(),
      maxRating: string().min(1).max(5).optional(),
  })
  });

/**
  * @openapi
  * components:
  *    GetProfileResponse:
  *      type: object
  *      required:
  *        - age
  *        - phone_number
  *        - linkedin_url
  *      properties:
  *        age:
  *          type: integer
  *          example: 25
  *        phone_number:
  *          type: string
  *          example: "+905323456789"
  *        linkedin_url:
  *          type: string
  *          example: https://www.linkedin.com/in/alptuna/
  */

  const getUserProfileSchema = object({
    params: object({
      userEmail: string(),
    })
  });

  /**
  * @openapi
  * components:
  *   schemas:
  *    GetUserCityResponse:
  *      type: object
  *      required:
  *        - user_location
  *      properties:
  *        user_location:
  *         type: string
  *         example: "Istanbul"
  *    UpdateUserCityResponse:
  *      type: object
  *      required:
  *        - message
  *      properties:
  *        message:
  *          type: string
  *          example: "User's location is successfully updated"
  */

  const updateCityOfTheUserSchema = object({
    params: object({
      cityName: string(),
    })
  });




export type CreateUserInput = Omit<
TypeOf<typeof createUserSchema>["body"],
"passwordConfirmation"
>;

export interface Lawyer {
  email: string,
  firstname: string,
  lastname: string,
  bar_id: string,
  lawyer_state: string,
  average_rating: number,
}

export default {createUserSchema, updateProfileSchema, rateLawyerSchema, getLawyersSchema, getUserProfileSchema, updateCityOfTheUserSchema};