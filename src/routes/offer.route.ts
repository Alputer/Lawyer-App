import express from 'express';
import offerSchemas from '../schemas/offer.schemas';
import offerController from '../controllers/offer.controller';
import validateResource from "../middlewares/validateResource";
import requireRegistration from '../middlewares/requireRegistration';
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.post('/make-offer', validateResource(offerSchemas.makeOfferSchema), requireUser(), offerController.makeOffer);


export default router;