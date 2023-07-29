import { Request, Response } from 'express';
import { jobService, offerService } from '../services';

export async function makeOffer(
    req: Request,
    res: Response
  ) {
  
    try {
        
        const { jobId } = req.body;
        const requester = res.locals.user.email;

        const jobExists = await jobService.jobExists(jobId);
        if(!jobExists){
          return res.status(404).json({ error: `Job with id '${jobId}' could not found` });
        }

        await offerService.makeOffer(jobId, requester);

        return res.status(200).json({
          message: "Offer is successfully created",
        });

    } catch (e: any) {
        console.error('Error making an offer', e);
        res.status(500).json({ error: 'An internal server error occurred.' });
      }
    }

  export default {
    makeOffer,
  };