import { object, string} from "zod";

  const loginSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      password: string({
        required_error: "Password is required",
      }),
    })
  });

  const sendVerificationEmailSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
    })
  });

export type LoginInput = {
  email: string;
};

export type SaveVerificationCodeInput = {
  email: string;
  verificationCode: string;
};

export default {loginSchema, sendVerificationEmailSchema};