import express from 'express';
import offerSchemas from '../schemas/offer.schemas';
import offerController from '../controllers/offer.controller';
import validateResource from "../middlewares/validateResource";
import requireUser from '../middlewares/requireUser';


const router = express.Router();

router.post('/make-offer', validateResource(offerSchemas.makeOfferSchema), requireUser(), offerController.makeOffer);
router.post('/accept-offer', validateResource(offerSchemas.acceptOfferSchema), requireUser(), offerController.acceptOffer);
router.post('/reject-offer', validateResource(offerSchemas.rejectOfferSchema), requireUser(), offerController.rejectOffer);


export default router;