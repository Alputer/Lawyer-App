import express from 'express';
import userSchemas from '../schemas/user.schemas';
import userController from '../controllers/user.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.post('/register', validateResource(userSchemas.createUserSchema), userController.register);
router.put('/update-profile', validateResource(userSchemas.updateProfileSchema), requireRegistration(), requireUser(), userController.updateProfile);

export default router;