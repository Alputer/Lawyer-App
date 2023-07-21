import { Request, Response } from 'express';
import { authService, userService, locationService, barService, tokenService, mailService} from '../services';

export async function getBarsInTheCity(
    req: Request,
    res: Response
  ) {
  
    try {
        
        const {cityId} = req.params
        const bars = await barService.getBars(cityId);
        
        return res.status(200).json({bars: bars});

    } catch (e: any) {
        console.error('Error getting bars in the city:', e);
        res.status(500).json({ error: 'An internal server error occurred.' });
      }
    }

  export default {
    getBarsInTheCity,
  };