import express from 'express';
import jobSchemas from '../schemas/job.schemas';
import jobController from '../controllers/job.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.post('/job', validateResource(jobSchemas.createJobSchema), requireUser(), jobController.createJob);


export default router;