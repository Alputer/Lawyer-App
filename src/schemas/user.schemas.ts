import { object, string, TypeOf } from "zod";

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

export type CreateUserInput = Omit<
TypeOf<typeof createUserSchema>["body"],
"passwordConfirmation"
>;

export default {createUserSchema};