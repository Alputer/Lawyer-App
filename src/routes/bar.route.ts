import express from 'express';
import barSchemas from '../schemas/bar.schemas';
import barController from '../controllers/bar.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.get('/bars/:cityId', validateResource(barSchemas.getBarsInTheCitySchema), requireUser(), barController.getBarsInTheCity);


export default router;