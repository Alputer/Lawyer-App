import express from 'express';
import authController from '../controllers/auth.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import authSchemas from '../schemas/auth.schemas';
import requireUser from '../middlewares/requireUser';

const router = express.Router();

  /**
   * @openapi
   * '/api/login':
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

router.post('/login', validateResource(authSchemas.loginSchema), requireRegistration({userEmailField: "email"}), authController.login);

  /**
   * @openapi
   * '/api/send-verification-email':
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

router.post('/send-verification-email', validateResource(authSchemas.sendVerificationEmailSchema), requireRegistration({userEmailField: "email"}), authController.sendVerificationEmail);

  /**
   * @openapi
   * '/api/verify-email':
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
   *        description: Invalid credentials
   *      404:
   *        description: User not found.
   *      500:
   *        description: Internal server error
   */

router.post('/verify-email', validateResource(authSchemas.verifyEmailSchema), requireRegistration({userEmailField: "email"}), authController.verifyEmail);

  /**
   * @openapi
   * '/api/refresh-token':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Get access token from a refresh token
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/RefreshTokenInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RefreshTokenResponse'
   *      400:
   *        description: Incorrect payload
   *      401:
   *        description: Invalid or expired refresh token
   *      404:
   *        description: User not found.
   *      500:
   *        description: Internal server error
   */

router.post('/refresh-token', validateResource(authSchemas.refreshTokenSchema), requireRegistration({userEmailField: "email"}), authController.refreshToken);

  /**
   * @openapi
   * '/api/update-password':
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

router.post('/update-password', validateResource(authSchemas.updatePasswordSchema), requireRegistration({userEmailField: "email"}), requireUser(), authController.updatePassword);

  /**
   * @openapi
   * '/api/forgot-password':
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

router.post('/forgot-password', validateResource(authSchemas.forgotPasswordSchema), requireRegistration({userEmailField: "email"}), authController.forgotPassword);

  /**
   * @openapi
   * '/api/reset-password':
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
   *      404:
   *        description: User not found.
   *      500:
   *        description: Internal server error
   */

router.post('/reset-password', validateResource(authSchemas.resetPasswordSchema), requireRegistration({userEmailField: "email"}), authController.resetPassword);


export default router;
