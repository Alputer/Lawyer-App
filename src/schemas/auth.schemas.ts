import { object, string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          example: "johnDoe@gmail.com"
 *        password:
 *          type: string
 *          example: "123456"
 *    LoginResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Login successful."
 */

const loginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    SendVerificationEmailInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          example: "johnDoe@gmail.com"
 *    SendVerificationEmailResponse:
 *      type: object
 *      required:
 *        - message
 *        - verificationCode
 *      properties:
 *        message:
 *          type: string
 *          example: "Verification code has been sent successfully"
 *        verificationCode:
 *          type: string
 *          example: "8ad731fa-b4ce-45ce-a7c5-70b732cf6bf1"
 */

const sendVerificationEmailSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    VerifyEmailInput:
 *      type: object
 *      required:
 *        - email
 *        - verificationCode
 *      properties:
 *        email:
 *          type: string
 *          example: "johnDoe@gmail.com"
 *        verificationCode:
 *          type: string
 *          example: "936e18a3-cbf9-417d-991f-851113e1e93e"
 *    VerifyEmailResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Email verified successfully"
 */

const verifyEmailSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    verificationCode: string({
      required_error: "Verification Code is required",
    }),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    RefreshTokenResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *          example: "eyJhbGciOiJIUzI1NiJ9.YWxwLnR1bmEuNDUzQGdtYWlsLmNvbQ.xrspUFhtq9pIbDwJR7z1AnR2ZcyPWnGONme4DratQfI"
 */

const refreshTokenSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    UpdatePasswordInput:
 *      type: object
 *      required:
 *        - newPassword
 *      properties:
 *        newPassword:
 *          type: string
 *          example: "1234567"
 *    UpdatePasswordResponse:
 *      type: object
 *      properties:
 *        messagge:
 *          type: string
 *          example: "Password update successful."
 */

const updatePasswordSchema = object({
  body: object({
    newPassword: string({
      required_error: "New password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    ForgotPasswordInput:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          example: "johnDoe@gmail.com"
 *    ForgotPasswordResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Password reset token sent to the email address."
 *        resetToken:
 *          type: string
 *          example: "48166d33df79a335a16a4526a208b32c477697226087314f"
 */

const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    ResetPasswordInput:
 *      type: object
 *      required:
 *        - email
 *        - newPassword
 *        - resetToken
 *      properties:
 *        email:
 *          type: string
 *          example: "johnDoe@gmail.com"
 *        newPassword:
 *          type: string
 *          example: "1234567"
 *        resetToken:
 *          type: string
 *          example: 480e0885cb5b55257a56961249152883ddbd46bdc23591bd
 *    ResetPasswordResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: "Password reset successful."
 */

const resetPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    newPassword: string({
      required_error: "New password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    resetToken: string({
      required_error: "Reset token is required",
    }),
  }),
});

export type LoginInput = {
  email: string;
};

export type SaveVerificationCodeInput = {
  email: string;
  verificationCode: string;
};

export default {
  loginSchema,
  sendVerificationEmailSchema,
  refreshTokenSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
};
