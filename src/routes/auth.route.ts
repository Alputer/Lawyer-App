import express from 'express';
import authController from '../controllers/auth.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import authSchemas from '../schemas/auth.schemas';
import requireUser from '../middlewares/requireUser';

const router = express.Router();

router.post('/login', validateResource(authSchemas.loginSchema), requireRegistration({userEmailField: "email"}), authController.login);
router.post('/send-verification-email', validateResource(authSchemas.sendVerificationEmailSchema), requireRegistration({userEmailField: "email"}), authController.sendVerificationEmail);
router.post('/verify-email', validateResource(authSchemas.verifyEmailSchema), requireRegistration({userEmailField: "email"}), authController.verifyEmail);
router.post('/refresh-token', validateResource(authSchemas.refreshTokenSchema), requireRegistration({userEmailField: "email"}), authController.refreshToken);
router.post('/update-password', validateResource(authSchemas.updatePasswordSchema), requireRegistration({userEmailField: "email"}), requireUser(), authController.updatePassword);
router.post('/forgot-password', validateResource(authSchemas.forgotPasswordSchema), requireRegistration({userEmailField: "email"}), authController.forgotPassword);
router.post('/reset-password', validateResource(authSchemas.resetPasswordSchema), requireRegistration({userEmailField: "email"}), authController.resetPassword);


export default router;
