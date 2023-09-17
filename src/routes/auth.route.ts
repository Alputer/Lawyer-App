import express from "express";
import authController from "../controllers/auth.controller";
import validateResource from "../middlewares/validateResource";
import requireRegistration from "../middlewares/requireRegistration";
import authSchemas from "../schemas/auth.schemas";
import requireUser from "../middlewares/requireUser";

const router = express.Router();

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *      400:
 *        description: Incorrect payload
 *      401:
 *        description: Invalid credentials
 *      403:
 *        description: Account not validated
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */

router.post(
  "/login",
  validateResource(authSchemas.loginSchema),
  requireRegistration({
    userIdentifierField: "email",
    place: "body",
    type: "email",
  }),
  authController.login
);

/**
 * @openapi
 * '/api/auth/send-verification-email':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Send Verification Email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SendVerificationEmailInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SendVerificationEmailResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */

router.post(
  "/send-verification-email",
  validateResource(authSchemas.sendVerificationEmailSchema),
  requireRegistration({
    userIdentifierField: "email",
    place: "body",
    type: "email",
  }),
  authController.sendVerificationEmail
);

/**
 * @openapi
 * '/api/auth/verify-email':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Verify Email
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/VerifyEmailInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VerifyEmailResponse'
 *      400:
 *        description: Incorrect payload
 *      401:
 *        description: Invalid verification code
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */

router.post(
  "/verify-email",
  validateResource(authSchemas.verifyEmailSchema),
  requireRegistration({
    userIdentifierField: "email",
    place: "body",
    type: "email",
  }),
  authController.verifyEmail
);

/**
 * @openapi
 * '/api/auth/refresh-token':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Get access token from a refresh token
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RefreshTokenResponse'
 *      400:
 *        description: No refresh token
 *      401:
 *        description: Invalid or expired refresh token
 *      500:
 *        description: Internal server error
 */

router.post("/refresh-token", authController.refreshToken);

/**
 * @openapi
 * '/api/auth/update-password':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Update password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdatePasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdatePasswordResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */

router.post(
  "/update-password",
  validateResource(authSchemas.updatePasswordSchema),
  requireUser(),
  authController.updatePassword
);

/**
 * @openapi
 * '/api/auth/forgot-password':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Forgot password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordResponse'
 *      400:
 *        description: Incorrect payload
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */

router.post(
  "/forgot-password",
  validateResource(authSchemas.forgotPasswordSchema),
  requireRegistration({
    userIdentifierField: "email",
    place: "body",
    type: "email",
  }),
  authController.forgotPassword
);

/**
 * @openapi
 * '/api/auth/reset-password':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/ResetPasswordInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordResponse'
 *      400:
 *        description: Incorrect payload
 *      401:
 *        description: Invalid reset token
 *      404:
 *        description: User not found.
 *      500:
 *        description: Internal server error
 */

router.post(
  "/reset-password",
  validateResource(authSchemas.resetPasswordSchema),
  requireRegistration({
    userIdentifierField: "email",
    place: "body",
    type: "email",
  }),
  authController.resetPassword
);

export default router;
