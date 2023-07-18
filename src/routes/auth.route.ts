import express from 'express';
import {authSchemas} from '../schemas';
import authController from '../controllers/auth.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';

const router = express.Router();

router.post('/login', validateResource(authSchemas.loginSchema), requireRegistration(), authController.login);
router.post('/send-verification-email', validateResource(authSchemas.sendVerificationEmailSchema), requireRegistration(), authController.sendVerificationEmail);
/*
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
*/

export default router;
