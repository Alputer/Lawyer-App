import express from 'express';
import authController from '../controllers/auth.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import authSchemas from '../schemas/auth.schemas';
import requireUser from '../middlewares/requireUser';

const router = express.Router();

router.post('/login', validateResource(authSchemas.loginSchema), requireRegistration(), authController.login);
router.post('/send-verification-email', validateResource(authSchemas.sendVerificationEmailSchema), requireRegistration(), authController.sendVerificationEmail);
router.post('/verify-email', validateResource(authSchemas.verifyEmailSchema), requireRegistration(), authController.verifyEmail);
router.post('/refresh-token', validateResource(authSchemas.refreshTokenSchema), authController.refreshToken);
router.post('/update-password', validateResource(authSchemas.updatePasswordSchema), requireRegistration(), requireUser(), authController.updatePassword);
router.post('/forgot-password', validateResource(authSchemas.forgotPasswordSchema), requireRegistration(), authController.forgotPassword);
router.post('/reset-password', validateResource(authSchemas.resetPasswordSchema), requireRegistration(), authController.resetPassword);


export default router;
