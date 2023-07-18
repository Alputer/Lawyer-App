import express from 'express';
import {userSchemas} from '../schemas';
import userController from '../controllers/user.controller';
import validateResource from "../middlewares/validateResource";

const router = express.Router();

router.post('/register', validateResource(userSchemas.createUserSchema), userController.register);

export default router;