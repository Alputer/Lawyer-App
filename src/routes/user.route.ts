import express from 'express';
import userSchemas from '../schemas/user.schemas';
import userController from '../controllers/user.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.post('/register', validateResource(userSchemas.createUserSchema), userController.register);
router.get('/user-profile/:userEmail', validateResource(userSchemas.getUserProfileSchema), requireUser(), userController.getUserProfile);
router.put('/update-profile', validateResource(userSchemas.updateProfileSchema), requireRegistration({userEmailField: "email"}), requireUser(), userController.updateProfile);
router.post('/rate-lawyer', validateResource(userSchemas.rateLawyerSchema), requireRegistration({userEmailField: "rater_email"}), requireRegistration({userEmailField: "rated_email"}), requireUser(), userController.rateLawyer);
router.get('/available-lawyers/:barId', validateResource(userSchemas.getAvailableLawyersSchema), requireUser(), userController.getAvailableLawyers);



export default router;