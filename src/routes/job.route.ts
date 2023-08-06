import express from 'express';
import jobSchemas from '../schemas/job.schemas';
import jobController from '../controllers/job.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

  /**
   * @openapi
   * '/api/job':
   *  post:
   *     tags:
   *     - Job
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateJobInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateJobResponse'
   *      400:
   *        description: Incorrect payload
   *      500:
   *        description: Internal server error
   */

router.post('/job', validateResource(jobSchemas.createJobSchema), requireUser(), jobController.createJob);


export default router;