import { z, object, string, number, TypeOf } from "zod";
import { SORT_OPTIONS } from "../utils/enums";

const intRegex = new RegExp(/^\d+$/);

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
 *        barId:
 *          type: string
 *          example: 6505c2012006d12aa825cda7
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "User successfully created"
 *        verificationCode:
 *          type: string
 *          example: "8ad731fa-b4ce-45ce-a7c5-70b732cf6bf1"
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
    barId: string({
      required_error: "Bar ID required",
    }),
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
 *        - rated_id
 *        - rating
 *      properties:
 *        rated_id:
 *          type: string
 *          example: "6505e86b5f22c4e516ecd1b9"
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
    rated_id: string({
      required_error: "Rated lawyer's ID is required",
    }),
    rating: number({
      required_error: "Rating is required",
    })
      .int()
      .min(1)
      .max(5),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    GetLawyersResponse:
 *      type: object
 *      required:
 *        - totalItems
 *        - lawyers
 *        - currentPage
 *        - totalPages
 *      properties:
 *        totalItems:
 *          type: number
 *          example: 23
 *        lawyers:
 *          type: array
 *          items:
 *            type: object
 *            required:
 *              -email
 *              -firstname
 *              -lastname
 *              -bar_id
 *              -lawyer_state
 *              -average_rating
 *            properties:
 *              email:
 *                type: string
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              bar_id:
 *                type: string
 *              lawyer_state:
 *                type: string
 *              average_rating:
 *                type: number
 *          example:
 *            - email: john.doe@gmail.com
 *              firstname: john
 *              lastname: doe
 *              bar_id: 6505c2012006d12aa825cda7
 *              lawyer_state: FREE
 *              average_rating: 4.2
 *            - email: jane.doe@gmail.com
 *              firstname: jane
 *              lastname: doe
 *              bar_id: 6505c2012006d12aa825cda9
 *              lawyer_state: FREE
 *              average_rating: 3.5
 *            - email: lionel.messi@outlook.com
 *              firstname: lionel
 *              lastname: messi
 *              bar_id: 6505c2012006d12aa825cdaa
 *              lawyer_state: BUSY
 *              average_rating: 5
 *            - email: sabri.sarioglu@gmail.com
 *              firstname: sabri
 *              lastname: sarioglu
 *              bar_id: 6505c2012006d12aa825cda9
 *              lawyer_state: FREE
 *              average_rating: null
 *        currentPage:
 *          type: number
 *          example: 2
 *        totalPages:
 *          type: number
 *          example: 6
 */

const getLawyersSchema = object({
  query: object({
    sort: z.enum([SORT_OPTIONS.DESC, SORT_OPTIONS.ASC]).optional(),
    availability: z.enum(["True", "False"]).optional(),
    minRating: string().min(1).max(5).optional(),
    maxRating: string().min(1).max(5).optional(),
    barId: string().optional(),
    page: string().regex(intRegex).optional(),
    pageSize: string().regex(intRegex).optional(),
  }).refine(
    (data) =>
      (data.minRating === undefined ||
        (parseFloat(data.minRating) <= 5 && parseFloat(data.minRating) >= 1)) &&
      (data.maxRating === undefined ||
        (parseFloat(data.maxRating) <= 5 && parseFloat(data.maxRating) >= 1)),
    {
      message: "minRating and maxRating should be between 1-5.",
      path: ["passwordConfirmation"],
    }
  ),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    GetProfileResponse:
 *      type: object
 *      required:
 *        - age
 *        - phone_number
 *        - linkedin_url
 *      properties:
 *        age:
 *          type: integer
 *          nullable: true
 *          example: 25
 *        phone_number:
 *          type: string
 *          nullable: true
 *          example: "+905323456789"
 *        linkedin_url:
 *          type: string
 *          nullable: true
 *          example: https://www.linkedin.com/in/alptuna/
 *    UpdateUserProfileInput:
 *      type: object
 *      properties:
 *        age:
 *          type: integer
 *          nullable: true
 *          example: 25
 *        phone_number:
 *          type: string
 *          nullable: true
 *          example: "+905323456789"
 *        linkedin_url:
 *          type: string
 *          nullable: true
 *          example: https://www.linkedin.com/in/alptuna/
 */

const getUserProfileSchema = object({
  params: object({
    userEmail: string().email("Not a valid email"),
  }),
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
 *    UpdateUserCityInput:
 *      type: object
 *      required:
 *        - cityId
 *      properties:
 *        cityId:
 *          type: string
 *          example: 6505c2012006d12aa825cda1
 */

const getUserCitySchema = object({
  params: object({
    userEmail: string().email("Not a valid email"),
  }),
});

const updateCityOfTheUserSchema = object({
  body: object({
    cityId: string(),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "passwordConfirmation"
>;

export default {
  createUserSchema,
  updateProfileSchema,
  rateLawyerSchema,
  getLawyersSchema,
  getUserProfileSchema,
  getUserCitySchema,
  updateCityOfTheUserSchema,
};
