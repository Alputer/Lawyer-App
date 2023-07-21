import express from 'express';
import userSchemas from '../schemas/user.schemas';
import locationController from '../controllers/location.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.get('/cities', requireUser(), locationController.getCities);


export default router;